import { useState, useEffect } from "react";
import "./App.css";

function App() {
	let [curentWord, setCurentWord] = useState(".....");

	let [rows, setRows] = useState([]);

	let [input, setInput] = useState("");

	useEffect(() => {
		fetch(process.env.REACT_APP_WORD_API_URL)
			.then(r => r.json())
			.then(r => setCurentWord(r))
	}, []);

	return (
		<div className="App">
			{curentWord}
			<div className="bg-slate-600 h-20 w-20"></div>
			<div className="flex justify-center align-middle">
				<div className="border border-slate-600 rounded">
					<div className="flex flex-row">
						<div className="case">A</div>
						<div className="case">A</div>
						<div className="case">A</div>
						<div className="case">A</div>
						<div className="case">A</div>
					</div>
					<div className="flex flex-row">
						<div className="case">B</div>
						<div className="case">B</div>
						<div className="case">B</div>
						<div className="case">B</div>
						<div className="case">B</div>
					</div>
				</div>
			</div>
			{input}
			<input type="text" name="input" id="input" className="bg-slate-200" onChange={e => setInput(e.target.value)}/>
			<button className="bg-slate-200">Enter</button>
		</div>
	);
}

export default App;
