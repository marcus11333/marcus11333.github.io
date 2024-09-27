let path = "art_images/flames/"
const flame_box = document.getElementById("flame_box");
for (i=1;i<85;i++){
    let isrc = path + "flame" + i + ".jpg"
    let img = document.createElement("img")
    img.src = isrc
    flame_box.appendChild(img)
}

path = "art_images/fractals/"
const fractal_box = document.getElementById("fractal_box");
for (i=1;i<149;i++){
    let isrc = path + "fractal" + i + ".jpg"
    let img = document.createElement("img")
    img.src = isrc
    fractal_box.appendChild(img)
}
