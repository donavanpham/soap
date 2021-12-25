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

//master output function
var displayAll = function() {
	for (const [ section, other ] of entries) {
		display(section, other);
		onsetResult.innerHTML = onsetNumber.value;
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

//exam Section tabs
function openExamSection(evt, sectionName) {
	// Declare all variables
	var i, examcontent, examlinks;
	// Get all elements with class="examcontent" and hide them
	examcontent = document.getElementsByClassName("examcontent");
	for (i = 0; i < examcontent.length; i++) {
		examcontent[i].style.display = "none";
	}
	// Get all elements with class="examlinks" and remove the class "active"
	examlinks = document.getElementsByClassName("examlinks");
	for (i = 0; i < examlinks.length; i++) {
		examlinks[i].className = examlinks[i].className.replace(" active", "");
	}
	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(sectionName).style.display = "grid";
	evt.currentTarget.className += " active";
}
document.getElementById("defaultOpenExam").click();

//toggle normal buttons
var toggleNeuro = document.getElementById("toggleNeuro");
toggleNeuro.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalNeuro");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

var toggleMSE = document.getElementById("toggleMSE");
toggleMSE.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalMSE");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

var toggleCardio = document.getElementById("toggleCardio");
toggleCardio.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalCardio");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

var toggleResp = document.getElementById("toggleResp");
toggleResp.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalResp");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

var toggleAbdo = document.getElementById("toggleAbdo");
toggleAbdo.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalAbdo");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

var toggleLowBack = document.getElementById("toggleLowBack");
toggleLowBack.addEventListener("change", function() {
	var checked = this.checked;
	var otherCheckboxes = document.getElementsByName("normalLB");
	[].forEach.call(otherCheckboxes, function(item) {
		item.checked = checked;
	});
	displayAll();
});

//dictation
$(document).ready(function() {
	try {
		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		var recognition = new SpeechRecognition();
	} catch (e) {
		console.error(e);
		$(".no-browser-support").show();
		$(".app").hide();
	}

	var noteTextarea = $("#otherHPI");
	var noteContent = "";

	/*-----------------------------
      Voice Recognition 
------------------------------*/

	// If false, the recording will stop after a few seconds of silence.
	// When true, the silence period is longer (about 15 seconds),
	// allowing us to keep recording even when the user pauses.
	recognition.continuous = true;

	// This block is called every time the Speech APi captures a line.
	recognition.onresult = function(event) {
		// event is a SpeechRecognitionEvent object.
		// It holds all the lines we have captured so far.
		// We only need the current one.
		var current = event.resultIndex;

		// Get a transcript of what was said.
		var transcript = event.results[current][0].transcript;

		// Add the current transcript to the contents of our Note.
		// There is a weird bug on mobile, where everything is repeated twice.
		// There is no official solution so far so we have to handle an edge case.
		var mobileRepeatBug = current == 1 && transcript == event.results[0][0].transcript;

		if (!mobileRepeatBug) {
			noteContent += transcript;
			noteTextarea.val(noteContent);
		}
	};
	/*
	recognition.onstart = function() {
		instructions.text("Voice recognition activated. Try speaking into the microphone.");
	};

	recognition.onspeechend = function() {
		instructions.text("You were quiet for a while so voice recognition turned itself off.");
	};

	recognition.onerror = function(event) {
		if (event.error == "no-speech") {
			instructions.text("No speech was detected. Try again.");
		}
	};   */

	/*-----------------------------
      App buttons and input 
------------------------------*/
	const button = document.getElementById("record-btn");
	const otherHPI = document.getElementById("otherHPI");
	let listening = false;

	const stop = () => {
		otherHPI.classList.remove("speaking");
		button.classList.remove("speaking");
		recognition.stop();
		button.textContent = "💬 Start";
		displayAll();
	};

	const start = () => {
		if (noteContent.length) {
			noteContent += " ";
		}
		otherHPI.classList.add("speaking");
		button.classList.add("speaking");
		recognition.start();
		button.textContent = "💬 Stop";
	};
	button.addEventListener("click", (event) => {
		listening ? stop() : start();
		listening = !listening;
	});
	/*
	$("#start-record-btn").on("click", function(e) {
		if (noteContent.length) {
			noteContent += " ";
		}
		recognition.start();
	});

	$("#pause-record-btn").on("click", function(e) {
		recognition.stop();
		//instructions.text("Voice recognition paused.");
	});
*/
	// Sync the text inside the text area with the noteContent variable.
	noteTextarea.on("input", function() {
		noteContent = $(this).val();
	});
});
