import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// https://random-word-api.herokuapp.com/word?length=5

function App() {
	let [curentWord, setCurentWord] = useState("aaaaa");

	useEffect(() => {
		fetch(process.env.REACT_APP_WORD_API_URL)
		.then(r => r.text())
		.then(r => setCurentWord(r))
	}, []);

	return (
		<div className="App">
			{curentWord}
		</div>
	);
}

export default App;
