import { useState, useEffect } from "react";
import "./App.css";
import { DiaryEntry } from "./types/types";
import {
  getAllDiaries,
  createEntry as createEntryService,
} from "./services/diaryService";
import Entries from "./components/Entries/Entries";
import NewEntry from "./components/NewEntry/NewEntry";
import axios from "axios";
import { ValidationError } from "./types/types";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setEntries(data);
    });
  });

  const createEntry = async (newEntry: DiaryEntry) => {
    try {
      const addedEntry = await createEntryService(newEntry);
      setEntries((prevEntries) => [...prevEntries, addedEntry]);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setErrorMessage(`${error.response?.data}`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Entries entries={entries} />
      <NewEntry createEntry={createEntry} errorMessage={errorMessage} />
    </div>
  );
}

export default App;
