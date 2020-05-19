var buttonGenerador = document.getElementById('hola')
var bajar = document.getElementById('bajar')
draw()

buttonGenerador.addEventListener('click', draw)
bajar.addEventListener('click', download)

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
    ctx.clearRect(0,0, imagen.width, imagen.height);
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, imagen.width, imagen.height);
    var t = new TinyTurtle();

    t.box = function box(ciclos,angulo) {
        var length = 10
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
