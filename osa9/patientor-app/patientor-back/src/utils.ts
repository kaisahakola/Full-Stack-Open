import { Gender, NewPatientData } from "./types";
import { z } from "zod";

const NewPatientSchema = z.object({
  name: z.string().min(2),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(2),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(2),
});

export const toNewPatientData = (object: unknown): NewPatientData => {
  return NewPatientSchema.parse(object);
};

export default NewPatientSchema;
