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
						{(() => {
							let out = [];
							for (let i = 0; i < 5; i++) {
								if (input[i] === undefined) {
									let char = "";
									out.push(undefined)
								} else {
									let char = input[i].toUpperCase()

									if (char === curentWord[i].toUpperCase()) {
										out.push(<Box letter={char} key={i}/>)
									} else {
										out.push(<Box letter={char} key={i}/>)
									}
								}
							}
							//Array.from(input).forEach(function(char) {
							//	console.log(char);
							//	out.push(char.toUpperCase());
							//});
							return out
						})()}
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
					//rows.push(input)
					let r = rows
					r.push(input)
					setRows(r)

					console.log(JSON.stringify(rows))
				}
			}}>Enter</button>
		</div>
	);
}

export default App;
