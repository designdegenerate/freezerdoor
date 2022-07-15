import "./App.css";

function App() {
  return (
    <main>
      <nav>
        <h1>The Cool Wall</h1>
      </nav>
      <div id="canvas-wrapper">
        <canvas></canvas>
        <div id="grid">
          <div id="col-one">
            <h2>Seriously Uncool</h2>
          </div>
          <div id="col-two">
            <h2>Uncool</h2>
          </div>
          <div id="col-three">
            <h2>Cool</h2>
          </div>
          <div id="col-four">
            <h2>Subzero</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
