import { useState, useEffect } from "react";
import Box from "./components/Box";
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
						{() => {
							let out = [];
							Array.from(input).forEach(function(char) {
								console.log(char);
								out.push(<Box letter={char} />);
							});
							return out
						}}
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
			<input type="text" name="input" id="input" className="bg-slate-200 rounded border" onChange={e => {
				setInput(e.target.value)
			}}/>
			<button className="bg-slate-200 rounded border" onClick={() => {
				if (input.length === 5) {
					rows.push(input)
				}
			}}>Enter</button>
		</div>
	);
}

export default App;
