import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Kwick CV</h1>
      <GeneralInfo />
      <Education />
      <Experience />
    </div>
  );
}

export default App;
