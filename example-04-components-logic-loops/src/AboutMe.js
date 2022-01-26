/**
 * A simple React component which accepts two props - "name" and "like" - and renders a
 * <h1> element stating "About me", followed by a <p> containing the supplied information.
 * 
 * Uses object dereferencing to avoid the need to refer to the function argument name everywhere.
 */
function AboutMe({ name, like }) {
    return (
        <div>
            <h1>About me</h1>
            <p>Hello, my name is {name}, and I like {like}!</p>
        </div>
    )
}

/**
 * This component is the same as AboutMe, except that it does not use object dereferencing.
 */
function AboutMeAlternative(props) {
    return (
        <div>
            <h1>About me</h1>
            <p>Hello, my name is {props.name}, and I like {props.like}!</p>
        </div>
    )
}

export default AboutMe;