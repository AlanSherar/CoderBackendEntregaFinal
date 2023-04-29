
class ProductosDto {
  constructor({ titulo, precio, thumbnail, _id, tags }) {
    this.titulo = titulo
    this.precio = precio
    this.thumbnail = thumbnail
    this.tags = tags
    this._id = _id
  }
}

export function getProductosDTO(data) {
  if (Array.isArray(data)) {
    return data.map(e => new ProductosDto(e))
  } else {
    return new ProductosDto(data)
  }
}
