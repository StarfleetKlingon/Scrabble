
/* Globals */
var turn = "player1";
var last_position = 0;
//Double and triple word scores should be added after the rest.
var double_word_count;
var triple_word_count;

$(document).ready(function(){
  var i = 1;
  //Get seven tiles.
  while(i < 8)
  {
    tile_id = "player-tile" + i;
    get_tile(tile_id);
    i += 1;
  }

//Buttonpress event handler
//http://stackoverflow.com/questions/4323848/how-to-handle-button-click-events-in-jquery
$("#submit").click(function(){
  word_sub_func();
});

/* How to get the id of the droppable from: http://stackoverflow.com/questions/16999401/jquery-ui-how-to-get-element-id-where-drop-the-element */
/* Getting the alt attribute: http://stackoverflow.com/questions/3883882/get-the-alt-attribute-from-an-image-that-resides-inside-an-a-tag */
  $("#board > span").droppable({
    drop:function(event, ui){
      var score = 0;
      var drop_loc = $(event.target).attr('id');
      //Prevents you from being able to drop two tiles on the same
      //square.
      $("#" + drop_loc).droppable("disable");
      console.log(drop_loc);
      var dragged1 = document.getElementById(ui.draggable.attr("id"));
      //Once you've dropped a piece, you can't move it again.
      $(dragged1).draggable("disable");
      var letter = jQuery(dragged1).find("img").attr("alt");
      console.log(letter + " placed");
      score += calc_score(drop_loc, letter);
      var prevscore = parseInt(document.getElementById("score").innerHTML);
      document.getElementById("score").innerHTML = prevscore + score;
      ui.draggable.position({
        my: "center+4.5% center+4%",
        at: "center center",
        of: "#" + drop_loc
      });
    }
  });
});

/* Getting first-child referenced from: http://www.w3schools.com/jsref/prop_node_firstchild.asp */
function calc_score(drop_loc, tile)
{
  var row = drop_loc.split("_")[0];
  var col = drop_loc.split("_")[1];
  var bonus = document.getElementById(drop_loc).firstElementChild;
  var score = ScrabbleTiles[tile]["value"];
  if(bonus != null)
    {
      bonus = bonus.innerHTML;
      if(bonus == "Double Word Score")
       {
         double_word_count+=1;
       }
      if(bonus == "Triple Word Score")
       {
         triple_word_count+=1;
       }
      if(bonus == "Double Letter Score")
       {
          score *= 2;
       }
      if(bonus == "Triple Letter Score")
       {
         score *= 3;
       }
    }
  console.log(score);
  return score;
}