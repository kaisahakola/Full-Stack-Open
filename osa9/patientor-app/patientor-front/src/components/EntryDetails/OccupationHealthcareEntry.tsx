import { Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import "./style.css";

interface OccupationalHealthcareEntryProps {
  entry: Entry;
  getDiagnosis: (code: string) => string | undefined;
}

const OccupationalHealthcareEntry = (
  props: OccupationalHealthcareEntryProps
) => {
  const { entry, getDiagnosis } = props;

  return (
    <div className="container" key={entry.id}>
      {entry.type === "OccupationalHealthcare" ? (
        <p style={{ fontWeight: "bold" }}>
          {entry.date} <WorkIcon /> {entry.employerName}
        </p>
      ) : (
        <p>wrong type</p>
      )}

      <p style={{ fontStyle: "oblique" }}>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {getDiagnosis(code)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntry;
