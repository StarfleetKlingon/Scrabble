/*
File:  www.github.com/StarfleetKlingon/Scrabble/scrabble.js
91.461 Assignment 9:  Scrabble
Therese M. Kuczynski, UMass Lowell Computer Science Student, therese_kuczynski@student.uml.edu
Copyright (c) 2015 by Therese M. Kuczynski.  All rights reserved.  May be freely
 copied or excerpted for educational purposes with credit to the author.
updated by TMK on December 10, 2015 at 11:00AM.
*/
/* Globals */

var moves;
var direction;
var word = "";
var current_row = 999;
var current_col = 999;
var start;
var end;
var id = [];
//Double and triple word scores should be added after the rest.
var double_word_count = 0;
var triple_word_count = 0;
//Data structure for tracking tiles.
var TileLoc = [];
TileLoc["player-tile1"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile2"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile3"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile4"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile5"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile6"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };
TileLoc["player-tile7"]= {"row": -1, "column": -1, "letter": -1, "score": 0 };



$(document).ready(function(){
  var i = 1;
  //Get seven tiles; initialize gameboard.
  moves = 0;
  init_tiles();

//Buttonpress event handler
//http://stackoverflow.com/questions/4323848/how-to-handle-button-click-events-in-jquery
$("#submit").click(function(){
  word_sub_func();
});

$("#clear").click(function(){
  reset_screen();
});

/* How to get the id of the droppable from: http://stackoverflow.com/questions/16999401/jquery-ui-how-to-get-element-id-where-drop-the-element */
/* Getting the alt attribute: http://stackoverflow.com/questions/3883882/get-the-alt-attribute-from-an-image-that-resides-inside-an-a-tag */
  $("#board > span").droppable({
    drop:function(event, ui){
      var score = 0;
      //Get the id of the location the tile was dropped on.
      var drop_loc = $(event.target).attr('id');

      var dragged1 = document.getElementById(ui.draggable.attr("id"));
      //Once you've dropped a piece, you can't move it again.
      $(dragged1).draggable("disable");
      //Get the letter.
      //Hints on image from: http://stackoverflow.com/questions/3883882/get-the-alt-attribute-from-an-image-that-resides-inside-an-a-tag
      var letter = jQuery(dragged1).find("img").attr("alt");
      //Calculate the tile's score.
      calc_score(drop_loc, letter, dragged1.id);
      //Calculate the current score.
      score = calc_word_score();
      document.getElementById("score").innerHTML = score;
      ui.draggable.position({
        my: "center+4.5% center+4%",
        at: "center center",
        of: "#" + drop_loc
      });
    }
  });

});

//Resetting the screen.
function reset_screen()
{
  moves = 0;
  direction = 0;
  var i= 1;
  //Move all elements back to the sidebar.
   while(i < 8)
    {
      reset_tile();
      i+= 1;
    }
  init_tiles();
}

//Gets 7 tiles.
//get_tile is in file tile_inventory.js.
function init_tiles()
{
var i=1;
  while(i < 8)
  {
    tile_id = "player-tile" + i;
    get_tile(tile_id);
    i += 1;
  }
}

//Calculates the score for a submitted word.
function calc_word_score()
{
  var i = 1;
  var score = 0;
  //Tallies up the score one last time.
   while(i < 8)
    {
      score += TileLoc["player-tile" + i]["score"];
      //Prevents you from being able to drop two tiles on the same
             //square.
      if(TileLoc["player-tile" + i]["row"] != -1)
        {
          $("#" + TileLoc["player-tile" + i]["row"] + "_" + TileLoc["player-tile" + i]["column"]).droppable("disable");
        }
      i += 1;
    }
   return score;
}

//Every time a tile is dropped.
/* Getting first-child referenced from: http://www.w3schools.com/jsref/prop_node_firstchild.asp */
function calc_score(drop_loc, tile, tileID)
{
  var bonus = document.getElementById(drop_loc).firstElementChild;
  var score = ScrabbleTiles[tile]["value"];
  //Track bonus tiles.
  if(bonus != null)
    {
      bonus = bonus.innerHTML;
      if(bonus == "Double Word Score")
       {
         console.log("Double word");
         double_word_count +=1;
       }
      if(bonus == "Triple Word Score")
       {
         console.log("triple word");
         triple_word_count +=1;
       }
      if(bonus == "Double Letter Score")
       {
         console.log("double letter");
          score *= 2;
       }
      if(bonus == "Triple Letter Score")
       {
         score *= 3;
       }
    }

  //Use the array to track tile's current position and score.
  TileLoc[tileID]["letter"] = tile;
  TileLoc[tileID]["row"] = drop_loc.split("_")[0];
  TileLoc[tileID]["column"] = drop_loc.split("_")[1];
  TileLoc[tileID]["score"] = score;

//Figure out if the letter should be prepended or appended to the word
//based on the orientation of the current tile to previous tiles.
  if(current_col < drop_loc.split("_")[0] || current_row < drop_loc.split("_")[1])
  {
    word += tile;
  }
  else
  {
    tile += word;
    word = tile;
  }

//Figure out which way we're laying tiles.
if(moves == 1)
{
  if(drop_loc.split("_")[0] != current_col)
  { direction = "vertical";  }
  else{direction = "horizontal"; }
  moves = 2;
}
//Update current location.
    current_col = drop_loc.split("_")[0];
    current_row = drop_loc.split("_")[1];

  if(moves == 0)
  {
  //The start and end of the word are the current location.
    start = drop_loc;
    end = drop_loc;
    //Disable all but the 4 adjacent pieces.
    disable_all_but_row_col(current_row, current_col)
    moves = 1;
  }

  else
  {
  console.log(direction);
    //If you added a tile in front of the first tile, this is now the
    //first tile.
    if(drop_loc < start)
    {
      start = drop_loc;
    }
    //Otherwise you added a tile at the end.
    else
    {
      end = drop_loc;
    }
    //Make sure players can't put tiles everywhere.
    disable_all_but_one();
  }
  //Update the word.
  document.getElementById("word").innerHTML = word;

}

//After hitting submit button for a word.
function word_sub_func()
{
  first_move = true;
  var score = 0;
  var i = 1;

  var word_score = parseInt(document.getElementById("score").innerHTML);
    //Double word for double word count.
        while(double_word_count > 0)
        {
          word_score *= 2;
          double_word_count -= 1;
        }
        //Triple word for triple word count.
        while(triple_word_count > 0)
        {
          word_score *= 3;
          triple_word_count -= 1;
        }
  var game_score = parseInt(document.getElementById("gamescore").innerHTML);
  document.getElementById("gamescore").innerHTML = word_score + game_score;
  document.getElementById("score").innerHTML = 0;
  document.getElementById("word").innerHTML = "";

  //If a tile is on the board, get a new one.
  while(i < 8)
  {
     if(TileLoc["player-tile" + i]["row"] != -1)
       { reset_tile("player-tile" + i, "decrement");  }
     i+= 1;
  }
  enable_all();

    moves = 0;
    document.getElementById("score").innerHTML = 0;
    document.getElementById("word").innerHTML = " ";
    enable_all();
    word = "";
    reset_tileloc();
}

//Disable all but the four surrounding the first piece.
function disable_all_but_row_col(col, row)
{
  //Disable all.
  $("#board > span").droppable("disable");
  //Only enable immediate 4 moves.
  $("#" + (parseInt(row) + 1) + "_" + col).droppable("enable");
  $("#" + (parseInt(row) - 1) + "_" + col).droppable("enable");
  $("#" + row + "_" + prevLetter(col)).droppable("enable");
  $("#" + row + "_" + nextLetter(col)).droppable("enable");
}

//Disable everything except the current row or column, and the space next to
//a tile already placed.
function disable_all_but_one()
{
    //Disable all.
    $("#board > span").droppable("disable");
    //Enable the beginning and end.
    if(direction == "horizontal")
    {
      start_col = start.split("_")[1];
      end_col = end.split("_")[1];
      row = start.split("_")[0];
      $("#" + row + "_" + prevLetter(start_col)).droppable("enable");
      $("#" + row + "_" + nextLetter(end_col)).droppable("enable");
    }
    if(direction == "vertical")
    {
      start_row = start.split("_")[0];
      end_row = end.split("_")[0];
      col = start.split("_")[1];
      $("#" + (parseInt(start_row) - 1) + "_" + col).droppable("enable");
      $("#" + (parseInt(end_row) + 1) + "_" + col).droppable("enable");
    }
}
//Enables all pieces.
function enable_all()
{
  $("#board > span").droppable("enable");
}
//Clears screen and resets game.
function reset_screen()
{
  var i = 1;
  while (i < 8)
  {
    reset_tile("player-tile" + i, "no decrement");
    i += 1;
  }
  moves = 0;
  document.getElementById("score").innerHTML = 0;
  document.getElementById("gamescore").innerHTML = 0;
  document.getElementById("word").innerHTML = " ";
  enable_all();
  word = "";
}


//Help deleting tile from: http://stackoverflow.com/questions/3387427/remove-element-by-id
function reset_tile(tile, decval)
{
  var t;
    if(decval == "no decrement")
    {
      var temp = document.getElementById(tile);
      var letter = jQuery(temp).find("img").attr("alt");
      ScrabbleTiles[letter]["number-remaining"] += 1;
    }
  t = document.getElementById(tile);
  t.outerHTML = null;
  delete t;
  $("#tile-rack").append('<div id=' + tile + '></div>');
  get_tile(tile);

}

function reset_tileloc()
{
  var i = 1;
  while(i < 8)
  {
    TileLoc["player-tile" + i]["row"] = -1;
    TileLoc["player-tile" + i]["column"] = -1;
    TileLoc["player-tile" + i]["letter"] = -1;
    TileLoc["player-tile" + i]["score"] = 0;
    i+= 1;
  }
}


//Function from Stack overflow when I was looking to see if there was a
//.prev or .next for the alphabet in Javascript.
//Source at: http://stackoverflow.com/questions/4095106/javascript-find-out-previous-letter-in-alphabet
function prevLetter(letter) {
    if (letter === 'a'){ return 'z'; }
    if (letter === 'A'){ return 'Z'; }
    return String.fromCharCode(letter.charCodeAt(0) - 1);
}

function nextLetter(letter){
  if(letter == 'z'){ return 'a'; }
  return String.fromCharCode(letter.charCodeAt(0) + 1);
}
