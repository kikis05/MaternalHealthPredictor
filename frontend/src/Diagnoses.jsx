import React from "react";
import { useState } from "react";

const Diagnoses = ({ diagnosisList, updateCallback }) => {
  const [Name, setName] = useState(null);
  const [Age, setAge] = useState(null);
  const [SystolicBP, setSystolicBP] = useState(null);
  const [DiastolicBP, setDiastolicBP] = useState(null);
  const [BloodSugar, setBloodSugar] = useState(null);
  const [BodyTemp, setBodyTemp] = useState(null);
  const [HeartRate, setHeartRate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Came to onSubmit");
    console.log(Age, SystolicBP, DiastolicBP, BloodSugar, BodyTemp, HeartRate);
    if (
      Name == '' ||
      Age == '' ||
      SystolicBP == '' ||
      DiastolicBP == '' ||
      BloodSugar == '' ||
      BodyTemp == '' ||
      HeartRate == ''
    ) {
        setErrorMessage("Please fill out all the fields.")
    } else {
        setErrorMessage("")
      const Time = Date();
      const data = {
        Time,
        Name,
        Age,
        SystolicBP,
        DiastolicBP,
        BloodSugar,
        BodyTemp,
        HeartRate,
      };
      const url = "http://127.0.0.1:5000/add_diagnosis";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      if (response.status != 200 && response.status != 201) {
        const error_message = await response.json();
        alert(error_message.message);
      } else {
        updateCallback()
        resetValues()
      };
    }
  };

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_diagnosis/${id}`,
        options,
      );
      if (response.status == 200) {
        updateCallback();
      } else {
        console.error("Problem in onDelete");
        alert(error);
      }
    } catch (error) {
      console.error("Error in onDelete");
      alert(error);
    }
  };
  
  const resetValues = () => {
    setName('')
    setAge('')
    setSystolicBP('')
    setDiastolicBP('')
    setBloodSugar('')
    setBodyTemp('')
    setHeartRate('')
  }

  return (
    <div>
      <h1>Maternal Health Predictor</h1>
      <br />
      <br />
      <div><strong>{errorMessage}</strong></div>
      <br />
      <div className="data-container">
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Systolic BP</th>
              <th>Diastolic BP</th>
              <th>Blood Sugar</th>
              <th>Body Temp</th>
              <th>Heart Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  id="name"
                  value={Name}
                  placeholder="Enter"
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="age"
                  value={Age}
                  placeholder="Enter"
                  onChange={(e) => setAge(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="systolic_bp"
                  value={SystolicBP}
                  placeholder="Enter"
                  onChange={(e) => setSystolicBP(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="diastolic_bp"
                  value={DiastolicBP}
                  placeholder="Enter"
                  onChange={(e) => setDiastolicBP(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="blood_sugar"
                  value={BloodSugar}
                  placeholder="Enter"
                  onChange={(e) => setBloodSugar(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="body_temp"
                  value={BodyTemp}
                  placeholder="Enter"
                  onChange={(e) => setBodyTemp(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="heart_rate"
                  value={HeartRate}
                  placeholder="Enter"
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </td>
              <td></td>
              <td>
                <button
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Submit
                </button>
              </td>
            </tr>
            {diagnosisList.map((diagnosis) => (
              <tr key={diagnosis.id}>
                <td>{diagnosis.id}</td>
                <td>{diagnosis.Name}</td>
                <td>{diagnosis.Age}</td>
                <td>{diagnosis.SystolicBP}</td>
                <td>{diagnosis.DiastolicBP}</td>
                <td>{diagnosis.BloodSugar}</td>
                <td>{diagnosis.BodyTemp}</td>
                <td>{diagnosis.HeartRate}</td>
                <td className = {diagnosis.RiskLevel == 1 && "at-risk"}>{diagnosis.RiskLevel == 1 ? "At Risk" : "Low Risk"}</td>
                <td>
                  <button id="x" onClick={() => onDelete(diagnosis.id)}>
                    <strong>delete entry</strong>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="results-container">
        <div className="lower-container">
          <p>At Risk:</p>
          <table>
            {diagnosisList.map(
              (diagnosis) =>
                diagnosis.RiskLevel == 1 && (
                  <tr id={diagnosis.id}>
                    <td>{diagnosis.id}</td>
                    <td>{diagnosis.Name}</td>
                    <td>{diagnosis.Time}</td>
                  </tr>
                ),
            )}
          </table>
        </div>
        <div className="lower-container">
          <p>This predictor uses a model with 91% accuracy.</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Diagnoses;

// &times;
