var buttonGenerador = document.getElementById('hola')
var bajar = document.getElementById('bajar')
var rese = document.getElementById('reset')
var colorBase = document.getElementById('coloresBase')
var colorTodos = document.getElementById('coloresTodos')
var dis = document.getElementById('formas')
var back = document.getElementById('colorBack')
var comp = document.getElementById('compartir')
const queryString = window.location.search

if (queryString == ""){
    draw()
}
else {
    const urlParams = new URLSearchParams(queryString);
    var it = urlParams.get('it')
    var an = urlParams.get('an')
    var cb = urlParams.get('cb')
    var cpr = urlParams.get('cpr')
    var cf = urlParams.get('cf')
    cb = "#"+cb
    cpr = "#"+cpr
    cf = "#"+cf
    document.getElementById('ciclo').value = it
    document.getElementById('cicloOut').value = it
    document.getElementById('rango1').value = an
    document.getElementById('rangoOut').value = an
    document.getElementById('colorbase').value = cb
    document.getElementById('colorprimo').value = cpr
    document.getElementById('colorfondo').value = cf
    draw()
}

buttonGenerador.addEventListener('click', draw)
bajar.addEventListener('click', download)
rese.addEventListener('click', randomCompleto)
colorBase.addEventListener('click', randomColorBase)
colorTodos.addEventListener('click', randomColor )
dis.addEventListener('click', randomDis)
back.addEventListener('click', colorBackground)
comp.addEventListener('click', compartir)

function compartir(){
    var it = document.getElementById('ciclo').value
    var an = document.getElementById('rango1').value
    var cb = document.getElementById('colorbase').value.slice(1)
    var cpr = document.getElementById('colorprimo').value.slice(1)
    var cf = document.getElementById('colorfondo').value.slice(1)
    var data = `?it=${it}&an=${an}&cb=${cb}&cpr=${cpr}&cf=${cf}`
    //var gen_data = document.getElementById('data')
    //gen_data.setAttribute("href", data)
    copyLink(data)
}

function copyLink(data) {
    var dummy = document.createElement('input'),
        text = "https://lontuku.github.io/turtle/"+data;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('Dirección de este diseño copiada para compartir');
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("pizarra").toDataURL("image/png")
        .replace("image/jpg", "image/octet-stream");
    download.setAttribute("href", image);
    var it = document.getElementById('ciclo').value
    var an = document.getElementById('rango1').value
    var name = `geom-it${it}an${an}.jpg`
    download.setAttribute("download", name);

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

function colorBackground(){
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