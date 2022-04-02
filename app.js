var focus_box = 1; // the box that we currently working on
var first_index_of_current_line = 1;
const last_indexes_in_line = new Array(7, 14, 21, 28, 35, 42);
var equation = "6*2-9/3";
var result = 9;

/* set the result */
//document.getElementById("result").innerHTML = '   ' + result;

/* handle enter click */
function on_click_enter() {
    // check that the equation is valid
    if(checkEquation()) {
        // paint_squares method return true if game is over (player won)
        if(!paint_squares()) {
            first_index_of_current_line += 7
            focus_box = first_index_of_current_line;
            if(first_index_of_current_line > 42) {
                GameOver('l'); // lost
            }
        } else {
            GameOver('w'); // won
        }
    }
}

// paint the squares in the right color and check if the player won the game 
function paint_squares() {
    var isWin = true;
    // check each of the boxes and paint if needed
    for(var i = 0; i < 7; i++) {
        var box = document.getElementById('box-' + eval(first_index_of_current_line + i));
        if(box.innerHTML === equation[i]) {
            box.style.backgroundColor = "#90EE90"; // paint in green
            paint_button(box.innerHTML, "#90EE90");
        }
        else {
            isWin = false;
            if(equation.includes(box.innerHTML)) {
                box.style.backgroundColor = "#CCCC00"; // paint in yellow
                paint_button(box.innerHTML, "#CCCC00");
            }   
        }
    }
    return isWin ? true : false;
}

/* paint button with match color */
function paint_button(sign, color) {
    var button;
    switch(sign) {
        case '+':
            button = document.getElementById("btn-plus");
        break;
        case '-':
            button = document.getElementById("btn-minus");
        break;
        case '/':
            button = document.getElementById("btn-divide");
        break;
        case '*':
            button = document.getElementById("btn-mul");
        break;
        default:
            button = document.getElementById('btn-' + sign);
            break;
    }
    button.style.backgroundColor = color;
}

/* check if the equasion is equal to the require result */
function checkEquation() {
    var my_equation = '';
    /* build the equation */
    for(var i = first_index_of_current_line; i <= first_index_of_current_line + 6; i++) {
        my_equation += document.getElementById("box-" + i).innerHTML;
    }
    return eval(my_equation) === result ? true : false;
}

function GameOver() {

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
}