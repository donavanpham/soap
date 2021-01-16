//checkbox clicking
function attachCheckboxHandlers() {
	var el = document.getElementById("main");
	var tops = el.getElementsByTagName("input");

	for (var i = 0, len = tops.length; i < len; i++) {
		if (tops[i].type === "checkbox" || "text" || "number") {
			tops[i].onclick = displayAll;
			tops[i].oninput = displayAll;
		}
	}
}

// display
function display(section, other) {
	var items = document.getElementsByClassName(section);
	var str = "";
	var other = document.getElementById(other).value;
	if (other !== "") {
		other += "<br>";
	}
	for (i = 0; i < items.length; i++) {
		if (items[i].checked === true) {
			str += items[i].value + "<br>";
		}
	}

	document.getElementById(section).innerHTML = str + other;
}

// sections
const sections = {
	complaint  : "otherComplaint",
	HPI        : "otherHPI",

	exam       : "otherExam",
	ROS        : "otherROS",
	assessment : "otherAssessment",
	plan       : "otherPlan"
};
const entries = Object.entries(sections);

//vitals
var vitals = document.getElementById("vitals");
var vitalsOutput = document.getElementById("vitalsOutput");
vitalsOutput.style.display = "none";

//master output function
var displayAll = function() {
	for (const [ section, other ] of entries) {
		display(section, other);
		onsetResult.innerHTML = onsetNumber.value;
	}
	//vitals output
	if (vitals.checked === true) {
		demo2.innerHTML = "BP: " + SBPslider.value + "/" + DBPslider.value;
		vitalsOutput.style.display = "block";
	} else {
		vitalsOutput.style.display = "none";
	}
};

attachCheckboxHandlers();

//copy soap note
function CopyToClipboard() {
	var node = document.createElement("textarea");
	node.innerHTML = document.getElementById("content").innerText;
	document.body.appendChild(node);
	node.select();

	try {
		var success = document.execCommand("copy");
		success ? console.log("copy successful") : console.log("copy unsuccessful");
	} catch (e) {
		console.log("browser not compatible");
	}
	document.body.removeChild(node);
	/*
	// Create a new textarea element and give it id='temp_element'
	var textarea = document.createElement("textarea");
	textarea.id = "temp_element";
	// Optional step to make less noise on the page, if any!
	textarea.style.height = 0;

	// Now append it to your page somewhere, I chose <body>
	document.body.appendChild(textarea);
	// Give our textarea a value of whatever inside the div of id=containerid
	textarea.value = document.getElementById("content").innerText;
	// Now copy whatever inside the textarea to clipboard
	var selector = document.querySelector("#temp_element");
	selector.select();
	document.execCommand("copy");

	// Remove the textarea
	document.body.removeChild(textarea);*/

	/*
	var r = document.createRange();
	r.selectNode(document.getElementById("soapNote"));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(r);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();*/

	var tooltip = document.getElementById("myTooltip");
	tooltip.innerHTML = "Copied";
}

function outFunc() {
	var tooltip = document.getElementById("myTooltip");
	tooltip.innerHTML = "Copy to clipboard";
}

function openSection(evt, sectionName) {
	// Declare all variables
	var i, tabcontent, tablinks;
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(sectionName).style.display = "grid";
	evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

//show/hide back
function back() {
	var checkBox = document.getElementById("back");
	var text = document.getElementById("back-on");
	var empty = document.getElementById("back-off");

	if (checkBox.checked == true) {
		text.style.display = "block";
		empty.style.display = "none";
	} else {
		text.style.display = "none";
		empty.style.display = "block";
	}
}

function neck() {
	var checkBox = document.getElementById("neck");
	var text = document.getElementById("neck-on");
	var empty = document.getElementById("neck-off");

	if (checkBox.checked == true) {
		text.style.display = "block";
		empty.style.display = "none";
	} else {
		text.style.display = "none";
		empty.style.display = "block";
	}
}

//BP slider
var SBPslider = document.getElementById("SBP");
var SBPoutput = document.getElementById("SBPdisplay");
SBPoutput.innerHTML = SBPslider.value;

SBPslider.oninput = function() {
	SBPoutput.innerHTML = this.value;
};

var DBPslider = document.getElementById("DBP");
var DBPoutput = document.getElementById("DBPdisplay");
DBPoutput.innerHTML = DBPslider.value;

DBPslider.oninput = function() {
	DBPoutput.innerHTML = this.value;
};
