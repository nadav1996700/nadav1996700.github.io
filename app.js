var focus_box = 1; // the box that we currently working on
var first_index_of_current_line = 1;
const last_indexes_in_line = new Array(7, 14, 21, 28, 35, 42);
var equations_array = ["6*2-9/3:9", "2*3+8/4:8",  "3*4-1+5:16", "9-1*2+3:10"];   
var equation;
var result;

window.onload = function() {
    // select random string of equation and result
    var item = equations_array[Math.floor(Math.random()*equations_array.length)];
    const temp = item.split(":");
    equation = temp[0];
    result = parseInt(temp[1]);
    /* set the result */
    document.getElementById("result").innerHTML = "=   " + result;
  };

/* handle enter click */
function on_click_enter() {
    // check that the equation is valid
    if(checkEquation()) {
        // paint_squares method return true if game is over (player won)
        if(!paint_squares()) {
            first_index_of_current_line += 7
            focus_box = first_index_of_current_line;
            if(first_index_of_current_line > 36) {
                GameOver('l'); // lost
            }
        } else {
            GameOver('w'); // won
        }
    }
}

/* write the appropriate message according to the result - won/lost */
function GameOver(result) {
    /* bind result boxes */
    var box_one = document.getElementById('box-result-1');
    var box_two = document.getElementById('box-result-2');
    var box_three = document.getElementById('box-result-3');
    var box_four = document.getElementById('box-result-4');
    const boxes = new Array(box_one, box_two, box_three, box_four);
    // if player lost
    if(result === 'l') {
        // discover the equation to the player
        document.getElementById('text_result').innerHTML = "The equation was " + equation;
        // change the color of the boxes to red
        boxes.forEach(b => {
            b.style.background = "#FF0000";
            b.style.borderColor = "#FF0000";
        });
        // write "lost"
        box_one.innerHTML = 'L';
        box_two.innerHTML = 'O';
        box_three.innerHTML = 'S';
        box_four.innerHTML = 'T';
    // if player won
    } else {
        // change the color of the boxes to green
        boxes.forEach(b => {
            b.style.background = "#90EE90";
            b.style.borderColor = "#90EE90";
        });
        // write "won!"
        box_one.innerHTML = 'W';
        box_two.innerHTML = 'O';
        box_three.innerHTML = 'N';
        box_four.innerHTML = '!';
    }
    // hide the buttons and show the result message that written on the result boxes
    document.getElementById("buttons").style.visibility = 'hidden';
    document.getElementById("result_message").style.visibility = 'visible';
}

// paint the squares in the right color and check if the player won the game 
function paint_squares() {
    var isWin = true;
    // check each of the boxes and paint if needed
    for(var i = 0; i < 7; i++) {
        var box_name = 'box-' + eval(first_index_of_current_line + i);
        var box = document.getElementById(box_name);
        if(box.innerHTML === equation[i]) {
            paintBoxAndButton(box, box_name, '#90EE90'); // paint in green
        }
        else {
            isWin = false;
            if(equation.includes(box.innerHTML)) {
                paintBoxAndButton(box, box_name, '#CCCC00'); // paint in yellow
            } 
            else {
                paintBoxAndButton(box, box_name, '#343a40'); // paint in black
            }  
        }
    }
    return isWin ? true : false;
}

/* paint box and button in the appropriate color */
function paintBoxAndButton(box, box_name, color) {
    //document.documentElement.style.setProperty('--box-color', color);
    //document.getElementById(box_name).className = "box-animation";
    box.style.backgroundColor = color;
    box.style.color = "#FFFFFF"; // text color
    box.style.borderColor = color;
    paint_button(box.innerHTML, color);
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
    button.style.borderColor = color;
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

function on_click_image() {
    document.getElementById("myModal").style.display = "flow-root";
}

function closeModel() {
    document.getElementById("myModal").style.display = "none";
}
