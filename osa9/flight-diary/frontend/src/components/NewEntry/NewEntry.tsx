import { useState } from "react";
import { DiaryEntry, NewEntry } from "../../types/types";
interface NewEntryFormProps {
  createEntry: (entry: DiaryEntry) => void;
  errorMessage: string;
}

const NewDiaryEntry = ({ createEntry, errorMessage }: NewEntryFormProps) => {
  const [newEntry, setNewEntry] = useState<NewEntry>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry: DiaryEntry = {
      id: Math.random(),
      ...newEntry,
    };

    createEntry(entry);

    setNewEntry({
      date: "",
      weather: "sunny",
      visibility: "great",
      comment: "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p>{errorMessage}</p>

      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
        />

        <br />

        <label>Weather</label>

        <div>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            onChange={handleChange}
          />
          <label htmlFor="sunny">sunny</label>

          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            onChange={handleChange}
          />
          <label htmlFor="sunny">rainy</label>

          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            onChange={handleChange}
          />
          <label htmlFor="sunny">cloudy</label>

          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            onChange={handleChange}
          />
          <label htmlFor="sunny">windy</label>

          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            onChange={handleChange}
          />
          <label htmlFor="sunny">stormy</label>
        </div>

        <br />

        <label>Visibility</label>

        <div>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            onChange={handleChange}
          />
          <label htmlFor="great">great</label>

          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            onChange={handleChange}
          />
          <label htmlFor="good">good</label>

          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            onChange={handleChange}
          />
          <label htmlFor="ok">ok</label>

          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            onChange={handleChange}
          />
          <label htmlFor="poor">poor</label>
        </div>

        <br />

        <label>Comment</label>

        <input
          type="text"
          name="comment"
          value={newEntry.comment}
          onChange={handleChange}
        />

        <br />

        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewDiaryEntry;
