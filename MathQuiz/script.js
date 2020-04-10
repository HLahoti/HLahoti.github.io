const idGetter = (id) => document.getElementById(id);
const classGetter = (className) => document.getElementsByClassName(className);

const highscore_field = idGetter("highscore_text"),
	currentscore_field = idGetter("currentscore_text"),
	num1_field = idGetter("num_1"),
	num2_field = idGetter("num_2"),
	operator_field = idGetter("operator"),
	next_btn = idGetter("next"),
	submit_btn = idGetter("submit"),
	answer_field = idGetter("answer_field"),
	output_field = idGetter("check"),
	toggle = idGetter("toggle"),
	toggle2 = idGetter("toggle2"),
	bar = idGetter("bar"),
	bar2 = idGetter("bar2"),
	add = idGetter("plus"),
	subtract = idGetter("minus"),
	multiply = idGetter("multiply"),
	divide = idGetter("divide"),
	add_max = idGetter("addmax"),
	add_min = idGetter("addmin"),
	subtract_max = idGetter("minusmax"),
	subtract_min = idGetter("minusmin"),
	multiply_max = idGetter("multiplymax"),
	multiply_min = idGetter("multiplymin"),
	divide_max = idGetter("dividemax"),
	divide_min = idGetter("dividemin"),
	nav = idGetter("nav"),
	toggles = classGetter("settings-container"),
	checkboxes = classGetter("checkbox");

let isBarVisible = false,
	isSettingsBarVisible = false,
	colorSchemes = {
		black: {
			bg: "black",
			text: "white",
			accents: "white",
			navbarSide: "5vw solid rgba(225,225,225, 0.87)",
			navbarHoverSide: "5vw solid rgba(225,225,225, 0.0)",
			navbarBg: "black",
		},
		sepia: {
			bg: "antiquewhite",
			text: "black",
			accents: "black",
			navbarSide: "5vw solid rgba(47, 47, 47, 0.87)",
			navbarHoverSide: "5vw solid rgba(47, 47, 47, 0.0)",
			navbarBg: "antiquewhite",
		},
		white: {
			bg: "white",
			text: "black",
			accents: "black",
			navbarSide: "5vw solid rgba(47, 47, 47, 0.87)",
			navbarHoverSide: "5vw solid rgba(47, 47, 47, 0.0)",
			navbarBg: "white",
		},
	},
	current_color_scheme = "sepia",
	operatorsSelected = {
		plus: true,
		minus: true,
		multiply: true,
		divide: true,
	},
	operators_available = ["+", "-", "/", "x"],
	plus = { maxnum: 600, minnum: 40 },
	minus = { maxnum: 600, minnum: 40 },
	multiply_1st = { maxnum: 40, minnum: 2 },
	multiply_2nd = { maxnum: 17, minnum: 2 },
	divide_1st = { maxnum: 600, minnum: 10 },
	divide_2nd = { maxnum: 30, minnum: 2 };

const colorSchemeSetter = (color, event) => {
	current_color_scheme = color;
	const container = idGetter("mega-container");
	container.style.backgroundColor = colorSchemes[color].bg;
	container.style.color = colorSchemes[color].text;
	answer_field.style.borderTop = `4px solid ${colorSchemes[color].accents}`;
	answer_field.style.borderBottom = `4px solid ${colorSchemes[color].accents}`;
	const btns = classGetter("btn");
	for (let i = 0; i < btns.length; i++) {
		btns[i].style.border = `3px solid ${colorSchemes[color].accents}`;
	}
	const toggle_sciwtches = classGetter("toggle");
	for (let i = 0; i < toggle_sciwtches.length; i++) {
		let colour_bg = colorSchemes[color].bg === "black" ? "white" : "black",
			colour_text =
				colorSchemes[color].text === "black" ? "white" : "black";
		toggle_sciwtches[i].style.backgroundColor = colour_bg;
		toggle_sciwtches[i].style.color = colour_text;
	}
	answer_field.style.color = colorSchemes[color].text;
	const bar_elements = classGetter("bar_element");
	for (let i = 0; i < bar_elements.length; i++) {
		bar_elements[
			i
		].style.border = `3px solid ${colorSchemes[color].accents}`;
		bar_elements[i].style.backgroundColor = colorSchemes[color].bg;
	}
	const colors = classGetter("color");
	for (let i = 0; i < colors.length; i++) {
		colors[i].style.border = `1px solid ${colorSchemes[color].accents}`;
	}
	let inputs = classGetter("maxnum");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].style.border = `1px solid ${colorSchemes[color].accents}`;
		inputs[i].style.color = colorSchemes[color].text;
	}
	inputs = classGetter("minnum");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].style.border = `1px solid ${colorSchemes[color].accents}`;
		inputs[i].style.color = colorSchemes[color].text;
	}
	nav.style.borderRight = colorSchemes[color].navbarSide;
	nav.style.backgroundColor = colorSchemes[color].bg;
};

const screenAdjust = () => {
	if (screen.width >= 750) {
		for (obj in colorSchemes) {
			colorSchemes[obj].navbarSide = "none";
			colorSchemes[obj].navbarHoverSide = "none";
			colorSchemes[obj].navbarBg = "rgba(0,0,0,0)";
		}
	} else {
		colorSchemes.black.navbarSide = "5vw solid rgba(225,225,225, 0.87)";
		colorSchemes.black.navbaHoverSide = "5vw solid rgba(225,225,225, 0.0)";
		colorSchemes.black.navbarBg = "black";
		colorSchemes.sepia.navbarSide = "5vw solid rgba(47, 47, 47, 0.87)";
		colorSchemes.sepia.navbaHoverSide = "5vw solid rgba(47, 47, 47, 0.0)";
		colorSchemes.sepia.navbarBg = "antiquewhite";
		colorSchemes.white.navbarSide = "5vw solid rgba(47, 47, 47, 0.87)";
		colorSchemes.white.navbaHoverSide = "5vw solid rgba(47, 47, 47, 0.0)";
		colorSchemes.white.navbarBg = "white";
	}
	colorSchemeSetter(current_color_scheme);
};

const operator_editor = () => {
	let list = [];
	if (operatorsSelected.plus) {
		list.push("+");
	}
	if (operatorsSelected.minus) {
		list.push("-");
	}
	if (operatorsSelected.multiply) {
		list.push("x");
	}
	if (operatorsSelected.divide) {
		list.push("/");
	}
	operators_available = list;
};

let highscore = 0,
	currentscore = 0,
	num1,
	num2,
	operator,
	lighttheme = true,
	darktheme = false,
	answer,
	checkedanswer,
	answer_correct = true,
	started = false;

const typeChecker = (value) => {
	return (
		!isNaN(value) &&
		(function (x) {
			return (x | 0) === x;
		})(parseFloat(value))
	);
};

const rangeEditor = (effector, event) => {
	if (typeChecker(event.currentTarget.value)) {
		effector[event.currentTarget.className] = parseInt(
			event.currentTarget.value
		);
	}
};

const addRangeEditor = (event) => {
	rangeEditor(plus, event);
};

const subtractRangeEditor = (event) => {
	rangeEditor(minus, event);
};

const multiplyRangeEditor = (event) => {
	rangeEditor(multiply_2nd, event);
};

const divideRangeEditor = (event) => {
	rangeEditor(divide_2nd, event);
};

const checkHandler = (event) => {
	operatorsSelected[event.currentTarget.id] = !operatorsSelected[
		event.currentTarget.id
	];
	operator_editor();
};

const start = () => {
	if (started == false) {
		highscore = 0;
		currentscore = 0;
		started = true;
		next_btn.innerHTML = "next";
	}
	submit_btn.style.opacity = 1;
	submit_btn.style.pointerEvents = "all";
};

const spaceAdder = (number) => {
	if (number < 10 && number < 100) {
		return `  ${number}`;
	} else if (number < 100) {
		return ` ${number}`;
	} else {
		return number;
	}
};

const main = () => {
	let operator_index = Math.floor(Math.random() * operators_available.length);
	operator = operators_available[operator_index];
	if (operator == "+") {
		plus_func();
	} else if (operator == "-") {
		minus_func();
	} else if (operator == "x") {
		multiply_func();
	} else if (operator == "/") {
		divide_func();
	}
	num1_field.innerHTML = spaceAdder(num1);
	num2_field.innerHTML = spaceAdder(num2);
	submit_btn.style.pointerEvents = "all";
	operator_field.innerHTML = operator;
	answer_field.value = "";
	answer_field.style.borderTop = `4px solid ${colorSchemes[current_color_scheme].accents}`;
	answer_field.style.borderBottom = `4px solid ${colorSchemes[current_color_scheme].accents}`;
	output_field.innerHTML = "";
	screenAdjust();
};

const switchero = () => {
	if (num2 > num1) {
		num1 = num2 + num1;
		num2 = num1 - num2;
		num1 = num1 - num2;
	}
};

const plus_func = () => {
	let maxint = plus.maxnum,
		minint = plus.minnum;
	num1 = Math.floor(Math.random() * (maxint - minint) + minint);
	num2 = Math.floor(Math.random() * (maxint - minint) + minint);
	switchero();
	checkedanswer = num1 + num2;
	console.log(`${num1} + ${num2} = ${checkedanswer}`);
};
const minus_func = () => {
	let maxint = minus.maxnum,
		minint = minus.minnum;
	num1 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	num2 = Math.floor(Math.random() * (maxint - minint + 1) + minint);
	num2 = num2 == num1 ? num2 - 1 : num2;
	switchero();
	checkedanswer = num1 - num2;
	console.log(`${num1} - ${num2} = ${checkedanswer}`);
};
const divide_func = () => {
	let maxint1 = divide_1st.maxnum,
		minint1 = divide_1st.minnum,
		maxint2 = divide_2nd.maxnum,
		minint2 = divide_2nd.minnum;
	// num1_field.style.borderBottom = `3px solid ${colorSchemes[current_color_scheme].accents}`;
	while (true != false) {
		num1 = Math.floor(Math.random() * (maxint1 - minint1 + 1) + minint1);
		num2 = Math.floor(Math.random() * (maxint2 - minint2 + 1) + minint2);
		if (num2 < num1 && num1 % num2 === 0) {
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
	switchero();
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
			answer_field.style.borderTop = `4px solid rgb(37, 231, 109)`;
			answer_field.style.borderBottom = `4px solid rgb(37, 231, 109)`;
			currentscore += 1;
			submit_btn.style.pointerEvents = "none";
		} else if (answer != checkedanswer) {
			output_field.innerHTML = `Wrong answer, the correct answer is ${checkedanswer}`;
			answer_correct = false;
			answer_field.style.borderTop = `4px solid rgb(248, 38, 38)`;
			answer_field.style.borderBottom = `4px solid rgb(248, 38, 38)`;
			currentscore = 0;
			submit_btn.style.pointerEvents = "none";
		}
	} else {
		output_field.innerHTML = "You havent started yet.";
	}
	score_manager();
};

const toggleBar = (event) => {
	if (event.currentTarget.id === "toggle") {
		if (isBarVisible) {
			bar.style.height = "auto";
			bar.style.opacity = 1;
			bar.style.pointerEvents = "all";
			isBarVisible = !isBarVisible;
		} else {
			bar.style.opacity = 0;
			bar.style.height = 0;
			bar.style.pointerEvents = "none";
			isBarVisible = !isBarVisible;
		}
	} else if (event.currentTarget.id === "toggle2") {
		if (isSettingsBarVisible) {
			bar2.style.height = "auto";
			bar2.style.opacity = 1;
			bar2.style.pointerEvents = "all";
			isSettingsBarVisible = !isSettingsBarVisible;
		} else {
			bar2.style.opacity = 0;
			bar2.style.height = 0;
			bar2.style.pointerEvents = "none";
			isSettingsBarVisible = !isSettingsBarVisible;
		}
	}
};

const Subscribe = (event, element, func) => {
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, func);
	} else {
		element["on" + event] = func;
	}
};

const preset = () => {
	colorSchemeSetter(current_color_scheme);
	operator_editor();
	screenAdjust();

	Subscribe("click", next_btn, next_func);
	Subscribe("click", submit_btn, submit_func);
	Subscribe("click", toggle, toggleBar);
	Subscribe("click", toggle2, toggleBar);

	add_max.value = "";
	add_min.value = "";
	subtract_max.value = "";
	subtract_min.value = "";
	multiply_max.value = "";
	multiply_min.value = "";
	divide_max.value = "";
	divide_min.value = "";

	Subscribe("change", add_max, addRangeEditor);
	Subscribe("change", add_min, addRangeEditor);
	Subscribe("change", subtract_max, subtractRangeEditor);
	Subscribe("change", subtract_min, subtractRangeEditor);
	Subscribe("change", multiply_max, multiplyRangeEditor);
	Subscribe("change", multiply_min, multiplyRangeEditor);
	Subscribe("change", divide_max, divideRangeEditor);
	Subscribe("change", divide_min, divideRangeEditor);
	for (let i = 0; i < checkboxes.length; i++) {
		Subscribe("click", checkboxes[i], checkHandler);
	}
	for (let i = 0; i < toggles.length; i++) {
		Subscribe("mouseover", toggles[i], () => {
			nav.style.borderRight = `${colorSchemes[current_color_scheme].navbarHoverSide}`;
		});
		Subscribe("mouseout", toggles[i], () => {
			nav.style.borderRight = `${colorSchemes[current_color_scheme].navbarHoverSide}`;
		});
	}
	Subscribe("mouseover", nav, () => {
		nav.style.borderRight =
			colorSchemes[current_color_scheme].navbarHoverSide;
	});
	Subscribe("mouseout", nav, () => {
		nav.style.borderRight = colorSchemes[current_color_scheme].navbarSide;
	});

	answer_field.value = "";
	submit_btn.style.opacity = 0;
	submit_btn.style.pointerEvents = "none";
	add.checked = operatorsSelected.plus;
	subtract.checked = operatorsSelected.minus;
	multiply.checked = operatorsSelected.multiply;
	divide.checked = operatorsSelected.divide;
};

preset();
