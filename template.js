//checkbox clicking
function attachCheckboxHandlers() {
    var el = document.getElementById('allCheckbox');
    var tops = el.getElementsByTagName('input');

    for (var i=0, len=tops.length; i<len; i++) {
        if ( tops[i].type === 'checkbox' || 'text'||'number' ) {
            
            tops[i].onclick = displayAll
            tops[i].oninput = displayAll
        }
    }
};               

// display
function display(section, other){
    var items = document.getElementsByClassName(section);
    var str = '';
    var other = document.getElementById(other).value;
    for (i=0;i<items.length; i++){
        if (items[i].checked === true){
            str += items[i].value +"<br>"
        }
    }
    document.getElementById(section).innerHTML = str + other + "<br>";
};

// sections
const sections = {
    "HPI":"otherHPI",
    "exam": "otherExam",
    "ROS": "otherROS",
    "plan":"otherPlan"
}
const entries = Object.entries(sections);

var displayAll = function (){
    for (const [section, other] of entries) {
    display(section, other);
    onsetResult.innerHTML = onsetNumber.value;
    }
}

 


attachCheckboxHandlers();
hideChecks();

//copy soap note
function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}


