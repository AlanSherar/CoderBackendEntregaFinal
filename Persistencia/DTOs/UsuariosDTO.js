class UsuariosDto {
  constructor({id, email, password, nombre, apellido, edad, numero, avatar}) {
    this.id = id
    this.email = email
    this.password = password
    this.info = {
      nombre,
      apellido,
      edad,
      numero,
      avatar,
    }
  }
}

export function getUsuariosDTO(data) {
  if (Array.isArray(data)) {
    return data.map(e => new UsuariosDto(e))
  } else {
    return new UsuariosDto(data)
  }
}