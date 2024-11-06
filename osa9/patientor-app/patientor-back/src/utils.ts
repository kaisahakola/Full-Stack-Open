import { Gender, HealthCheckRating, NewPatientData } from "./types";
import { z } from "zod";

const DischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

const SickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.string().date(),
  type: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const EntrySchema = z.union([
  HospitalEntrySchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

const NewPatientSchema = z.object({
  name: z.string().min(2),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(2),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(2),
  entries: z.array(EntrySchema).optional(),
});

export const toNewPatientData = (object: unknown): NewPatientData => {
  return NewPatientSchema.parse(object);
};

export default NewPatientSchema;
