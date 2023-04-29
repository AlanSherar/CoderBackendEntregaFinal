# PROYECTO ECOMMERCE DEL CURSO DE PROGRAMACIÓN BACKEND - CODERHOUSE

## Profesor titular - [Marcos Villanueva](https://github.com/marcosvillanueva9)

<br>

## ENTREGA FINAL

### [Link al proyecto desplegado en Railway](https://alansitio.up.railway.app)
### [DOCUMENTACIÓN (swagger) ](https://alansitio.up.railway.app/api/docu)

<br>

# ENDPOINTS

## Router "/"
## Registro
| Method  | Ruta        | Descripción          |
| :---    | :---        | :---                 |
| POST    | /signin     | Crear cuenta.        |
| GET     | /failSingin | Al fallar el signin. |  
<br>

## Inicio de sesión
| Method  | Ruta       | Descripción         |
| :---    | :---       | :---                |
| POST    | /login     | Loguear cuenta.     |
| GET     | /failLogin | Al fallar el login. |  
<br>

## Index
| Method | Ruta | Descripción      |
| :---   | :--- | :---             |
| GET    | /    | Acceder a index. |  
<br>

## Productos
| Method | Ruta               | Descripción                         |
| :---   | :---               | :---                                |
| GET    | /productos         | Devuelve todos los productos.       |
| GET    | /productos/:filtro | Devuelve productos segun el filtro. |
<br>

## Carrito
| Method  | Ruta                 | Descripción                      |
| :---    | :---                 | :---                             |
| GET     | /carrito             | Devuelve el carrito.             |
| PUT/GET | /carrito/addProd/:id | Añade un producto al carrito.    |
| PUT/GET | /carrito/delProd/:id | Elimina un producto del carrito. |
| GET     | /carrito/comprar     | Realizar pedido de compra.       |
<br>

## Perfil
| Method | Ruta    | Descripción |
| :---   | :---    | :---        |
| GET    | /perfil | Informacion del usuario. |
<br>

## Info
| Method | Ruta  | Descripción             |
| :---   | :---  | :---                    |
| GET    | /info | Informacion del server. |
<br>

## Cierre de sesión
| Method | Ruta    | Descripción                |
| :---   | :---    | :---                       |
| GET    | /logout | Desloguear session activa. |
<br>

## Router "/productosApi"
| Method | Ruta | Descripción                              |
| :---   | :--- | :---                                     |
| POST   | /    | Crear uno o varios productos.            |
| GET    | /    | Recuperar todos los productos.           |
| GET    | /:id | Recuperar un producto.                   |
| PUT    | /:id | Actualizar un producto.                  |
| DELETE | /:id | Eliminar un producto o varios productos. |
| DELETE | /    | Eliminar todos los productos.            |

## Alan Sherar
### [GitHub Personal](https://github.com/AlanSherar)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alan-sherar/)
