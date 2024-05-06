const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const cronometro = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoBeep = new Audio('./sonidos/beep.mp3');
const sonidoPlay = new Audio('./sonidos/play.wav');
const sonidoPause = new Audio('./sonidos/pause.mp3'); 

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', ()=> {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();  
    }
});

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto){
    mostrarCronometro();
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = ` Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>` 

            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Que tal un respiro?,
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;

        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie,
            <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;

        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        sonidoBeep.play();
        alert("Tiempo final");
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src','./imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    mostrarCronometro();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar (){
    if (idIntervalo) {
        reiniciar();
        sonidoPause.play();
        
        return;
    }
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    sonidoPlay.play();
}

function reiniciar(){
    clearInterval(idIntervalo);
    textoIniciarPausar.textContent = "Comenzar";    
    iconoIniciarPausar.setAttribute('src','./imagenes/play_arrow.png');
    idIntervalo = null;
}

function mostrarCronometro(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    cronometro.innerHTML = `${tiempoFormateado}`;
}

mostrarCronometro();
