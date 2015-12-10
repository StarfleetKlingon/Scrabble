/*
File:  www.github.com/StarfleetKlingon/Scrabble/tile-inventory.js
91.461 Assignment 9:  Scrabble
Therese M. Kuczynski, UMass Lowell Computer Science Student, therese_kuczynski@student.uml.edu
Copyright (c) 2015 by Therese M. Kuczynski.  All rights reserved.  May be freely
 copied or excerpted for educational purposes with credit to the author.
updated by TMK on December 10, 2015 at 11:00AM.
*/


//A data structure for the tiles written by Jesse M. Heines
//Located at /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Blank"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

var startPos = [];

function get_tile(position_on_stack)
{
//Random number generator based on example at: http://www.w3schools.com/jsref/jsref_random.asp
  //Random number between 1 and 99.
  var rand = Math.floor((Math.random() * 99) + 1);

/* Info on switch in Javascript: http://stackoverflow.com/questions/5619832/switch-on-ranges-of-integers-in-javascript */
  switch(true){
    case (rand < 10):
      check_tile_inventory("A", position_on_stack);
      break;
    case (rand > 9 && rand < 12):
      check_tile_inventory("B", position_on_stack);
      break;
    case (rand > 11 && rand < 14):
      check_tile_inventory("C", position_on_stack);
      break;
    case (rand > 13 && rand < 18):
      check_tile_inventory("D", position_on_stack);
      break;
    case (rand > 17 && rand < 30):
      check_tile_inventory("E", position_on_stack);
      break;
    case (rand > 29 && rand < 32):
      check_tile_inventory("F", position_on_stack);
      break;
    case (rand > 31 && rand < 35):
      check_tile_inventory("G", position_on_stack);
      break;
    case (rand >= 35 && rand <= 36):
      check_tile_inventory("H", position_on_stack);
      break;
    case (rand >= 37 && rand <= 45):
      check_tile_inventory("I", position_on_stack);
      break;
    case (rand == 46):
      check_tile_inventory("J", position_on_stack);
      break;
    case (rand == 47):
      check_tile_inventory("K", position_on_stack);
      break;
    case (rand >= 48 && rand <= 51):
      check_tile_inventory("L", position_on_stack);
      break;
    case (rand >= 52 && rand <= 53):
      check_tile_inventory("M", position_on_stack);
      break;
    case (rand >= 54 && rand <= 59):
      check_tile_inventory("N", position_on_stack);
      break;
    case (rand >= 60 && rand <= 67):
      check_tile_inventory("O", position_on_stack);
      break;
    case (rand >= 68 && rand <= 69):
      check_tile_inventory("P", position_on_stack);
      break;
    case (rand == 70):
      check_tile_inventory("Q", position_on_stack);
      break;
    case (rand >= 71 && rand <= 75):
      check_tile_inventory("R", position_on_stack);
      break;
    case (rand >= 76 && rand <= 79):
      check_tile_inventory("S", position_on_stack);
      break;
    case (rand >= 80 && rand <= 85):
      check_tile_inventory("T", position_on_stack);
      break;
    case (rand >= 86 && rand <= 89):
      check_tile_inventory("U", position_on_stack);
      break;
    case (rand >= 90 && rand <= 91):
      check_tile_inventory("V", position_on_stack);
      break;
    case (rand >= 92 && rand <= 93):
      check_tile_inventory("W", position_on_stack);
      break;
    case (rand == 94):
      check_tile_inventory("X", position_on_stack);
      break;
    case (rand >= 95 && rand <= 96):
      check_tile_inventory("Y", position_on_stack);
      break;
    case (rand == 97):
      check_tile_inventory("Z", position_on_stack);
      break;
    case (rand >= 98):
      check_tile_inventory("Blank", position_on_stack);
      break;
  }
}

//Makes sure there's a tile for the type the random number
//generator selected, otherwise rolls another random number.
function check_tile_inventory(letter, position_on_stack){
   if(ScrabbleTiles[letter]["number-remaining"] > 0)
     {
       claim_tile(letter, position_on_stack);
     }
   else
     {
      console.log("ELSE");
      get_tile(position_on_stack);
     }
}

//Initializes a tile for a player.
//Starting position information from github:
//http://stackoverflow.com/questions/12350259/original-position-of-a-draggable-in-jquery-ui
function claim_tile(letter, position_on_stack){
  ScrabbleTiles[letter]["number-remaining"] -= 1;
  img_loc = "<img src='tiles/Scrabble_Tile_" + letter + ".jpg' alt='" + letter + "' style='width:45px; height:45px;'>";
  document.getElementById(position_on_stack).innerHTML = img_loc;
 /* Can't drop tiles outside the board. http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */
  $("#" + position_on_stack).draggable({
    revert: 'invalid',
    start: function(evt, ui){
    startPos[position_on_stack] = ui.helper.position();
    }
  });
  $("#" + position_on_stack).draggable("option", "letter", letter);

}
