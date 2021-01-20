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
	HPI         : "otherHPI",
	location    : "otherLocation",
	radiation   : "otherRadiation",
	quality     : "otherQuality",
	timing      : "otherTiming",
	aggravation : "otherAggravation",
	relief      : "otherRelief",

	exam        : "otherExam",
	ROS         : "otherROS",
	assessment  : "otherAssessment",
	plan        : "otherPlan"
};
const entries = Object.entries(sections);

var displayAll = function() {
	for (const [ section, other ] of entries) {
		display(section, other);
		onsetResult.innerHTML = onsetNumber.value;
	}
	//vitals output
	if (vitals.checked === true) {
		BPOutput.innerHTML = "BP:" + SBPslider.value + "/" + DBPslider.value;
		BPOutput.style.display = "inline-block";
		HROutput.innerHTML = "HR:" + HRslider.value;
		HROutput.style.display = "inline-block";
	} else {
		BPOutput.style.display = "none";
		HROutput.style.display = "none";
	}
};
displayAll();

attachCheckboxHandlers();

//copy soap note
function CopyToClipboard(id) {
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
	var r = document.createRange();
	r.selectNode(document.getElementById(id));
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

var HRslider = document.getElementById("HR");
var HRoutput = document.getElementById("HRdisplay");
HRoutput.innerHTML = HRslider.value;

HRslider.oninput = function() {
	HRoutput.innerHTML = this.value;
};
