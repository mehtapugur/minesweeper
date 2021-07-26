//global değişkenler
var ctx, cBuffer, ctxBuffer;
var cort = [];
var konum = [];
var live = [];
var tikCor, tikResult;
var count = 0;
var isPlay = true;

//oyun alanlarının hücrelere (120 adet) ayrılması
for (var y = 0; y <= 360; y += 40) {
  for (var x = 0; x <= 440; x += 40) {
    cort.push([x, y, x + 40, y + 40]);
  }
}

//konum dizisine 120 adet hücrenin eklenmesi
for (var i = 0; i < cort.length; i++) {
  konum.push(i);
}

var init = function () {
  ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
  //uygulamada kullanılacak resimlerin oluşturulması
  var imgGrass = new Image();
  imgGrass.src = "images/grass.jpg";
  var imgMine = new Image();
  imgMine.src = "images/mine.png";
  cBuffer = document.createElement("canvas");
  document.getElementById("txt").value = 0;
  cBuffer.id = "buffer";
  cBuffer.width = ctx.canvas.width;
  cBuffer.height = ctx.canvas.height;
  document.body.appendChild(cBuffer);

  ctxBuffer = cBuffer.getContext("2d");
  ctxBuffer.strokeStyle = "gray";
  ctxBuffer.fillStyle = "white";
  ctxBuffer.fillRect(0, 0, 480, 400);
  cBuffer.addEventListener("click", myClick, false);

  // ızgara çizimi
  for (var x = 0; x <= 480; x += 40) {
    ctxBuffer.beginPath();
    ctxBuffer.moveTo(x, 0);
    ctxBuffer.lineTo(x, 400);
    ctxBuffer.stroke();
  }

  for (var y = 0; y <= 400; y += 40) {
    ctxBuffer.beginPath();
    ctxBuffer.moveTo(0, y);
    ctxBuffer.lineTo(480, y);
    ctxBuffer.stroke();
  }

  for (var i = 0; i < 120; i++) {
    konumHesapla();
  }

  // çim görsellerinin live dizisinin ilk 80 elemanına atanması
  imgGrass.onload = function () {
    for (var i = 0; i < 80; i++) {
      ctx.drawImage(imgGrass, cort[live[i]][0], cort[live[i]][1]);
    }
  };

  //mayın görsellerinin dizinin son 40 elemanına atanması
  imgMine.onload = function () {
    for (var i = 80; i < 120; i++) {
      ctx.drawImage(imgMine, cort[live[i]][0], cort[live[i]][1]);
    }
  };
};

//hücre numaralarının rasgele oluşturulup live dizisine atanması
var konumHesapla = function () {
  while (true) {
    var rnd_ = Math.round(Math.random() * 119);

    if (konum.indexOf(rnd_) != -1) {
      live.push(rnd_);
      konum.splice(konum.indexOf(rnd_), 1);
      return;
    }
  }
};

var myClick = function (event) {
  if (!isPlay) {
    return;
  }

  var event = event || window.event;
  var mouseX = event.clientX - cBuffer.offsetLeft;
  var mouseY = event.clientY - cBuffer.offsetTop;

  for (var i = 0; i < cort.length; i++) {
    if (
      mouseX > cort[i][0] &&
      mouseX <= cort[i][2] &&
      mouseY > cort[i][1] &&
      mouseY <= cort[i][3]
    ) {
      tikCor = i;
    }
  }

  tikResult = live.indexOf(tikCor);

  if (tikResult >= 80) {
    ctxBuffer.clearRect(0, 0, 480, 400);
    for (var x = 0; x <= 480; x += 40) {
      ctxBuffer.beginPath();
      ctxBuffer.moveTo(x, 0);
      ctxBuffer.lineTo(x, 400);
      ctxBuffer.stroke();
    }
    for (var y = 0; y <= 400; y += 40) {
      ctxBuffer.beginPath();
      ctxBuffer.moveTo(0, y);
      ctxBuffer.lineTo(480, y);
      ctxBuffer.stroke();
    }

    document.getElementById("txt").value = "Score: " + count;
    isPLay = false;
  } else {
    //kulllanıcının tıkladığı hücredeki görselin gösterilmesi
    ctxBuffer.clearRect(cort[tikCor][0] + 1, cort[tikCor][1] + 1, 38, 38);
    count += 5;
    document.getElementById("txt").value = count;
  }
};
