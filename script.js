"use strict";

var background = new Image();



var canvas = document.getElementById("tela");

var ctx = canvas.getContext("2d");
//coordenadas
var x = 650,
    y = 300,
    larg = 50,
    alt = 50,
    escala = 0.2,
    wheelAngle = 0,
    velocidade = 5,
    aceleracao = 0,
    ang = 0;

//cores    
var corRoda = "rgb(50,50,50)",
    corEstruturaCarro = "rgb(0,200,0)",
    corEscuroInterior = "rgb(0,100,0)",
    corEncostoBanco = "rgb(20,20,20)",
    corAcentoBanco = "rgb(14,14,14)",
    corLuzFreio = "rgb(200,0,0)",
    corFarol = "rgb(255,255,0",
    corParabrisa = "rgb(160,160,230)",
    corBordaParabrisa = "rgb(50,100,50)";



var teclas = [];
for (let i = 0; i < 256; i++) {
    teclas[i] = false;
}


function desenhar() {

    processaTeclas();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fundo();

    //movimentação
    x += (velocidade * aceleracao) * Math.sin(Math.PI / 180 * -ang);
    y += (velocidade * aceleracao) * Math.cos(Math.PI / 180 * -ang);

    //roda IE
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corRoda;
    ctx.fillRect(larg - 110, alt, 20, 35);
    ctx.restore();

    //roda SE
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(wheelAngle);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corRoda;
    ctx.fillRect(larg - 110, alt - 80, 20, 35);
    ctx.restore();

    //roda ID
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corRoda;
    ctx.fillRect(larg - 30, alt, 20, 35)
    ctx.restore();

    //roda SD
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(wheelAngle);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corRoda;
    ctx.fillRect(larg - 30, alt - 80, 20, 35)
    ctx.restore();

    // estrutura carro
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corEstruturaCarro;
    ctx.fillRect(-larg, -alt, 80, 150);
    ctx.restore();

    // interior
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corEscuroInterior;
    ctx.fillRect(-larg + 5, -alt + 120, 70, -60);
    ctx.restore();

    // banco de tras encosto
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corEncostoBanco;
    ctx.fillRect(-larg + 5, -alt + 115, 70, -25);
    ctx.restore();

    // banco de tras
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corAcentoBanco;
    ctx.fillRect(-larg + 5, -alt + 105, 70, -15);
    ctx.restore();

    // banco de motorista encosto
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corEncostoBanco;
    ctx.fillRect(-larg + 10, -alt + 83, 25, -20);
    ctx.restore();

    // banco de motorista
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corAcentoBanco;
    ctx.fillRect(-larg + 10, -alt + 74, 25, -10);
    ctx.restore();

    // banco de carona encosto
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corEncostoBanco;
    ctx.fillRect(-larg + 45, -alt + 83, 25, -20);
    ctx.restore();

    // banco de carona
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corAcentoBanco;
    ctx.fillRect(-larg + 45, -alt + 74, 25, -10);
    ctx.restore();

    //luz freio superior
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corLuzFreio;
    ctx.fillRect(-larg, -alt + 140, 10, 10);
    ctx.restore();

    //luz freio inferior
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corLuzFreio;
    ctx.fillRect(-larg + 70, -alt + 140, 10, 10);
    ctx.restore();

    //farol superior
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corFarol;
    ctx.fillRect(-larg, -alt, 10, 10);
    ctx.restore();

    //farol inferior
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corFarol;
    ctx.fillRect(-larg + 70, -alt, 10, 10);
    ctx.restore();

    //vidro frente
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillStyle = corParabrisa;
    ctx.fillRect(-larg, -alt + 60, 80, -25);
    ctx.lineWidth = 2;
    ctx.strokeStyle = corBordaParabrisa;
    ctx.strokeRect(-larg, -alt + 60, 80, -25)
    ctx.restore();

    requestAnimationFrame(desenhar);

}

requestAnimationFrame(desenhar);



document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
    //rotacionar roda para a direita
    if (teclas[68]) {
        wheelAngle = Math.PI / 22;
    }

    //rotacionar roda para a esquerda  
    if (teclas[65]) {
        wheelAngle = -(Math.PI / 22);
    }


}
document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
    wheelAngle = 0;
    aceleracao = 0;
    corLuzFreio = "rgb(200,0,0)";

}

function processaTeclas() {

    if (teclas[83]) {
        corLuzFreio = "rgb(255,255,255)";
    }

    //movimento para frente e para trás
    if (teclas[87]) {
        if (x < 20 || y < 25 || x > 740 || y > 630) {
            aceleracao = 0;
            setTimeout(function () {
                location.reload();
                alert("You cego")
            }, 200);
        } else {
            aceleracao = -1;

        }
    } else if (teclas[83]) {
        if (x < 25 || y < 30 || x > 733 || y > 620) {
            aceleracao = 0;
            setTimeout(function () {
                location.reload();
                alert("You cego")
            }, 200);
        } else {
            aceleracao = 1;

        }
    }

    //ajuste escala
    if (teclas[16] && escala < 2) {
        escala += 0.2;
    } else if (teclas[17] && escala > 0.4) {
        escala -= 0.2;
    }

    //movimento horário para frente
    if (teclas[87] && teclas[68]) {
        ang += 5;
    }

    //movimento anti-horário para frente
    if (teclas[87] && teclas[65]) {
        ang -= 5;
    }

    //movimento horário para trás
    if (teclas[83] && teclas[65]) {
        ang += 5;
    }

    //movimento anti-horário para trás
    if (teclas[83] && teclas[68]) {
        ang -= 5;
    }

}

function fundo() {
    background.src = "track.jpg";
    ctx.drawImage(background, 0, 0);
}