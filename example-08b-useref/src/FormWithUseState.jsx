import { useState } from "react"

export default function FormWithUseState() {

    const [name, setName] = useState('');

    const handleClick = () => alert(`My name is ${name}`);

    return (
        <>
            <form>
                <label htmlFor="txtForm1">Name:</label>
                {/* This form element is "bound" to the "name" stateful value.
              * Every time the form changes (e.g. the user types), setName() is called.
              * This causes this component to re-render, showing the updated value.
              * This works well, and is great if changes in the form need to update other parts
              * of the UI immediately. If not, then these re-renders are unnecessary and could lead
              * to poor performance.
              */}
                <input id="txtForm1" type="text" value={name} onChange={e => setName(e.target.value)} />
            </form>

            <button onClick={handleClick}>What's my name?</button>
        </>
    )
}