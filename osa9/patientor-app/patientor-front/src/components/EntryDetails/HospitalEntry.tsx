import { Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import "./style.css";

interface HospitalEntryProps {
  entry: Entry;
  getDiagnosis: (code: string) => string | undefined;
}

const HospitalEntry = (props: HospitalEntryProps) => {
  const { entry, getDiagnosis } = props;

  return (
    <div className="container" key={entry.id}>
      <p style={{ fontWeight: "bold" }}>
        {entry.date} <LocalHospitalIcon />
      </p>
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

export default HospitalEntry;
