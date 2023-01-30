import { useState, useEffect } from "react";
import Box from "./components/Box";

/**
 * @param curent_word The word to guess, used to determine the color of the letters
 * @param row The 5 letter string of the line
 * @param id Used to give boxes a unique key
 */
function build_row(
	curent_word: string | undefined,
	row: string,
	id: number
): Array<JSX.Element> {
	let out = [];

	if (row === undefined) {
		for (let i = 0; i < 5; i++) {
			let box_id = i + 5 * id;
			out.push(<Box letter=" " key={box_id} />);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			let box_id = i + 5 * id;
			if (row[i] === undefined) {
				out.push(<Box letter=" " key={box_id} />);
			} else {
				let char = row[i].toUpperCase();
				let char_c =
					curent_word === undefined ? "" : curent_word[i].toUpperCase();

				if (char === char_c) {
					out.push(<Box letter={char} key={box_id} t="right" />);
				} else {
					if (curent_word === undefined ? false : curent_word.match(row[i])) {
						out.push(<Box letter={char} key={box_id} t="wplaced" />);
					} else {
						out.push(<Box letter={char} key={box_id} t="wrong" />);
					}
				}
			}
		}
	}
	return out;
}

function App() {
	let [curentWord, setCurentWord] = useState<string | undefined>(undefined);

	let [newWord, setNewWord] = useState(false);

	let [rows, setRows] = useState<string[]>([]);

	let [input, setInput] = useState("");

	let [win, setWin] = useState(false);

	function hasWon(): boolean {
		return win;
	}

	function hasLost(): boolean {
		return !win && rows.length === 5;
	}

	useEffect(() => {
		if (newWord || curentWord === undefined) {
			fetch(import.meta.env.VITE_WORD_API_URL)
				.then((r) => r.json() as Promise<string[]>)
				.then((r) => setCurentWord(r[0]));
			setNewWord(false);
		}
	}, [newWord]);

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
		setNewWord(true);
	}

	return (
		<div className="App">
			<div className="flex items-center justify-center p-6">
				<div className="flex w-max flex-col rounded border border-slate-600 p-4 shadow">
					<button
						className="absolute h-10 w-10 rounded border border-slate-600 bg-slate-200 text-black transition-colors hover:bg-slate-400 disabled:bg-slate-300 dark:border-0 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-600"
						onClick={reset_game}
					>
						New
					</button>
					<h1
						className={`mb-6 mt-2 text-center text-xl font-bold transition-colors ${(() => {
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
							disabled={hasWon() || hasLost() || newWord}
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
