import express from "express";
import diagnoseService from "../services/diagnoseService";
import { Response } from "express";
import { Diagnoses } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnoseService.getDiagnoseData());
});

export default router;
