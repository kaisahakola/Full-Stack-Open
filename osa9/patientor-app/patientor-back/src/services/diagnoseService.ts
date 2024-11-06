import data from "../../data/diagnosis";
import { Diagnosis } from "../types";

const getDiagnoseData = (): Diagnosis[] => {
  return data;
};

export default {
  getDiagnoseData,
};
