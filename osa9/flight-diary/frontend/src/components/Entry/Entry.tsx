import { DiaryEntry } from "../../types/types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;
  return (
    <tr>
      <td>{entry.date}</td>
      <td>{entry.weather}</td>
      <td>{entry.visibility}</td>
      <td>{entry.comment}</td>
    </tr>
  );
};

export default Entry;
