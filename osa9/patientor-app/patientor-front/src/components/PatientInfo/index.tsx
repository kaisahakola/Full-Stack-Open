import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patienService from "../../services/patients";
import { Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patienService
        .getById(id)
        .then((fetchedPatient) => setPatient(fetchedPatient))
        .catch((error) => console.error("Failed to fetch patient:", error));
    }
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "female" ? (
          <FemaleIcon />
        ) : patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfo;
