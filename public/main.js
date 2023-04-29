const socket = io()


socket.on('render-mensajes', data => {

  let html = "Aún no hay mensajes previos"

  if (data.length >= 1) {
    html = data.map(msj => {
      return `<div>
      <strong style ="color:blue">${msj.autor}</strong>
      [<span style ="color:brown">${msj.time}</span>]
      <em style ="color:green">: ${msj.text}</em>
      </div>`
    }).join(" ")
  }

  try {
    document.getElementById("messages").innerHTML = html

  } catch (error) {
  }})

socket.on('render-productos', productos => {
  let html = "<p> Aún no hay productos </p>"
  
  if (productos.length >= 1) {
    const prodhtml = productos.map(prod => {
      return `<tr>
      <td>${prod.titulo}</td>
      <td>${prod.precio}</td>
      <td>${prod.thumbnail}</td>
      </tr>`
    }).join(' ')
    html = `
      <table class="table table-dark">
        <tr style="color: yellow;"> <th>Title</th> <th>Price</th> <th>Thumbnail</th> </tr>
        ${prodhtml}
      </table>`
  }
  try {
    document.getElementById("productos").innerHTML = html

  } catch (error) {
  }
}) 

// Funciones para añadir mensajes y productos
function addMocks() {
  socket.emit("addMocks")
  return false
}

function addMessage() {

  const autor = document.getElementById("autor").innerText
  const text = document.getElementById("text").value

  if (autor && text) {
    const mensaje = {
      autor, 
      text,
      time: new Date()
    }
    socket.emit('new-msg', mensaje)
  }

  return false
}

function addProduct() {
  const titulo = document.getElementById("titulo")
  const precio = document.getElementById("precio")
  const thumb = document.getElementById("thumbnail")
  
  if (titulo.value && precio.value && thumb.value) {

    const producto = {
      titulo: titulo.value,
      precio: precio.value,
      thumbnail: thumb.value
    }

    socket.emit('new-prod', producto)

  }

  return false
}