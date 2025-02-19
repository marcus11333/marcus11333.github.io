function openFiles() {
  location.href= 'https://drive.google.com/drive/folders/1EwAu_jOYaWluvt4vtfsW8kX77AGyl_Wp?usp=sharing'
}


for (drop of document.getElementsByClassName("dropdown-content")){
  drop.style.display = "none"
}


function dropdownOpen(el){
  let stuff = el.parentElement.children[1]
  let toggle = stuff.style.display == "none"
  
  for (drop of document.getElementsByClassName("dropdown-content")){
    drop.style.display = "none"
  }
  
  
  if (toggle) { //fix string comparison
    stuff.style.display = "block"
  }
  
}