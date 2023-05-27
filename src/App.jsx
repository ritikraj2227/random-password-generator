import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import copy from "./images/copy.svg";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(8);
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const numbers = "0123456789";
	const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
	const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
  const min = 6;
  const max= 24;

	const handleGeneratePassword = () => {
		if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
			toast("You must Select atleast one option");
		}

		let characterList = "";

		if (includeLowercase) {
			characterList = characterList + lowerCaseLetters;
		}

		if (includeUppercase) {
			characterList = characterList + upperCaseLetters;
		}

		if (includeNumbers) {
			characterList = characterList + numbers;
		}

		if (includeSymbols) {
			characterList = characterList + specialCharacters;
		}

		setPassword(createPassword(characterList));
	};

	const createPassword = (characterList) => {
		let password = "";
		const characterListLength = characterList.length;

		for (let i = 0; i < passwordLength; i++) {
			const characterIndex = Math.round(Math.random() * characterListLength);
			password = password + characterList.charAt(characterIndex);
		}
		return password;
	};


   const copyToClipboard = () => {
		const newTextArea = document.createElement("textarea");
		newTextArea.innerText = password;
		document.body.appendChild(newTextArea);
		newTextArea.select();
		document.execCommand("copy");
		newTextArea.remove();
   };

	const handleCopyPassword = () => {
		if (password === "") {
			toast("Nothing To Copy");
		} else {
			copyToClipboard();
			toast("COPY_SUCCESS");
		}
	};



	return (
		<div className="container">
			<h1>Password Generator</h1>

			<div className="display card-background">
				<div className="password text-color">{password === "" ? "CLICK GENERATE" : password}</div>
				<div className="copy-password">
					<img
						src={copy}
						alt=""
						onClick={handleCopyPassword}
					/>
				</div>
			</div>

			<div className="form-control">
				<div className="length ">
					<div className="field-title">
						length: <span>{passwordLength}</span>
					</div>
					<div className="text-color range card-background">
						<p>{min}</p>
						<input
							id="slider"
							type="range"
							min={min}
							max={max}
							value={passwordLength}
							onChange={(e) => setPasswordLength(e.target.value)}
						/>
						<p>{max}</p>
					</div>
				</div>
				<div className="settings">
					<div className="field-title">Setting</div>
					<div className="setting card-background">
						<label htmlFor="upper">Include Uppercase</label>
						<div className="check-box">
							<input
								type="checkbox"
								id="upper"
								checked={includeUppercase}
								onChange={(e) => setIncludeUppercase(e.target.checked)}
							/>
						</div>
					</div>
					<div className="setting card-background">
						<label htmlFor="lower">Include Lowercase</label>
						<div className="check-box">
							<input
								id="lower"
								type="checkbox"
								checked={includeLowercase}
								onChange={(e) => setIncludeLowercase(e.target.checked)}
							/>
						</div>
					</div>
					<div className="setting card-background">
						<label htmlFor="number">Include Numbers</label>
						<div className="check-box">
							<input
								id="number"
								type="checkbox"
								checked={includeNumbers}
								onChange={(e) => setIncludeNumbers(e.target.checked)}
							/>
						</div>
					</div>
					<div className="setting card-background">
						<label htmlFor="symbol">Include Symbols</label>
						<div className="check-box">
							<input
								id="symbol"
								type="checkbox"
								checked={includeSymbols}
								onChange={(e) => setIncludeSymbols(e.target.checked)}
							/>
						</div>
					</div>
					<div
						className="card-background sub-btn"
						onClick={handleGeneratePassword}>
						<h3>GENERATE PASSWORD</h3>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
