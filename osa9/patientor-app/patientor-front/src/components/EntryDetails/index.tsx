import { Entry, Diagnosis } from "../../types";
import OccupationalHealthcareEntry from "./OccupationHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import HealthChechEntry from "./HealthCheckEntry";
import assertNever from "assert-never";
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const { entry } = props;

  useEffect(() => {
    diagnosisService
      .getAll()
      .then((fetchedDiagnosis) => setDiagnosis(fetchedDiagnosis))
      .catch((error) => console.error("Failed to fetch diagnosis: ", error));
  }, []);

  const getDiagnosis = (code: string) => {
    if (diagnosis) {
      const diagnosisObj = diagnosis.find((d) => d.code === code);
      return diagnosisObj ? diagnosisObj.name : "Unknown diagnosis";
    }
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} getDiagnosis={getDiagnosis} />;
    case "HealthCheck":
      return <HealthChechEntry entry={entry} getDiagnosis={getDiagnosis} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry
          entry={entry}
          getDiagnosis={getDiagnosis}
        />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
