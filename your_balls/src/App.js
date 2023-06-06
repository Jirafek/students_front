import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Jirafek/DB_students/main/db.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const handleCloseTable = () => {
    setSubject(null);
  };

  return (
    <div className="App">
      <h1>Сбор баллов</h1>
      {data && (
        <div className="subjects">
          {Object.keys(data).map((subject) => (
            <button key={subject} onClick={() => handleSubjectSelect(subject)}>
              {subject}
            </button>
          ))}
        </div>
      )}
      {subject && (
        <div className="data-table">
          <h2>{subject}</h2>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data[subject].sort((a, b) => b.score - a.score).map((item, i) => (
                <tr key={i}>
                  <td>
                    <a href={`https://t.me/${item.username}`}>{item.name}</a>
                  </td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCloseTable}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

export default App;