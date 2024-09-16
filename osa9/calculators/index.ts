import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/bmi", (_req, res) => {
  if (!isNaN(Number(_req.query.height)) && !isNaN(Number(_req.query.mass))) {
    const height = Number(_req.query.height);
    const mass = Number(_req.query.mass);
    const bmi = calculateBmi(Number(height), Number(mass));

    res.status(200).json({ height: height, mass: mass, bmi: bmi });
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (
    isNaN(Number(target)) ||
    daily_exercises.some((item: any) => isNaN(Number(item)))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
