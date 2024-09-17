import patientData from "../../data/patients";
import { NonSensitivePatientData, Patients, NewPatientData } from "../types";
import { v1 as uuid } from "uuid";

const getPatientData = (): Patients[] => {
  return patientData;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientData = (data: NewPatientData): Patients => {
  const newPatientData = {
    id: uuid(),
    ...data,
  };

  patientData.push(newPatientData);
  return newPatientData;
};

export default {
  getPatientData,
  getNonSensitivePatientData,
  addPatientData,
};
