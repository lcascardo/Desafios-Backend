const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {
    btnLogout.addEventListener('click' , ()=>{
        fetch('/logout').then(console.log("sesion borrada"))
    })
}