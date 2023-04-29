class MensajesDto {
  constructor({ _id, time, text, autor }) {
    this.id = _id
    this.text = text
    this.time = time
    this.autor = autor
  }
}

export function getMensajesDTO(data) {
  if (Array.isArray(data)) {
    return data.map(e => new MensajesDto(e))
  } else {
    return new MensajesDto(data)
  }
}