 //deslizate sobre el gif y elegi tu fx de sound
 let gify;
 let textToWrite = "Podemos automatizar eventos para que sucedan en momentos específicos de la reproducción de nuestro audio.";
 let typedText = "";
 let typingSpeed = 3; // Velocidad de escritura (cuadros por letra)
 
 let cancion;
 let cancionRate = 1; // Inicialmente, la velocidad de reproducción es 1
 let volumen = 1; // Inicialmente, el volumen es 1
 
 function preload() {
   gify = loadImage('ver.gif');
   cancion = loadSound("ab53.wav");
 }
 
 function setup() {
   createCanvas(900, 600);
   textSize(12);
   textFont('Source Code Pro, monospace');
   cancion.loop();
 }
 
 function draw() {
   background(255);
   displayText();
   typeText();
 
   // Calcular el centro y el radio del círculo de enmascaramiento
   let centerX = width / 2;
   let centerY = height / 2;
   let circleRadius = 150; // Cambia este valor según tus necesidades
 
   // Dibuja un círculo de enmascaramiento
   fill(25, 68, 89);
   ellipse(centerX, centerY, circleRadius * 2);
 
   // Establece el modo de mezcla para que la imagen solo se muestre dentro del círculo
   blendMode(DARKEST);
 
   // Muestra la imagen enmascarada
   image(gify, centerX - circleRadius, centerY - circleRadius, circleRadius * 8, circleRadius * 2);
 
   // Restaura el modo de mezcla a su valor predeterminado
   blendMode(BLEND);
 
   document.oncontextmenu = function () {
     return false;
   };
 
   // Actualiza la velocidad de reproducción y el volumen según la posición del mouse
   cancionRate = map(mouseX, 0, width, 2, -1);
   volumen = map(mouseY, 0, height, 4, 0);
 
   // Aplica los cambios en la velocidad de reproducción y el volumen
   cancion.rate(cancionRate);
   cancion.setVolume(volumen);
 }
 
 function displayText() {
   fill(0);
   textSize(14);
   textStyle(BOLD);
   text(typedText, 20, 20);
   text("Cuando llamamos a este método, debemos pasarle como primer parámetro el tiempo del archivo de audio en el que queremos que se dispare el evento. El segundo parámetro es la función de usuario a la que va a llamar cuando se dispare el evento. Por último se le pasa la cantidad de valores que refieren a los parámetros de la función creada", 50, height - 30);
   text("Para esto utilizamos el método addCue:archivo.addCue(tiempo, funcion, parámetros)", 50, height - 10);
 }
 
 function typeText() {
   if (frameCount % typingSpeed === 0 && typedText.length < textToWrite.length) {
     typedText += textToWrite[typedText.length];
   }
 }
 
 function keyPressed() {
   var tiempo;
 
   if (keyCode == LEFT_ARROW && cancion.currentTime() > 1) {
     tiempo = cancion.currentTime() - 1;
   }
 
   if (keyCode == RIGHT_ARROW && cancion.currentTime() < cancion.duration() - 1) {
     tiempo = cancion.currentTime() + 1;
   }
 
   cancion.jump(tiempo);
 }
   // Pausa o reproduce el sonido con numero 4
   if (key == 4) {
     if (reproduciendo) {
       cancion.pause();
     } else {
       cancion.play();
     }
     reproduciendo = !reproduciendo; // Cambia el estado de reproducción
   
 }
 
 