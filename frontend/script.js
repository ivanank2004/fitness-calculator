function toggleCalculator() {
    const calculatorType = document.getElementById("calculatorType");
    const strengthCalculator = document.getElementById("strengthCalculator");
    const calorieCalculator = document.getElementById("calorieCalculator");

    const selectedValue = calculatorType.value;

    strengthCalculator.style.display = (selectedValue === "strength") ? "block" : "none";
    calorieCalculator.style.display = (selectedValue === "calories") ? "block" : "none";

    document.getElementById("result").innerText = "";

    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);

    calculatorType.value = selectedValue;
}

function toggleUnits() {
    const unit = document.getElementById("unit").value;
    document.getElementById("weight").placeholder = (unit === "metric") ? "Weight (kg)" : "Weight (lbs)";
    document.getElementById("height").placeholder = (unit === "metric") ? "Height (cm)" : "Height (inches)";
}

function calculateStrength() {
    const exercise = document.getElementById("exercise").value;
    const bodyweight = document.getElementById("bodyweight").value;

    fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise, bodyweight: parseFloat(bodyweight) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.message;
    });
}

function calculateCalories() {
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);
    const goal = parseFloat(document.getElementById("goal").value);
    const unit = document.getElementById("unit").value;

    fetch("http://localhost:5000/calories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, sex, weight, height, activityLevel, goal, unit })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.message;
    });
}

toggleCalculator();
