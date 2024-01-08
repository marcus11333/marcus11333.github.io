//set up the graph
var elt = document.getElementById('bernard');
var calculator = Desmos.GraphingCalculator(elt, {
  "graphpaper": true,
  "expressions":false,
  "settingsMenu":false,
  "expressionsTopbar": false,
  "keypad": false,
  "zoomButtons": false,
  "border": true
});


function updateGraph(){
  $.getJSON("strings.json", function(json) {
    $.each(json, function(user,expr) {
      calculator.setExpression({
        latex: String.raw`${expr}`,
        id: calculator.controller.generateId()
      });
      console.log(expr)
    });
  });
}






form = document.getElementById("expression");
function submit(){
  input = form.value
  calculator.setExpression({latex:String.raw`${input}`});
  state = calculator.getState();
}



