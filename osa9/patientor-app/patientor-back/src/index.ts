import express from "express";
import path from "path";
import diagnoseRouter from "./routes/diagnosis";
import patientRouter from "./routes/patients";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../patientor-front/dist")));

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
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
