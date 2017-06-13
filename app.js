// Little boxes to keep track of the events and the position of the blocks at their current move
var pos = [], events = [];

// Each block's Id, this is just to help me style them with CSS
var blocksIds = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten"
};

var from = document.getElementById("from");
var end = document.getElementById("to");
var temp = document.getElementById("spare");
var button = document.getElementById("button");
var tower = document.getElementById("height");

//solves the puzzle behind the scene, storing every move in an array
function start(num, from, end, temp) {
    //get current block
    var block = document.getElementById(blocksIds[num]);
    //return if no blocks
    if (num === 0) {
        return;
    }
    //move block to the temporary position
    start(num - 1, from, temp, end);
    
    //keep track of every move made by every block, current block and its current position
    pos.push([block, end]);
    
    //move block to its final position from the temporary position.
    start(num - 1, temp, end, from);
}

//Move the blocks on screen for the user to see
function moveblocksIds(i) {
    var parent = pos[i][1], block = pos[i][0], firstChild = parent.firstElementChild;
    parent.insertBefore(block, firstChild);
}

/* calls moveblocksIds() every n * 500ms so every move doesn't overlap each other, and keep track of everytime
the function was called
*/
function solveIt() {
    for (var i = 0; i < pos.length; i++) {
        events.push(setTimeout(moveblocksIds, i*500, i));
    }
}

//cleans the screen and generates a new tower
function clean(n) {
    //remove every block
    from.innerHTML = end.innerHTML = temp.innerHTML = "";
    pos = [];
    
    //clear the event queue to prevent overlapping
    for (var i in events) {
        clearTimeout(i);
    }
    
    // create a new tower by given height of size n
    for (var j = 1; j <= n; j++) {
        from.innerHTML += "<li id=" + blocksIds[j] + "></li>";
    }
    
}

// When a new height is selected generate a new tower by the given option
tower.onchange = function () {
    var pegs = tower.options[tower.selectedIndex].value;
    clean(pegs);
}

// Start solving the puzzle
button.addEventListener("click", function () {
    // Generate a new tower everytime before solving it (see function definition above)
    var pegs = tower.options[tower.selectedIndex].value;  
    clean(pegs);
    
    //pre solve the tower behind the scenes (see function definition above)
    start(pegs, from, end, temp);
    
    //solve it on screen (see function definition above)
    solveIt();
    
});