const milestones = [
    { week: 2801, label: "Смерть Альберта Эйнштейна" },
    { week: 2496, label: "Смерть Мэрилин Монро" },
    { week: 2288, label: "Смерть Джона Ф. Кеннеди" },
    { week: 3201, label: "Смерть Элвиса Пресли" },
    { week: 3101, label: "Смерть Джона Леннона" },
    { week: 2901, label: "Смерть Мартина Лютера Кинга" },
    { week: 3601, label: "Смерть принцессы Дианы" },
    { week: 3701, label: "Смерть Майкла Джексона" },
    { week: 2401, label: "Смерть Матери Терезы" },
];

const quotes = [
    { week: 10, quote: "“Человек рожден свободным, но везде он в оковах.” - Жан-Жак Руссо" },
    { week: 20, quote: "“Великие дела начинаются с маленьких шагов.” - Лао-цзы" },
    { week: 30, quote: "“Неудача - это просто возможность начать снова, но уже более мудро.” - Генри Форд" },
    { week: 50, quote: "“Время — это то, что мы хотим больше всего, но используем хуже всего.” - Уильям Пенн" },
];

// Функция для автоматической прокрутки страницы вверх при загрузке
window.onload = function() {
    window.scrollTo(0, 0);
};

function generateLifeCalendar() {
    const birthdateInput = document.getElementById("birthdate").value;
    if (!birthdateInput) {
        alert("Пожалуйста, введите свою дату рождения!");
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();
    const ageInWeeks = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = 91 * 52;

    // Скрываем экран ввода и показываем календарь
    document.getElementById("birthdate-input-screen").style.display = "none";
    document.getElementById("life-calendar-screen").style.display = "block";

    const calendarGrid = document.getElementById("calendar-grid");
    const weekLabels = document.getElementById("week-labels");
    const yearLabels = document.getElementById("year-labels");

    // Генерируем метки недель (1 до 52)
    for (let i = 1; i <= 52; i++) {
        const weekLabel = document.createElement("div");
        weekLabel.textContent = i;
        weekLabels.appendChild(weekLabel);
    }

    // Генерируем метки лет и элементы сетки
    for (let year = 0; year < 91; year++) {
        const yearLabel = document.createElement("div");
        yearLabel.textContent = year + 1;
        yearLabels.appendChild(yearLabel);

        for (let week = 0; week < 52; week++) {
            const weekIndex = year * 52 + week;
            const weekDiv = document.createElement("div");
            weekDiv.className = "grid-item";
            
            if (weekIndex < ageInWeeks) {
                weekDiv.classList.add("past");
            }

            const milestone = milestones.find(m => m.week === weekIndex);
            if (milestone) {
                weekDiv.classList.add("milestone");
                weekDiv.dataset.label = milestone.label;
            }

            const quote = quotes.find(q => q.week === weekIndex);
            if (quote) {
                weekDiv.dataset.quote = quote.quote;
            }

            weekDiv.addEventListener('mouseenter', showTooltip);
            weekDiv.addEventListener('mouseleave', hideTooltip);
            weekDiv.addEventListener('mousemove', moveTooltip);

            calendarGrid.appendChild(weekDiv);
        }
    }

    // Запускаем таймер до следующей недели
    startWeekTimer(birthdate, ageInWeeks);
}

function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    const label = event.target.dataset.label;
    const quote = event.target.dataset.quote;

    if (label) {
        tooltip.textContent = label;
    } else if (quote) {
        tooltip.textContent = quote;
    } else {
        tooltip.textContent = "";
    }

    tooltip.style.opacity = 1;
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = 0;
}

function moveTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

function startWeekTimer(birthdate, ageInWeeks) {
    const today = new Date();
    const nextWeekStart = new Date(birthdate);
    nextWeekStart.setDate(birthdate.getDate() + (ageInWeeks + 1) * 7);

    function updateTimer() {
        const now = new Date();
        const timeLeft = nextWeekStart - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const timerElement = document.getElementById('timer');
        timerElement.textContent = `До следующей недели: ${days}д ${hours}ч ${minutes}м ${seconds}с`;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Неделя завершена!";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

// Функция для создания изображения и публикации
document.getElementById('share-btn').addEventListener('click', () => {
    html2canvas(document.querySelector("#calendar-container")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-life-calendar.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
