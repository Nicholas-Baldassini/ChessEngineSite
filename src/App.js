import "./App.css";
import ThreeComponent from "./components/ThreeComponent";


function App() {
  return (
    <div className='App'>
      <div id='ThreeGraphics'>
        <ThreeComponent />
      </div>
      <div id='NonThreeGraphics' style={{ position: "absolute", left: "0px", top: "0px" }}>
      </div>
    </div>
  );
}

export default App;
