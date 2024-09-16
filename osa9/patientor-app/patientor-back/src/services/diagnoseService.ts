import data from "../../data/diagnoses";
import { Diagnoses } from "../types";

const getDiagnoseData = (): Diagnoses[] => {
  return data;
};

export default {
  getDiagnoseData,
};
