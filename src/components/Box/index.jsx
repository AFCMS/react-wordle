import "./Box.css";

/**
 * @param {{t: "edit"|"right"|"wrong"|"wplaced", letter: string}} props
 */
function Box(props) {
	let case_type = "";

	switch (props.t) {
		case "edit":
			case_type = "case-b";
			break;
		case "right":
			case_type = "case-g";
			break;
		case "wrong":
			case_type = "case-e";
			break;
		case "wplaced":
			case_type = "case-y";
			break;
	}

	return <div className={"case " + case_type}>{props.letter}</div>;
}

export default Box;
