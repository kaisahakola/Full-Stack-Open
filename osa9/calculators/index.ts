import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";

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

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
