function openCoding() {
  location.href= 'Coding/index.html'
}

function openDesmos() {
  location.href= 'Desmos/index.html'
}


// '# '[1+2<∣{c+⍵×⍵}⍣9c←¯2J¯2+.1×0J1⊥¨⍳41 41-1J1]

java = document.getElementById("java");
javascript = document.getElementById("javascript");
python = document.getElementById("python");
html = document.getElementById("html");
php = document.getElementById("php");
p5 = document.getElementById("p5");
apl = document.getElementById("apl");
css = document.getElementById("css");
blender = document.getElementById("blender");
replit = document.getElementById("replit");

star = document.getElementById("star");

skillp = document.getElementById("skillp");

function swap(str){
  star.src = "logos/" + str + ".svg"
}
function revert(){
  star.src = "logos/star.svg"
}

//onmouseover
java.onmouseenter = function(){swap("java")}
javascript.onmouseenter = function(){swap("javascript")}
python.onmouseenter = function(){swap("python")}
html.onmouseenter = function(){swap("html")}
php.onmouseenter = function(){swap("php")}
p5.onmouseenter = function(){swap("p5")}
apl.onmouseenter = function(){swap("apl")}
css.onmouseenter = function(){swap("css")}
blender.onmouseenter = function(){swap("blender")}
replit.onmouseenter = function(){swap("replit")}
latex.onmouseenter = function(){swap("latex")}

skillp.onmouseleave = function(){revert()}

  