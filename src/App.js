import "./App.css";
import ThreeComponent from "./components/ThreeComponent";

function App() {
  return (
    <div className='App'>
      <div id='ThreeGraphics'>
        <ThreeComponent />
      </div>
      <div id='NonThreeGraphics' style={{ position: "absolute", left: "0px", top: "0px" }}>
        <h1>
          Alert:
          <span className='badge badge-warning'>UNDER REPAIRS</span>
        </h1>
      </div>
    </div>
  );
}

export default App;
