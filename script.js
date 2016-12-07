/*
Samir Khoulani
Samir_khoulani@student.uml.edu
11/15/16
HW9
The purpose of this javascript is to create the data structure that holds all of the letters to be used for the game.
It also dynamically adds letters to the players hand, determines which words were played on which tile, and calculates and updates the user's score.
*/

$(document).ready(function() {

    /* This is the array of all the letters, and takes into account their frequency */
    var freq = ["A","A","A","A","A","A","A","A","A","B","B","C","C","D","D","D","D","E","E","E","E","E","E","E","E","E","E","E","E","F","F","G","G","G","H","H","I","I","I","I","I","I","I","I","I","J","K","L","L","L","L","M","M","N","N","N","N","N","N","O","O","O","O","O","O","O","O","P","P","Q","R","R","R","R","R","R","S","S","S","S","T","T","T","T","T","T","U","U","U","U","V","V","W","W","X","Y","Y","Z"," "," "];

    /* This dictionary documents the score of each letter*/
    var val = {"A":1,"B":3,"C":3,"D":2,"E":1,"F":4,"G":2,"H":4,"I":1,"J":8,"K":5,"L":1,"M":3,"N":1,"O":1,"P":3,"Q":10,"R":1,"S":1,"T":1,"U":1,"V":4,"W":4,"X":8,"Y":4,"Z":10, " ": 0};
    var hand; //The current player hand with 7 tiles max
    var board; // board length of 15;
    var score = 0;
    var currentSum = 0;
    var tripleCount = 0;
    //creating the default new game environment
    dealHand(7);
    $("#scoreArea").html("Score: "+ score);

    function dealHand(n) {
        var randFreq;
        var i;

        for (i = 0; i < n; i++) {
            if(freq.length)
            randFreq = Math.floor(Math.random()*freq.length);
            $("#hand").append("<div id='hand"+ i +"' class = 'tiles'>"+ freq[randFreq] +"<div id='hand"+ i +"val' class='tileval'>"+ val[freq[randFreq]]+"</div>");
            $("#hand" + i).draggable({snap: "#board img, #hand", containment:"#screen"});
            freq.splice(randFreq,1);

        }
    }

    /* This is activated when the user drops a piece on a blank space*/
    $(".boardPiece").droppable({

        drop: function( event, ui ) {
            currentSum += parseInt(($(ui.draggable).text()).match(/\d+/g)); //using regular expression to get the string of the tile's value, and then converting it to an int
        }
    })

    /* This is activated when a user drops a piece on a triple score space*/
    $(".boardPieceTriple").droppable({ //for triple piece use

        drop: function( event, ui ) {
            currentSum += parseInt(($(ui.draggable).text()).match(/\d+/g)); //using regular expression to get the string of the tile's value, and then converting it to an int
            tripleCount++;
        }
    })

    /* This on click function starts a new game by resetting the entire grab bag, score, currentSum, and dealing a new hand*/
    $("#resetButton").on("click", function (e) {
        freq = ["A","A","A","A","A","A","A","A","A","B","B","C","C","D","D","D","D","E","E","E","E","E","E","E","E","E","E","E","E","F","F","G","G","G","H","H","I","I","I","I","I","I","I","I","I","J","K","L","L","L","L","M","M","N","N","N","N","N","N","O","O","O","O","O","O","O","O","P","P","Q","R","R","R","R","R","R","S","S","S","S","T","T","T","T","T","T","U","U","U","U","V","V","W","W","X","Y","Y","Z"," "," "];
        $("#hand").html("");
        dealHand(7);
        updateScore(0);
        currentSum = 0;
    });

    /* This is triggered when the user clicks end turn, and has (hopefully) placed some tiles */
    $("#endButton").on("click", function (e) {
        $("#warning").html('');
        if (currentSum == 0) {
            $("#warning").html('Please place at least one tile!');
            return;
        }
        var numTilesDealt = 7;
        $("#hand").html("");
        if(freq.length < 7) //If the tile bag has less than 7 tiles, the amount left will be dealt
            numTilesDealt = freq.length;
        dealHand(numTilesDealt);
        currentSum *= (Math.pow(3,tripleCount)); // calculating the effect of the score multipliers
        score += currentSum;
        tripleCount = 0;
        currentSum = 0;
        updateScore(score)


    });

    /* This function updates the score displayed on the game board*/
    function updateScore(n) {
        score = n;
        $("#scoreArea").html("Score: "+ n);

    }

})
