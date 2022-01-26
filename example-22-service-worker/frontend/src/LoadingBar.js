const style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

export default function LoadingBar({ title }) {
    return (
        <div style={style}>
            <img src="/images/spinner-icon-gif-25.jpg" alt="" />
            <span> {title}</span>
        </div>
    );
}