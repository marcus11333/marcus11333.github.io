function openFiles() {
  location.href= 'https://drive.google.com/drive/folders/1-G9Wdg2l-c20-Y8-mHBOvfFcdcoA6hfl?usp=sharing'
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
