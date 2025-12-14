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

		// 小数点キー
		decButton = document.getElementById("dec");
		decButton.addEventListener("click", (e) => pushDecimalPoint());

		// Cキー
		clrButton = document.getElementById("clr");
		clrButton.addEventListener("click", (e) => clear());
		
		// ACキー
		acButton = document.getElementById("ac");
		acButton.addEventListener("click", (e) => allClear());

		// イコールキー
		eqlButton = document.getElementById("eql");
		eqlButton.addEventListener("click", (e) => calc());

		/**
		 * 指定された数値をオペランド表示部に反映する
		 * @param {number} number オペランド表示部に表示する数値
		 */
		function updateOperand(number) {
			const str = number.toString();
			operand.innerText = str.slice(0, 10);
		}

		function pushNumber(number) {
			result = "";
			if (operand1.length != 0 && inputedOperator) {
				updateOperand("");
				inputedOperator = false;
				inputedOperand1 = true;
			}
			if (inputedOperand1) {
				if (10 <= operand2.length) {
					state.innerText = "ERROR";
					return;
				}
				operand2 += number;
				updateOperand(operand2);
			} else {
				if (10 <= operand1.length) {
					state.innerText = "ERROR";
					return;
				}
				operand1 += number;
				updateOperand(operand1);
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

		function pushDecimalPoint() {
			if (inputedOperand1) {
				if (!operand2.includes(".")) {
					operand2 += ".";
					updateOperand(operand2);
				}
			} else {
				if (!operand1.includes(".")) {
					operand1 += ".";
					updateOperand(operand1);
				}
			}
		}

		function clear() {
			if (inputedOperand1) {
				operand2 = "";
			} else {
				operand1 = "";
			}
			updateOperand("");
		}

		function allClear() {
			operand1 = "";
			operand2 = "";
			operator = "";
			result = "";
			inputedOperator = false;
			inputedOperand1 = false;
			updateOperand("");
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
					register = new Decimal(operand1).add(operand2);
					break;
				case "sub":
					register = new Decimal(operand1).sub(operand2);
					break;
				case "mul":
					register = new Decimal(operand1).mul(operand2);
					break;
				case "div":
					register = new Decimal(operand1).div(operand2);
					break;
			}
			allClear();
			updateOperand(result = register.toString());
		}
	}
}());
