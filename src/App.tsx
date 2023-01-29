import { useState, useEffect } from "react";
import Box from "./components/Box";
import words from "./words.json";

function build_row(curent_word: string, row: string[], id: any) {
	let out = [];

	if (row === undefined) {
		for (let i = 0; i < 5; i++) {
			out.push(<Box letter=" " key={i} />);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			if (row[i] === undefined) {
				out.push(<Box letter=" " key={i} />);
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

function App() {
	let [curentWord, setCurentWord] = useState(words.at(1));

	let [rows, setRows] = useState<string[]>([]);

	let [input, setInput] = useState("");

	let [win, setWin] = useState(false);

	function hasWon(): boolean {
		return win;
	}

	function hasLost(): boolean {
		return !win && rows.length === 5;
	}

	/*useEffect(() => {
		fetch(process.env.REACT_APP_WORD_API_URL)
			.then((r) => r.json())
			.then((r) => setCurentWord(r));
	}, []);*/

	//setCurentWord(words.at(1));

	function push_rows() {
		if (!hasWon() && !hasLost() && input.length === 5) {
			let r = rows;
			r.push(input);
			setRows(r);
			if (input === curentWord) {
				setWin(true);
			}
			setInput("");
		}
	}

	function reset_game() {
		setWin(false);
		setInput("");
		setRows([]);
		setCurentWord(words.at(1));
	}

	return (
		<div className="App">
			<div className="flex items-center justify-center p-6">
				<div className="flex w-max flex-col rounded border border-slate-600 p-4 shadow">
					<button className="sticky left-10" onClick={reset_game}>
						New
					</button>
					<h1
						className={`mb-3 text-center text-xl font-bold transition-colors ${(() => {
							if (hasWon()) {
								return "text-green-600";
							} else if (hasLost()) {
								return "text-red-600";
							} else {
								return "text-black dark:text-slate-100";
							}
						})()}`}
					>
						{(() => {
							if (hasWon()) {
								return "You Won";
							} else if (hasLost()) {
								return "You Loose";
							} else {
								return "React Wordle";
							}
						})()}
					</h1>
					<div className="grid select-none grid-cols-5 grid-rows-6 gap-4">
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
							className="transition-color col-span-4 h-16 appearance-none rounded border border-slate-600 bg-slate-200 pl-4 text-left text-black focus:outline-none dark:border-0 dark:bg-gray-800 dark:text-white"
							placeholder={
								hasWon() || hasLost() ? "Try again?" : "Type a word here..."
							}
							value={input}
							disabled={hasWon() || hasLost()}
							onChange={(e) => {
								if (
									e.target.value.length <= 5 &&
									(/^[a-zA-Z]+$/.test(e.target.value) ||
										e.target.value === "") &&
									!hasWon()
								) {
									setInput(e.target.value);
								}
							}}
							onKeyDown={(e) => {
								if (e.key && e.key == "Enter") {
									push_rows();
								}
							}}
							autoFocus
						/>
						<button
							className="h-16 w-16 rounded border border-slate-600 bg-slate-200 text-black transition-colors hover:bg-slate-400 disabled:bg-slate-300 dark:border-0 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-600"
							onClick={() => {
								push_rows();
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
