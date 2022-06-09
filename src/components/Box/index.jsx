function Box(props) {
    return <div className={"case " + (props.type === "right" ? "case-g": "case-b")}>{props.letter}</div>
}

export default Box;