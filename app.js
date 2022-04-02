var focus_box = 1; // the box that we currently working on
var finished_line = false; // tells if we need to start filling the next line of boxes

/* delete value of box and decrease focus_box */
function delete_box_value() {
    var box = document.getElementById(focus_box);
    box.value = '';
    focus_box--;
}


/* on click function for the buttons */
function on_click_button(button) {
    var box = document.getElementById(focus_box);
    switch(button) {
        case '1':
            box.value = 1;
            change_focus();
            break;
        case '2':
            box.value = 2;
            change_focus();
            break;    
        default:
            break;    
    }
}

function change_focus() {
    // if the box is in the middle of a row - promote by one
    // if we finished line (after pressing enter and check line) - also promote by one
    if(focus_box < 7 || (focus_box > 7 && focus_box < 14) || (focus_box > 14 && focus_box < 21) ||
     (focus_box > 21 && focus_box < 28) || (focus_box > 28 && focus_box < 35) || (focus_box > 35 && focus_box < 42)
      || finished_line) {
        focus_box++;
    } 
}