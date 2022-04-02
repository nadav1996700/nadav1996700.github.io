var focus_box = 1; // the box that we currently working on
var finished_line = false; // tells if we need to start filling the next line of boxes
var first_index_of_current_line = 1;
const last_indexes_in_line = new Array(7, 14, 21, 28, 35, 42);
var equation = "6*2-9+8/4";
var result = 5;

/* set the result */
document.getElementById("result").innerHTML = '   ' + result;

/* handle enter click */
function on_click_enter() {
    if(checkEquation()) {
        var element = document.getElementById("box-" + focus_box);
        element.style.backgroundColor = "#FFFF00";
    }
}

/* check if the equasion is equal to the require result */
function checkEquation() {
    var equation = '';
    /* build the equation */
    for(var i = first_index_of_current_line; i <= first_index_of_current_line + 6; i++) {
        equation += document.getElementById("box-" + i).innerHTML;
    }
    return eval(equation) === result ? true : false;
}

/* delete value of box and decrease focus_box */
function on_click_delete() {
    const not_allowed_for_decrease = new Array(1, 8, 15, 22, 29, 36);
    var selected_box = "box-" + focus_box;
    var box = document.getElementById(selected_box);
    box.innerHTML = '';
    // if the box is first in line, then dont decrease focus_box
    if(!not_allowed_for_decrease.includes(focus_box)) {
        focus_box--;
    }
}

/* on click function for the buttons */
function on_click_button(button) {
    var selected_box = "box-" + focus_box;
    var box = document.getElementById(selected_box);
    if(last_indexes_in_line.includes(focus_box) && box.innerHTML != '') 
        return;
    else {
        box.innerHTML = button;
        change_focus();
    }  
}

function change_focus() {
   // if the box is in the middle of a row - promote by one
   if(!last_indexes_in_line.includes(focus_box)) {
        focus_box++;
   }
   // if we finished line (after pressing enter and check line) - also promote by one
   else if(finished_line) {
       focus_box++;
       finished_line = false;
   }

}