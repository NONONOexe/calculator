(function() {
	var operand1 = "";
	var operand2 = "";
	var operator = "";
	var result = "";
	var inputedOperator = false;
	var inputedOperand1 = false;

	window.onload = function init() {
		operand = document.getElementById("display-operand");
		state = document.getElementById("display-state");

		// イベントハンドラの設定
		// 数字キー
		numberButtons = document.getElementsByClassName("number");
		for (numberButton of numberButtons) {
			numberButton.addEventListener("click", (e) => pushNumber(e.target.dataset.number));
		}

		// 四則演算キー
		symbolButtons = document.getElementsByClassName("symbol");
		for (symbolButton of symbolButtons) {
			symbolButton.addEventListener("click", (e) => pushSymbol(e.target.dataset.symbol));
		}

		// Cキー
		clrButton = document.getElementById("clr");
		clrButton.addEventListener("click", (e) => clear());
		
		// ACキー
		acButton = document.getElementById("ac");
		acButton.addEventListener("click", (e) => allClear());

		// イコールキー
		eqlButton = document.getElementById("eql");
		eqlButton.addEventListener("click", (e) => calc());

		function pushNumber(number) {
			if (operand1.length != 0 && inputedOperator) {
				operand.innerText = "";
				inputedOperator = false;
				inputedOperand1 = true;
			}
			if (inputedOperand1) {
				if (14 <= operand2.length) {
					state.innerText = "ERROR";
					return;
				}
				operand2 += number;
				operand.innerText = operand2;
			} else {
				if (14 <= operand1.length) {
					state.innerText = "ERROR";
					return;
				}
				operand1 += number;
				operand.innerText = operand1;
			}
		}

		function pushSymbol(symbol) {
			if (result.length != 0) {
				operand1 = result;
				result = "";
			}
			switch (symbol) {
				case "add":
					state.innerText = "＋";
					break;
				case "sub":
					state.innerText = "−";
					break;
				case "mul":
					state.innerText = "×";
					break;
				case "div":
					state.innerText = "÷";
					break;
				default:
					state.innerText = "開発中";
			}
			operator = symbol;
			inputedOperator = true;
		}

		function clear() {
			if (inputedOperand1) {
				operand2 = "";
			} else {
				operand1 = "";
			}
			operand.innerText = "";
		}

		function allClear() {
			operand1 = "";
			operand2 = "";
			operator = "";
			result = "";
			inputedOperator = false;
			inputedOperand1 = false;
			operand.innerText = "";
			state.innerText = "";
		}

		function calc() {
			if (operator.length == 0) return;
			if (operand2.length == 0) {
				operator = "";
				inputedOperator = false;
				state.innerText = "";
				return;
			}
			switch (operator) {
				case "add":
					result = parseFloat(operand1) + parseFloat(operand2);
					break;
				case "sub":
					result = parseFloat(operand1) - parseFloat(operand2);
					break;
				case "mul":
					result = parseFloat(operand1) * parseFloat(operand2);
					break;
				case "div":
					result = parseFloat(operand1) / parseFloat(operand2);
					break;
			}
			operand1 = "";
			operand2 = "";
			operator = "";
			operand.innerText = result;
			state.innerText = "";
		}
	}
}());
