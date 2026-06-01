import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("")

  console.log(results);


  const scanRepos = async () => {
    if(!username.trim()){
      setError("Please enter GitLab username" );
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:3000/api/scan", {username});
      setResults(response.data.scanResults);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gitlab Risk Scanner</h1>
      <input type="text" name="usename" placeholder="usename" onChange={(e)=>setUsername(e.target.value)} id="" />
      <button onClick={scanRepos}>
        {loading ? "Scanning..." : "Scan Repo"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Repository</th>

            <th>Issue</th>

            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {results.map((repo) =>
            repo.issues.map((issue, index) => (
              <tr key={`${repo.repositoryName}-${index}`}>
                <td>{repo.repositoryName}</td>

                <td>{issue.issue}</td>

                <td>
                  <span className={issue.severity}>{issue.severity}</span>
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
