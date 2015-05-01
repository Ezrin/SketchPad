var GRID_DIM = 960; //Const - size of grid

$(document).ready(function () {
  generateGrid();

  //Paint
  $(".grid-cell").on('mouseenter', function(){
    $(this).css({"background-color":"black"});
  });
  //Open-close toolbar
  $("#toolbar").on('click','#collapse', function(){
    var toolBar = $(this).closest("#toolbar");
    if (toolBar.hasClass("toolbar-hidden")) {
      toolBar.removeClass("toolbar-hidden");
    }else{
      toolBar.addClass("toolbar-hidden"); 
    }
  });
  //Resize Grid
  $("#toolbar").on('click','#size-button', generateGrid);
  
  
                  
});

function generateGrid() { 
  var gridTable = $('#grid-frame');
  var dim = $('#cell-size').val();
  if (validation(dim) === true){
    
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