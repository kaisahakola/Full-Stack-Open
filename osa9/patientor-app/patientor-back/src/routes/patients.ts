import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { NonSensitivePatientData } from "../types";
import toNewPatientData from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post("/", (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const addData = patientService.addPatientData(newPatientData);
    res.json(addData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
