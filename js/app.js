var buttonGenerador = document.getElementById('hola')
var bajar = document.getElementById('bajar')
var rese = document.getElementById('reset')
var colorBase = document.getElementById('coloresBase')
var colorTodos = document.getElementById('coloresTodos')
var dis = document.getElementById('formas')

draw()

buttonGenerador.addEventListener('click', draw)
bajar.addEventListener('click', download)
rese.addEventListener('click', randomCompleto)
colorBase.addEventListener('click', randomColorBase)
colorTodos.addEventListener('click', randomColor )
dis.addEventListener('click', randomDis)

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("pizarra").toDataURL("image/png")
        .replace("image/jpg", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}

function draw() {
    var imagen = document.getElementById('pizarra')
    var ctx = imagen.getContext("2d");
    var ciclo = document.getElementById('ciclo').value
    var anguloext = document.getElementById('rango1').value
    var colorf = document.getElementById("colorfondo").value;
    
    ctx.clearRect(0,0, imagen.width, imagen.height);
    ctx.fillStyle = colorf;
    ctx.fillRect(0, 0, imagen.width, imagen.height);
    var t = new TinyTurtle();

    t.box = function box(ciclos,angulo) {
        var length = 10
        //var grosor = document.getElementById("grosor").value
        // this.pendWidth = grosor
        //this.penWidth = grosor
        for (var i = 0; i < ciclos; i++) {
            primo(i + 1)
            this.forward(length)
            this.right(angulo);
            length = length + 1
            
        }
        return this;
    };

    function primo(c) {
        var colorb = document.getElementById("colorbase").value;
        var colorp = document.getElementById("colorprimo").value;
        if (c == 1) {
            return t.penStyle = colorb
        }
        for (var i = 2; i < c; i++) {
            if (c % i == 0) {
                return t.penStyle = colorb
                
            }
        }
        t.penStyle = colorp

    } 

    
    t.box(ciclo,anguloext)
    
    // ctx.globalCompositeOperation = 'destination-over';
}

function randomCompleto(){
    var iteraciones = genRand(1,800)
    var angulos = genRand(1,180)

    document.getElementById('ciclo').value = iteraciones
    document.getElementById('cicloOut').value = iteraciones

    document.getElementById('rango1').value = angulos
    document.getElementById('rangoOut').value = angulos

    document.getElementById('colorbase').value = color()

    document.getElementById('colorprimo').value = color()

    document.getElementById('colorfondo').value = color()

    draw()
}

function randomColorBase(){
    document.getElementById('colorbase').value = color()

    document.getElementById('colorprimo').value = color()

    draw()
}

function randomColor(){
    document.getElementById('colorbase').value = color()

    document.getElementById('colorprimo').value = color()

    document.getElementById('colorfondo').value = color()

    draw()
}

function randomDis(){
    var iteraciones = genRand(1, 800)
    var angulos = genRand(1, 180)
    document.getElementById('ciclo').value = iteraciones
    document.getElementById('cicloOut').value = iteraciones

    document.getElementById('rango1').value = angulos
    document.getElementById('rangoOut').value = angulos

    draw()
}

function genRand(ini,limite){
    var rand = 0
    if (ini== 0){
        return rand = Math.floor(Math.random() * limite)
    }
    else {
        return rand = Math.floor(Math.random() * limite) + ini
    }
}

function color(){
    var red = genRand(0, 250)
    var green = genRand(0, 250)
    var blue = genRand(0, 250)

    return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue)

}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}