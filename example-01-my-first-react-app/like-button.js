/**
 * A button which maintains a "liked" state, and allows the user to toggle that state by clicking it.
 */
function LikeButton() {

    const [liked, setLiked] = React.useState(false);

    return React.createElement(
        'button',
        { onClick: () => setLiked(!liked) },
        liked ? 'Unlike' : 'Like'
    )
}

// Render a LikeButton in the #container <div> using React
const container = document.querySelector("#container");
ReactDOM.render(React.createElement(LikeButton), container);
