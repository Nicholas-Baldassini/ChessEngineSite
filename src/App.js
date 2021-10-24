import "./App.css";
import ThreeComponent from "./components/ThreeComponent";


function App() {
  return (
    <div className='App'>
      <div id='ThreeGraphics'>
        <ThreeComponent />
      </div>
      <div id='NonThreeGraphics' style={{ position: "absolute", left: "0px", top: "0px" }}>
        <h1 style={{ color: "white" }}>This wont work</h1>
        <p style={{ color: "white" }}>Hello world</p>
        <p style={{ color: "white" }}>JUST WORK ALREADY</p>
        <p style={{ color: "white" }}>OLAY OKAY OLAY</p>
      </div>
    </div>
  );
}

export default App;
