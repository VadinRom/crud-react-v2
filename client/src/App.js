import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [town, setTown] = useState("");
  const [specialty, setSpeciality] = useState("");
  const [averageScore, setAverageScore] = useState(0);

  const [newAverageScore, setNewAverageScore] = useState(0);

  const [studentList, setStudentList] = useState([]);

  const PORT = 3001;

  const addStudent = () => {
    Axios.post(`http://localhost:${PORT}/create`, {
      name: name,
      dateOfBirth: dateOfBirth,
      town: town,
      specialty: specialty,
      averageScore: averageScore,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          dateOfBirth: dateOfBirth,
          town: town,
          specialty: specialty,
          averageScore: averageScore,
        },
      ]);
    });
  };

  const getStudents = () => {
    Axios.get(`http://localhost:${PORT}/students`).then((response) => {
      setStudentList(response.data);
    });
  };

  const updateStudentAverageScore = (id) => {
    Axios.put(`http://localhost:${PORT}/update`, { averageScore: newAverageScore, id: id }).then(
      (response) => {
        setStudentList(
          studentList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                town: val.town,
                dateOfBirth: val.dateOfBirth,
                specialty: val.specialty,
                averageScore: newAverageScore,
              }
              : val;
          })
        );
      }
    );
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:${PORT}/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Date Of Birth:</label>
        <input
          type="date"
          onChange={(event) => {
            setDateOfBirth(event.target.value);
          }}
        />
        <label>Town:</label>
        <input
          type="text"
          onChange={(event) => {
            setTown(event.target.value);
          }}
        />
        <label>Specialty:</label>
        <input
          type="text"
          onChange={(event) => {
            setSpeciality(event.target.value);
          }}
        />
        <label>Average score:</label>
        <input
          type="number"
          onChange={(event) => {
            setAverageScore(event.target.value);
          }}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <div className="students">
        <button onClick={getStudents}>Show Students</button>

        {studentList.map((val, key) => {
          return (
            <div className="student">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Date Of Birth: {val.dateOfBirth}</h3>
                <h3>Town: {val.town}</h3>
                <h3>Specialty: {val.specialty}</h3>
                <h3>Average Score: {val.averageScore}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Change average score"
                  onChange={(event) => {
                    setNewAverageScore(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateStudentAverageScore(val.id);
                  }}
                >
                  {" "}
                  Update score
                </button>

                <button
                  onClick={() => {
                    deleteStudent(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
