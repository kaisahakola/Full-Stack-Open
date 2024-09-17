import { z } from "zod";
import NewPatientSchema from "./utils";

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSensitivePatientData = Omit<Patients, "ssn">;
export type NewPatientData = z.infer<typeof NewPatientSchema>;
