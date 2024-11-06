import { Entry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import "./style.css";

interface HealthChechEntryProps {
  entry: Entry;
  getDiagnosis: (code: string) => string | undefined;
}

const HealthChechEntry = (props: HealthChechEntryProps) => {
  const { entry, getDiagnosis } = props;

  return (
    <div className="container" key={entry.id}>
      <p style={{ fontWeight: "bold" }}>
        {entry.date} <MedicalServicesIcon />
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

export default HealthChechEntry;
