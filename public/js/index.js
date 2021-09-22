const socket = io();

socket.on('mensajes', (data) => {
    render(data);
});

let render = (data) => {
    let html = 
    data.map((m) =>`
    <div class="shadow p-3 mb-5 bg-body rounded">
        <strong>${m.autor}:</strong>  
        <em>${m.texto}</em>
    </div>
    `).join(' ');
    document.getElementById('mensajes').innerHTML = html;
}

function envioMensaje(e){
    let autor = document.getElementById('nombre').value;
    let texto = document.getElementById('mensaje').value;
    socket.emit('nuevo', {autor, texto});
    return false;
}