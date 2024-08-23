const milestones = [
    { week: 2801, label: "Albert Einstein Died" },
    { week: 2496, label: "Marilyn Monroe Died" },
    { week: 2288, label: "John F. Kennedy Died" },
    { week: 3201, label: "Elvis Presley Died" },
    { week: 3101, label: "John Lennon Died" },
    { week: 2901, label: "Martin Luther King Jr. Died" },
    { week: 3601, label: "Princess Diana Died" },
    { week: 3701, label: "Michael Jackson Died" },
    { week: 2401, label: "Mother Teresa Died" },
    // Add more famous milestones as needed
];

function generateLifeCalendar() {
    const birthdateInput = document.getElementById("birthdate").value;
    if (!birthdateInput) {
        alert("Please enter your birthdate!");
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();
    const ageInWeeks = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = 91 * 52;

    // Hide the input screen and show the calendar screen
    document.getElementById("birthdate-input-screen").style.display = "none";
    document.getElementById("life-calendar-screen").style.display = "block";

    const calendarGrid = document.getElementById("calendar-grid");

    for (let i = 0; i < totalWeeks; i++) {
        const weekDiv = document.createElement("div");
        weekDiv.className = "grid-item";
        
        if (i < ageInWeeks) {
            weekDiv.classList.add("past");
        }

        const milestone = milestones.find(m => m.week === i);
        if (milestone) {
            weekDiv.classList.add("milestone");
            weekDiv.dataset.label = milestone.label;
        }

        weekDiv.addEventListener('mouseenter', showTooltip);
        weekDiv.addEventListener('mouseleave', hideTooltip);

        calendarGrid.appendChild(weekDiv);
    }
}

function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    const label = event.target.dataset.label;

    if (label) {
        tooltip.textContent = label;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.opacity = 1;
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = 0;
}
