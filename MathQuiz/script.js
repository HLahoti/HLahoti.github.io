let highscore_field, currentscore_field;
let next_btn, submit_btn, answer_field;
let num1_field, num2_field, operator_field;
let output_field;

window.addEventListener("load", function() {
	highscore_field = document.getElementById("highscore_text");
	currentscore_field = document.getElementById("currentscore_text");
	num1_field = document.getElementById("num_1");
	num2_field = document.getElementById("num_2");
	operator_field = document.getElementById("operator");
	next_btn = document.getElementById("next");
	submit_btn = document.getElementById("submit");
	answer_field = document.getElementById("answer_field");
	output_field = document.getElementById("check");
	//
	document.getElementById("light").addEventListener("click", theme_manager);
	document.getElementById("dark").addEventListener("click", theme_manager);
	next_btn.addEventListener("click", next_func);
	submit_btn.addEventListener("click", submit_func);
});

let highscore, currentscore;
let num1, num2, operator;
let lighttheme = true,
	darktheme = false;
let answer,
	checkedanswer,
	answer_correct = true;
let started = false;

const operators_available = ["+", "-", "/", "x"];
const plus = { maxnum: 600, minnum: 40 },
	minus = { maxnum: 600, minnum: 40 },
	multiply_1st = { maxnum: 40, minnum: 2 },
	multiply_2nd = { maxnum: 17, minnum: 2 },
	divide_1st = { maxnum: 600, minnum: 10 },
	divide_2nd = { maxnum: 30, minnum: 2 };

const start = () => {
	if (started == false) {
		highscore = parseInt(highscore_field.innerHTML);
		currentscore = parseInt(currentscore_field.innerHTML);
		started = true;
		next_btn.innerHTML = "next";
	}
};

const main = () => {
	let operator_index = Math.floor(Math.random() * 4);
	let operator = operators_available[operator_index];
	console.log(operator);
	if (operator_index == 0) {
		plus_func();
	} else if (operator_index == 1) {
		minus_func();
	} else if (operator_index == 2) {
		divide_func();
	} else if (operator_index == 3) {
		multiply_func();
	}
	num1_field.innerHTML = num1;
	num2_field.innerHTML = num2;
	operator_field.innerHTML = operator;
};

const plus_func = () => {
	let maxint = plus.maxnum,
		minint = plus.minnum;
	num1 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	num2 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	checkedanswer = num1 + num2;
	console.log(`${num1} + ${num2} = ${checkedanswer}`);
};
const minus_func = () => {
	let maxint = plus.maxnum,
		minint = plus.minnum;
	num1 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	num2 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	if (num2 == num1) {
		num2 = num2 - 1;
	}
	if (num2 > num1) {
		let x = num2;
		num2 = num1;
		num1 = x;
	}
	checkedanswer = num1 - num2;
	console.log(`${num1} - ${num2} = ${checkedanswer}`);
};
const divide_func = () => {
	let numbers_found = false;
	let maxint1 = divide_1st.maxnum,
		minint1 = divide_1st.minnum,
		maxint2 = divide_2nd.maxnum,
		minint2 = divide_2nd.minnum;
	while (numbers_found != true) {
		num1 = Math.floor(Math.random() * (maxint1 - minint1 + 1) + minint1);
		num2 = Math.floor(Math.random() * (maxint2 - minint2 + 1) + minint2);
		if (num2 > num1 || num1 % num2 != 0) {
			num1 = Math.floor(
				Math.random() * (maxint1 - minint1 + 1) + minint1
			);
			num2 = Math.floor(
				Math.random() * (maxint2 - minint2 + 1) + minint2
			);
		} else {
			break;
		}
	}
	checkedanswer = num1 / num2;
	console.log(`${num1} / ${num2} = ${checkedanswer}`);
};
const multiply_func = () => {
	let maxint1 = multiply_1st.maxnum,
		minint1 = multiply_1st.minnum,
		maxint2 = multiply_2nd.maxnum,
		minint2 = multiply_2nd.minnum;
	num1 = Math.floor(Math.random() * (maxint1 - minint1 + 1) + minint1);
	num2 = Math.floor(Math.random() * (maxint2 - minint2 + 1) + minint2);
	checkedanswer = num1 * num2;
	console.log(`${num1} x ${num2} = ${checkedanswer}`);
};

const next_func = () => {
	main();
	start();
};

const score_manager = () => {
	currentscore_field.innerHTML = currentscore;
	if (currentscore > highscore) {
		highscore += 1;
	}
	highscore_field.innerHTML = highscore;
};

const submit_func = () => {
	if (started == true) {
		answer = answer_field.value;
		if (answer == "") {
			output_field.innerHTML = "You havent given an answer yet.";
			answer_correct = false;
		} else if (answer == checkedanswer) {
			output_field.innerHTML = "Correct answer!";
			answer_correct = true;
			currentscore += 1;
		} else if (answer != checkedanswer) {
			output_field.innerHTML = `Wrong answer, the correct answer is ${checkedanswer}`;
			answer_correct = false;
			currentscore = 0;
		}
	}
	score_manager();
};

const theme_manager = () => {
	if ((lighttheme == true) & (darktheme == false)) {
		document.getElementById("container").style.filter = "invert(1)";
		lighttheme = false;
		darktheme = true;
	} else {
		document.getElementById("container").style.filter = "invert(0)";
		lighttheme = true;
		darktheme = false;
	}
};
