var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * A button which maintains a "liked" state, and allows the user to toggle that state by clicking it.
 */
function LikeButton() {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        liked = _React$useState2[0],
        setLiked = _React$useState2[1];

    return React.createElement(
        'button',
        { onClick: function onClick() {
                return setLiked(!liked);
            } },
        liked ? 'Unlike' : 'Like'
    );
}

// Render a LikeButton in the #container <div> using React
var container = document.querySelector("#container");
ReactDOM.render(React.createElement(LikeButton, null), container);