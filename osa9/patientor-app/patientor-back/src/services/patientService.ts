import patientData from "../../data/patients";
import { NonSensitivePatientData, Patient, NewPatientData } from "../types";
import { v1 as uuid } from "uuid";

const getPatientData = (): Patient[] => {
  return patientData;
};

const getPatientById = (id: string): Patient | { error: string } => {
  const patient = patientData.find((patient) => patient.id === id);
  return patient ? patient : { error: `Patient with id ${id} not found.` };
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatientData = (data: NewPatientData): Patient => {
  const newPatientData = {
    id: uuid(),
    ...data,
  };

  patientData.push(newPatientData);
  return newPatientData;
};

export default {
  getPatientData,
  getPatientById,
  getNonSensitivePatientData,
  addPatientData,
};
