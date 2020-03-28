window.addEventListener("load", function() {
	const container = document.getElementById("container");
	const navbar_toggle = document.getElementById("navbar_toggle");
	navbar_toggle.addEventListener("click", navbar_switch);
	const navbar = document.getElementById("navbar");
	const navbar_a = document.getElementsByClassName("navbar_a");
	const navbar_element = document.getElementsByClassName("navbar_elements");
});

let navbar_open = false;

const navbar_switch = () => {
	if (navbar_open == false) {
		navbar_open = true;
		navbar.style.right = 0;
		navbar.style.background = "rgba(255, 255, 255, 0.9)";
		navbar.style.color = "black";
	} else {
		navbar_open = false;
		navbar.style.right = "100vw";
		navbar.style.background = "rgba(71, 68, 68, 0.801)";
		navbar.style.color = "white";
	}
};
