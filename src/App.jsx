import "./App.css";
import Header from "./assets/components/Header";
import SourceCode from "./assets/components/SourceCode";
import TransitCode from "./assets/components/TransitCode";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <SourceCode />
        <TransitCode />
      </div>
    </>
  );
}

export default App;
