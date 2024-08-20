document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Сбор данных пользователя
    const age = parseInt(document.getElementById('age').value, 10);
    const income = parseInt(document.getElementById('income').value, 10);
    const children = parseInt(document.getElementById('children').value, 10);
    const savings = parseInt(document.getElementById('savings').value, 10);
    const debts = parseInt(document.getElementById('debts').value, 10);
    const housing = parseInt(document.getElementById('housing').value, 10);
    const weight = parseInt(document.getElementById('weight').value, 10);
    const masturbation = parseInt(document.getElementById('masturbation').value, 10);
    const books = parseInt(document.getElementById('books').value, 10);
    const sleep = parseInt(document.getElementById('sleep').value, 10);

    // Пример мировых данных (условные значения)
    const globalData = {
        averageAge: 35,
        averageIncome: 50000,
        averageChildren: 2,
        averageSavings: 15000,
        averageDebts: 10000,
        averageHousing: 20000,
        averageWeight: 70,
        averageMasturbation: 3,
        averageBooks: 5,
        averageSleep: 7
    };

    // Генерация графиков
    createChart('chartAge', 'Возраст', age, globalData.averageAge);
    createChart('chartIncome', 'Доход (в рублях)', income, globalData.averageIncome);
    createChart('chartChildren', 'Количество детей', children, globalData.averageChildren);
    createChart('chartSavings', 'Сбережения в месяц (в рублях)', savings, globalData.averageSavings);
    createChart('chartDebts', 'Выплаты по кредитам в месяц (в рублях)', debts, globalData.averageDebts);
    createChart('chartHousing', 'Плата за жилье в месяц (в рублях)', housing, globalData.averageHousing);
    createChart('chartWeight', 'Ваш вес (в кг)', weight, globalData.averageWeight);
    createChart('chartMasturbation', 'Частота мастурбации (в неделю)', masturbation, globalData.averageMasturbation);
    createChart('chartBooks', 'Количество прочитанных книг в год', books, globalData.averageBooks);
    createChart('chartSleep', 'Продолжительность сна (в часах)', sleep, globalData.averageSleep);
});

// Функция для создания графика
function createChart(canvasId, label, userData, globalData) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ваши данные', 'Средние данные по миру'],
            datasets: [{
                label: label,
                data: [userData, globalData],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}