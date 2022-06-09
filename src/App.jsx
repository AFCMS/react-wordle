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

									console.log(char)

									if (curentWord[i] !== undefined && char === curentWord[i].toUpperCase()) {
										out.push(<Box letter={char} key={i} type={right}/>)
										console.log(char === curentWord[i].toUpperCase())
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
						{(()=>{
							let out = [];
							for (let i = 0; i < 5; i++) {
								out.push(<Box letter="B" key={i}/>)
							}
							return out
						})()}
					</div>
					<div className="flex flex-row">
						<input type="text" name="input" id="input" className="bg-slate-200 rounded border m-1 h-10 border-slate-600 w-4/5" value={input} onChange={e => {
							if (e.target.value.length <= 5 && (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value === "")) {
								setInput(e.target.value)
							}
						}}/>
						<button className="bg-slate-200 rounded border m-1 h-10 border-slate-600 w-1/5" onClick={() => {
							if (input.length === 5) {
								let r = rows
								r.push(input)
								setRows(r)

								console.log(JSON.stringify(rows))
							}
						}}>Enter</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
