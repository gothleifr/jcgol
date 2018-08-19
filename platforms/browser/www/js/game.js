var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//ctx.beginPath();
//ctx.arc(50,50,30,0,2*Math.PI);
//ctx.stroke();
var height = c.height;
var width = c.width;

var step = 20;

var columns = width/step;
var rows = height/step;

console.log("height = " + height);
console.log("width = " + width);
console.log("columns = " + columns);
console.log("rows = " + rows);

var cells;

function drawGrid() {
    ctx.beginPath();
    for (var x = 0; x <= width; x = x + step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    for (var y = 0; y <= height; y = y + step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

function clearCells() {
    cells = new Array(columns);
    for (var i = 0; i < columns; i++) {
        cells[i] = new Array(rows);
        for (var j = 0; j < rows; j++) {
            cells[i][j] = false;
        }
    }
}

function drawCells() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            if (cells[i][j] == true) {
                ctx.beginPath();
                ctx.arc(i * step + step / 2, j * step + step / 2, step / 2 - 2, 0, 2 * Math.PI);
                ctx.strokeStyle = '#000000';
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(i * step + step / 2, j * step + step / 2, step / 2 - 2, 0, 2 * Math.PI);
                ctx.arc(i * step + step / 2, j * step + step / 2, step / 2 - 2, 0, 2 * Math.PI);
                ctx.arc(i * step + step / 2, j * step + step / 2, step / 2 - 2, 0, 2 * Math.PI);
                ctx.arc(i * step + step / 2, j * step + step / 2, step / 2 - 2, 0, 2 * Math.PI);
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            }
            //ctx.strokeStyle = '#000000';
            //ctx.font = "5px Arial";
            //ctx.fillText("{" + i + "," + j + "}", i * step + step / 2, j * step + step / 2);
        }
    }
}

function nextStep() {
    var deathList = new Array();
    var birthList = new Array();
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            var neighbours = 0;
            if (i != 0 && j != 0 && cells[i - 1][j - 1] == true) {
                neighbours++;
            }
            if (j != 0 && cells[i][j - 1] == true) {
                neighbours++;
            }
            if (i != columns - 1 && j != 0 && cells[i + 1][j - 1] == true) {
                neighbours++;
            }
            if (i != 0 && cells[i - 1][j] == true) {
                neighbours++;
            }
            if (i != columns - 1 && cells[i + 1][j] == true) {
                neighbours++;
            }
            if (i != 0 && j != rows - 1 && cells[i - 1][j + 1] == true) {
                neighbours++;
            }
            if (j != rows - 1 && cells[i][j + 1] == true) {
                neighbours++;
            }
            if (i != columns - 1 && j != rows - 1 && cells[i + 1][j + 1] == true) {
                neighbours++;
            }
            var decision = "skip";
            if (cells[i][j] == true && neighbours < 2) {
                decision = "under";
                deathList.push({ i: i, j: j });
            }
            if (cells[i][j] == true && neighbours > 3) {
                decision = "over";
                deathList.push({ i: i, j: j });
            }
            if (cells[i][j] == false && neighbours == 3) {
                decision = "birth";
                birthList.push({ i: i, j: j });
            }
            // console.log("There are this many neighbours: " + neighbours + " at " + i + "," + j + " => " + decision);
        }
    }
    deathList.forEach(function (cellObject) {
        var i = cellObject.i;
        var j = cellObject.j;
        cells[i][j] = false;
    });
    birthList.forEach(function (cellObject) {
        var i = cellObject.i;
        var j = cellObject.j;
        cells[i][j] = true;
    });
}

c.addEventListener("mousedown", mouseDown, false);
function mouseDown(event) {
    //	alert("x:" + event.x + " y:" + event.y);
    //ctx.beginPath();
    var i = Math.floor(event.x / step);
    var j = Math.floor(event.y / step);
    if (cells[i][j] == false) {
        cells[i][j] = true;
    }
    else {
        cells[i][j] = false;
    }
    drawCells();
    //ctx.arc(i*step+step/2, j*step+step/2, step / 2, 0, 2 * Math.PI);
    //ctx.stroke();
}

function autoRun() {
    nextStep(); drawCells();
}

clearCells();
drawGrid();
//cells[0][9] = true;
drawCells();

