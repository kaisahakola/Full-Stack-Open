import { DiaryEntry } from "../../types/types";
import Entry from "../Entry/Entry";
import "./Entries.css";

interface EntriesProps {
  entries: DiaryEntry[];
}

const Entries = (props: EntriesProps) => {
  const entries = props.entries;
  return (
    <div>
      <h1>Diary entries</h1>
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>VISIBILITY</th>
            <th>WEATHER</th>
            <th>COMMENT</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: DiaryEntry, index) => (
            <Entry key={index} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;
