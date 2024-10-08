import express from "express";
import path from "path";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../patientor-front/dist")));

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("*", (_req, res) => {
  res.sendFile(
    path.join(__dirname, "../../patientor-front/dist", "index.html")
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
