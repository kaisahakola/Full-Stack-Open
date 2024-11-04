import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatientData, NewPatientData, Patient } from "../types";
import NewPatientSchema from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const result = patientService.getPatientById(req.params.id);
  if (typeof result === "string") {
    res.status(404).send(result);
  }
  res.send(result);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientData>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatientData(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
