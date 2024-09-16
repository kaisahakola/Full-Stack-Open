import data from "../../data/patients";
import { NonSensitivePatientData, Patients } from "../types";

const getPatientData = (): Patients[] => {
  return data;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientData,
  getNonSensitivePatientData,
};
