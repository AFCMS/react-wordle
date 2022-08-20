import { useState, useEffect } from "react";
import Box from "./components/Box";
import words from "./words.json";

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
	return <>{out}</>;
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
	let [curentWord, setCurentWord] = useState(words.at(1));

	let [rows, setRows] = useState([]);

	let [input, setInput] = useState("");

	let [win, setWin] = useState(false);

	/*useEffect(() => {
		fetch(process.env.REACT_APP_WORD_API_URL)
			.then((r) => r.json())
			.then((r) => setCurentWord(r));
	}, []);*/

	//setCurentWord(words.at(1));

	return (
		<div className="App">
			<div className="">
				<div className="mx-auto max-w-screen-md rounded border border-slate-600 p-4">
					<h1 className="mt-1 text-center text-xl font-bold text-black transition-colors dark:text-white">
						React Wordle {win ? "GG" : ""}
					</h1>
					<div className="grid grid-cols-5 grid-rows-6 gap-4">
						{(() => {
							let lines = [];
							for (let r = 0; r < 5; r++) {
								lines.push(build_row(curentWord, rows[r], r));
							}
							return lines;
						})()}
						<input
							type="text"
							name="input"
							id="input"
							className="col-span-4 m-1 h-10 w-4/5 rounded border border-slate-600 bg-slate-200 text-black transition-colors dark:border-0 dark:bg-gray-800 dark:text-white"
							value={input}
							disabled={win}
							onChange={(e) => {
								if (
									e.target.value.length <= 5 &&
									(/^[a-zA-Z]+$/.test(e.target.value) ||
										e.target.value === "") &&
									win == false
								) {
									setInput(e.target.value);
								}
							}}
						/>
						<button
							className="m-1 h-10 w-1/5 rounded border border-slate-600 bg-slate-200 text-black transition-colors hover:bg-slate-400 disabled:bg-slate-300 dark:border-0 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
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
