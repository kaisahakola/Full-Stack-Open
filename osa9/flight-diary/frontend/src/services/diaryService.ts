import axios from "axios";
import { DiaryEntry } from "../types/types";
import { NewEntry } from "../types/types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  return await axios
    .get<DiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const createEntry = async (object: NewEntry) => {
  return await axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};
