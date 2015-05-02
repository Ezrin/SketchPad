var GRID_DIM = 960; //Const - size of grid
var activeColor = "black";
var gridState = true;

$(document).ready(function () {
  generateGrid();
  //Detect key state
  var keyDown = false;
  $(window).keydown(function(evt){
    if (evt.which == 90){
      keyDown = true;
      $('#draw-button').css({"background-color":"#33f",
                            "border":"2px solid #777"});
    }
  }).keyup(function(evt){
    if (evt.which == 90) {
      keyDown = false;
      $('#draw-button').css({"background-color":"#009",
                            "border":"2px solid #333"});
    }
  });
  //Paint
  $(document).on('mouseenter',".grid-cell", function(){
    if (keyDown){
      activeColor = $('input[name=active-color]:checked','#selections').val();
      $(this).css({"background-color": activeColor});
    }
  });
  //Open-close toolbar
  $("#toolbar").on('click','#collapse', function(){
    var toolBar = $(this).closest("#toolbar");
    if (toolBar.hasClass("toolbar-hidden")) {
      toolBar.removeClass("toolbar-hidden");
      $('#collapse').css({"background-color":"#f00",
                        "border":"2px solid #777"});
    }else{
      toolBar.addClass("toolbar-hidden"); 
      $('#collapse').css({"background-color":"#900",
                        "border":"2px solid #333"});
    }
  });
  //Resize Grid
  $("#toolbar").on('click','#size-button', generateGrid);
  //Set grid
  $('#grid-on').on('click',function(){
    if (gridState === true){
      $('.grid-cell').css({"border":"1px solid transparent"});
      gridState = false;
    }else{
      $('.grid-cell').css({"border":"1px solid black"});
      gridState = true;
    }
  });              
});

function generateGrid() { 
  var gridTable = $('#grid-frame');
  var dim = $('#cell-size').val();
  if (validation(dim)){
    gridTable.find(".row").remove();
    var cellSize = (GRID_DIM / dim) - 2;
    for (var i = 0; i < dim; i += 1) {
      gridTable.append('<div class="row"></div>');
    }
    var row = gridTable.find(".row");
    for (var j = 0; j < dim; j += 1) {
      //For some reason the div needs text in it to diplay properly. Set "color:transparent" in stylesheet.
     row.append('<div class="grid-cell" style="width:' + cellSize + 'px; height:' + cellSize +'px;">.</div>');
    }
  }else{
    alert("Grid size must be from 1 to 48")
  }
}

function validation(test) {
  if (test >= 1 && test <= 48) {
    return true;
  } else {
    return false;
  }
}