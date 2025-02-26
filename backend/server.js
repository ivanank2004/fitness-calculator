const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
    const { exercise, bodyweight } = req.body;
    const multipliers = { "bench press": 1.2, "squat": 1.5, "deadlift": 2.0, "overhead press": 0.8 };

    if (!multipliers[exercise] || bodyweight <= 0) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const strengthStandard = (multipliers[exercise] * bodyweight).toFixed(2);
    res.json({ message: `Your strength standard for ${exercise} is ${strengthStandard} kg.` });
});

app.post("/calories", (req, res) => {
    let { age, sex, weight, height, activityLevel, goal, unit } = req.body;

    if (unit === "imperial") {
        weight = weight * 0.453592;
        height = height * 2.54;
    }

    let bmr = (sex === "male")
        ? (10 * weight + 6.25 * height - 5 * age + 5)
        : (10 * weight + 6.25 * height - 5 * age - 161);

    const dailyCalories = bmr * activityLevel;
    const finalCalories = goal >= 0 ? dailyCalories + goal : dailyCalories * (1 + goal / 100);

    res.json({
        message: `Your BMR is ${bmr.toFixed(2)} kcal/day. Recommended intake: ${finalCalories.toFixed(2)} kcal/day.`
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
