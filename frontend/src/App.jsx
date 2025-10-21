import { useState, useEffect } from "react";
import Diagnoses from "./Diagnoses";
import "./App.css";

function App() {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  const fetchDiagnoses = async () => {
    const response = await fetch("http://127.0.0.1:5000/diagnoses");
    const data = await response.json();
    setDiagnoses(data.diagnoses);
    console.log(data.diagnoses);
  };

  const onUpdate = () => {
    fetchDiagnoses();
  };

  return (
    <>
      <Diagnoses diagnosisList={diagnoses} updateCallback={onUpdate} />
    </>
  );
}

export default App;
