class CarritosDto {
  constructor({user, productos, timestamp, _id}) {
    this.user = user
    this.productos = productos
    this.timestamp = timestamp
    this._id = _id
  }
}

export function getCarritosDTO(data) {
  if (Array.isArray(data)) {
    return data.map(e => new CarritosDto(e))
  } else {
    return new CarritosDto(data)
  }
}
