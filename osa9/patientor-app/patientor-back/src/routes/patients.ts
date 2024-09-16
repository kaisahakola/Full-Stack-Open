import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { NonSensitivePatientData } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

export default router;
