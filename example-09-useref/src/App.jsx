import FormWithUseRef from "./FormWithUseRef";
import FormWithUseState from "./FormWithUseState";

function App() {
  return (
    <div>
      <h1>Form using bound inputs with <code>useState()</code></h1>
      <FormWithUseState />

      <h1>Form using unbound inputs and <code>useRef()</code></h1>
      <FormWithUseRef />

    </div>
  )
}

export default App;
