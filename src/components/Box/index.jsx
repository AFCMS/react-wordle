function Box(props) {
	let case_type = "";
	if (props.t === "edit") {
		case_type = "case-b";
	} else if (props.t === "right") {
		case_type = "case-g";
	} else if (props.t === "wrong") {
		case_type = "case-e";
	} else if (props.t === "wplaced") {
		case_type = "case-y";
	}
	//console.log(case_type);
	return <div className={"case " + case_type}>{props.letter}</div>;
}

export default Box;
