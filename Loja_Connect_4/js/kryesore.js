var p1 =prompt("Player One: Enter your name: ");  //i kerkohet user-ave dhenia e emrave te tyre dhe ngjyres se topit qe ata deshirojne
var p1color = prompt("Enter the color of the ball (please write an existing color): "); //kshyr qelite nese mun mi ndreq!!!!!

var p2=prompt("Player Two : Enter your name:");
var p2color = prompt("Enter the color of the ball (please write an existing color): ");

var array;
var currentIndexOfCol; // kontrollim i indeksit te tanishem per secilin kolone
var role; // roli i kujt eshte
var gameRunning;
var player1Score;
var player2Score;
var player1ScoreOutput;
var player2ScoreOutput;
var rows;
var columns;
var output;
var againstComputer;
var canvas;
var context;
var cellWidth; 
var diskColor;
var winningMoveCells;
var resetNotClicked;
var onHold;
var board;

function init (rows, columns, destination) {
    canvas = document.getElementById("canvas");
    againstComputer = false;
    cellWidth = 83;
    winningMoveCells = new Array();
    onHold = false;
    
    player1Score =0;
    player2Score =0;
    player1ScoreOutput = document.getElementById("player1Score");
    player1ScoreOutput.innerHTML = player1Score;
    player2ScoreOutput = document.getElementById("player2Score");
    player2ScoreOutput.innerHTML = player2Score; //piket e lojtareve

    document.querySelector(".player1").innerHTML=p1+":";
    document.querySelector(".player2").innerHTML=p2+":";

    document.querySelector(".player1").style.color=p1color.toLowerCase(); //emrat e lojtareve behen me ate ngjyre te cilen ata e zgjedhin per topin
    document.querySelector(".player2").style.color=p2color.toLowerCase();

    this.rows = rows;
    this.columns = columns;
    output = document.getElementById("output");
    board = document.getElementById("board");
    resetGame(rows, columns, destination);
    
    /* Frame i animacionit */
    window.requestAnimationFrame=function(){
        return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(f){window.setTimeout(f,1e3/60)}
    }();   
}

function resetGame (rows, columns, destination) {
    if (!onHold){
        resetNotClicked = false;
        output.className = "none";
        
        while (destination.firstChild) 
            destination.removeChild(destination.firstChild); // pastroji tabelat e meparshme
        
        while (board.firstChild) 
            board.removeChild(board.firstChild); // pastroji tabelat e meparshme
        
        /* Inicializimi i vargut (array) */
        array = new Array(rows);
        for (var i = 0; i < rows; i++) {
            array[i] = new Array(columns);
            
            /* jepja te gjitha elementeve vleren zero */
            for (var j = 0; j < columns; j++) {
                array[i][j] = 0;
            }
        }
        
        currentIndexOfCol = new Array(columns);
         /* jepja te gjitha elementeve vleren zero*/
        for (var j = 0; j < columns; j++) {
             currentIndexOfCol[j] = 0;
        }
        
        var table = document.createElement('table');
        
        for (var i=rows; i>0 ; i--){
            var tr = document.createElement('tr');
                for (var j = columns ; j>0 ; j--){
                    var td = document.createElement('td');
                    td.id = (i-1) + "" + (-j+7); 
                    td.onclick = tdClicked;
                    td.onmouseover = tdMouseOver;
                    td.onmouseout = tdMouseOut;
                    tr.appendChild(td);
                }
            table.appendChild(tr);
        }
        destination.appendChild(table);
        
        var table2 = document.createElement('table');
        for (var i=rows; i>0 ; i--){
            var tr = document.createElement('tr');
                for (var j = columns ; j>0 ; j--){
                    var td = document.createElement('td');
                    td.id = (i-1) + "" + (-j+7)+"b"; 
                    td.onclick = tdClicked;
                    td.onmouseover = tdMouseOver;
                    td.onmouseout = tdMouseOut;
                    tr.appendChild(td);
                }
            table2.appendChild(tr);
        }
        board.appendChild(table2);
        
        canvas.parentNode.removeChild(canvas);
        canvas = document.createElement('canvas');
        canvas.width = "585";
        canvas.height= "500";
        var wrapper = document.getElementById("wrapper");
        wrapper.insertBefore(canvas, wrapper.firstChild);
        context = canvas.getContext('2d');
        
        role=0;
        setTimeout(function(){gameRunning = true;resetNotClicked = true;},100); 
        output.innerHTML = "Turn: Player " + ((role%2)+1);
    }
}

function tdMouseOver () {
    if (gameRunning){
        var col = this.id.charAt(1);
        var ind = currentIndexOfCol[col];
        var td;
        for (i=(rows-1) ; i>=ind ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "rgb(255,255,255)";
        }
    }
}

function tdMouseOut (){
    if (gameRunning){
        var col = this.id.charAt(1);
        var td;
        for (i=(rows-1) ; i>=0 ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "none";
        }
    }
}

function tdClicked () {
    if (gameRunning) {
        var col = this.id.charAt(1);
        if (currentIndexOfCol[col]>=6) {// nese kolona eshte full
            output.innerHTML = "Column is full";
        }
        else {
            dropDisk(col,(role++%2)+1);
            
            if (gameRunning){
                var td;
                for (i=(rows-1) ; i>=0 ;i--){
                    td = document.getElementById(i+""+col);
                    td.style.background = "none";
                }
            }
            if ((againstComputer) && gameRunning){
                var computerCol = findNextMovement();
                computerPlay(computerCol);
            }
        }
    }
}

function computerPlay (computerCol){
    gameRunning = false; // ndaloje user-in me kliku perderisa po luan kompjuteri
    onHold = true;
    setTimeout(function(){
        dropDisk(computerCol,(role++%2)+1);
        onHold = false;
        },1000);
}

function dropDisk (col, player){
    gameRunning = true;
    var row = currentIndexOfCol[col]++;
    var td = document.getElementById(""+row+col); 
    
    var fieldX = Math.round( (cellWidth+0.5)*col );
    var fieldY = 0;
    var fieldWidth = cellWidth;
    var fieldHeight = Math.round((6-row)*(cellWidth));
        
    if (player==1) { // Lojtari 1  
        array[row][col] = 1 ;                
        diskColor = p1color.toLowerCase();
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    else { // Lojtari 2
        array[row][col] = 2 ;
        diskColor = p2color.toLowerCase();
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    output.innerHTML = "Turn: Player " + ((role%2)+1);

    if (isAWinningMove(row, col)) { // nese eshte levizje fituese
        gameRunning=false; // ndalo lojen
        
        for (i=(rows-1) ; i>=0 ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "none";
        }
        
        /* Markimi i qelive fituese te tabeles */
        for (var m=0 ; m < winningMoveCells.length ; m++){
            td = document.getElementById(""+winningMoveCells[m]);
            td.style.background = "rgba(0,0,0,0.4)";
        }
    
        if (((role-1)%2 +1) == 1 ) { // Lojtari 1 fitoi
            output.innerHTML = p1+" WON!";
            output.className = "player1";
            player1ScoreOutput.innerHTML = ++player1Score;
        }
        else { // Lojtari 2 fitoi
            output.innerHTML = p2+" WON!";
            output.className = "player2";
            player2ScoreOutput.innerHTML = ++player2Score;
        }
    }
    if (gridIsFull()){
        output.innerHTML = "Tie! Game finished";
        gameRunning = false;
    }
}

function gridIsFull() {
    var isFull = true;
    for (var i=0 ; i<currentIndexOfCol.length ; i++){
        if (currentIndexOfCol[i] < 6)
            isFull = false;
    }
    return (isFull);
}

function accessArray(row, col){ 
    try {
        var val = array[row][col];
        if (val==undefined)
            return 0;
        return val;
    }
    catch(err) {
        return 0;
    }
}

function changeAgainst(){
    againstComputer = !againstComputer;
    if (againstComputer){
        document.querySelector(".player2").innerHTML="Computer:";
        player1ScoreOutput.innerHTML = 0; 
        player2ScoreOutput.innerHTML = 0; //sa here qe nderrojme formen e lojes (me kompjuterin apo me dy persona), piket kalojne 
        //ne zero, d.m.th. llogariten piket e secilit lojatare sa here qe fiton vetem perderisa je ne formen e caktuar te lojes.
    }
    else{
        document.querySelector(".player1").innerHTML=p1+":";
        document.querySelector(".player2").innerHTML=p2+":";
        player1ScoreOutput.innerHTML = 0; 
        player2ScoreOutput.innerHTML = 0; 
    }
}
