import { useState, useEffect } from "react";
import Box from "./components/Box";
import "./App.css";

function build_row(curent_word, row, id) {
	let out = [];

	if (row === undefined) {
		for (let i = 0; i < 5; i++) {
			out.push(<Box letter="" key={i} />);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			if (row[i] === undefined) {
				out.push(<Box letter="" key={i} />);
			} else {
				let char = row[i].toUpperCase();
				let char_c = curent_word[i].toUpperCase();

				if (char === char_c) {
					out.push(<Box letter={char} key={i} t={"right"} />);
				} else {
					if (curent_word.match(row[i])) {
						out.push(<Box letter={char} key={i} t={"wplaced"} />);
					} else {
						out.push(<Box letter={char} key={i} t={"wrong"} />);
					}
				}
			}
		}
	}
	return (
		<div className="flex flex-row" key={id}>
			{out}
		</div>
	);
}

/*
function build_row_input(curent_word, input) {
	let out = [];
	for (let i = 0; i < 5; i++) {
		if (input[i] === undefined) {
			out.push(<Box letter="" key={i} t={"edit"} />);
		} else {
			let char = input[i].toUpperCase();
			out.push(<Box letter={char} key={i} t={"edit"} />);
		}
	}
	return <div className="flex flex-row">{out}</div>;
}*/

function App() {
	let [curentWord, setCurentWord] = useState("allay");

	let [rows, setRows] = useState([]);

	let [input, setInput] = useState("");

	let [win, setWin] = useState(false);

	useEffect(() => {
		fetch(process.env.REACT_APP_WORD_API_URL)
			.then((r) => r.json())
			.then((r) => setCurentWord(r));
	}, []);

	return (
		<div className="App">
			<div className="m-2 flex justify-center align-middle">
				<div className="rounded border border-slate-600">
					<h1 className="text-center text-xl">
						React Wordle {win ? "GG" : ""}
					</h1>
					{(() => {
						let lines = [];
						for (let r = 0; r < 5; r++) {
							lines.push(build_row(curentWord, rows[r], r));
						}
						return lines;
					})()}
					<div className="flex flex-row">
						<input
							type="text"
							name="input"
							id="input"
							className="m-1 h-10 w-4/5 rounded border border-slate-600 bg-slate-200"
							value={input}
							onChange={(e) => {
								if (
									e.target.value.length <= 5 &&
									(/^[a-zA-Z]+$/.test(e.target.value) || e.target.value === "")
								) {
									setInput(e.target.value);
								}
							}}
						/>
						<button
							className="m-1 h-10 w-1/5 rounded border border-slate-600 bg-slate-200 hover:bg-slate-400 disabled:bg-slate-300"
							onClick={() => {
								if (!win && input.length === 5) {
									let r = rows;
									r.push(input);
									setRows(r);
									if (input === curentWord) {
										console.log("Gagné");
										setWin(true);
									}
									setInput("");

									//console.log(JSON.stringify(rows));
								}
							}}
						>
							Enter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
