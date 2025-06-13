let player; // Variable global para controlar el iframe

// Carga el iframe de YouTube y crea el reproductor
function openVideo() {
  const modal = document.getElementById('videoModal');
  modal.classList.remove('hidden');
  const params = new URLSearchParams(window.location.search);

  // Accedemos a un parámetro llamado "nombre"
  const metodo = params.get("met");

  if (!player) {
    player = new YT.Player('youtubePlayer', {
      videoId: 'dsdjDx3gKa8', // <-- remplaza con el ID del video real
      events: {
        'onReady': (event) => {
          event.target.playVideo();
        }
      }
    });
  } else {
    player.seekTo(0);
    player.playVideo();
  }
    openVideoLog(metodo);
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const params = new URLSearchParams(window.location.search);

  // Accedemos a un parámetro llamado "nombre"
  const metodo = params.get("met");

  if (player && player.getCurrentTime) {
    const currentTime = player.getCurrentTime();
    console.log(`Video cerrado en el segundo: ${currentTime.toFixed(2)}`);
    closeVideoLog(currentTime.toFixed(2), metodo);
  }

  if (player && player.pauseVideo) {
    player.pauseVideo();
  }

  modal.classList.add('hidden');
}




function openVideoLog(metodo) {
      
      console.log("Se hizo click en el video");
      let idUser = localStorage.getItem("idUser");
      if (!idUser) {
        idUser = crypto.randomUUID(); // Genera un ID único
        localStorage.setItem("idUser", idUser);
      }
      sendInfoToServer(idUser, metodo);
    }

function closeVideoLog(tiempo, metodo) {
    
    let idUser = localStorage.getItem("idUser");
    if (!idUser) {
        idUser = crypto.randomUUID(); // Genera un ID único
        localStorage.setItem("idUser", idUser);
    }

    sendDesconectionToServer(idUser, metodo, new Date(), tiempo);


}
function sendDesconectionToServer(idUser, metodo, fecha = new Date(), tiempo = 0) {
    const fechaMadrid = fecha.toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
    fetch('https://hook.eu2.make.com/h5d2zc7wyrdwwpi5anml06nio852vag2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUser: idUser,
            metodo: metodo,
            fecha: fechaMadrid,
            tiempo: tiempo
        })
    }).then(response => {
        if (!response.ok) {
            console.error("Error al enviar los datos:", response.statusText);
        } else {
            console.log("Datos enviados correctamente");
        }
    }).catch(error => {
        console.error("Error de red:", error);
    });
}
function sendInfoToServer(idUser, metodo, fecha = new Date()) {
    const fechaMadrid = fecha.toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

    fetch('https://hook.eu2.make.com/8skg3rb5ohz0ea9szhbq42v1ddebtk6c', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUser: idUser,
            metodo: metodo,
            fecha: fechaMadrid
        })
    }).then(response => {
        if (!response.ok) {
            console.error("Error al enviar los datos:", response.statusText);
        } else {
            console.log("Datos enviados correctamente");
        }
    }).catch(error => {
        console.error("Error de red:", error);
    });
}