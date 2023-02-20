import { useRef } from "react"

export default function FormWithUseRef() {

    const inputRef = useRef(null);

    const handleClick = () => alert(`My name is ${inputRef.current.value}`);

    return (
        <>
            <form>
                <label htmlFor="txtForm2">Name:</label>
                {/* This time, we have used the useRef() hook to obtain a reference to this element.
              * Now, the user typing will Not cause re-renders. If we do need to access the element's value,
              * we can use inputRef.current.
              */}
                <input ref={inputRef} id="txtForm2" type="text" />
            </form>

            <button onClick={handleClick}>What's my name?</button>
        </>
    )
}