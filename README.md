# Ejer_20 - API REST Biblioteca

API REST con Express, Mongoose y MongoDB Atlas para gestionar autores y libros.

## Instalacion

```bash
npm install
```

Copia `.env.example` a `.env` y cambia `MONGODB_URI` por tu cadena de conexion de MongoDB Atlas.

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/libreria?retryWrites=true&w=majority
PORT=3000
```

## Ejecutar en local

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3000
```

## Base de datos

En MongoDB Atlas crea:

- Base de datos: `libreria`
- Colecciones: `autores` y `libros`

Importa manualmente los archivos `autores.json` y `libros.json` en sus colecciones correspondientes.

## Endpoints

### Autores

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/autores` | Obtener todos los autores |
| GET | `/api/autores?nacionalidad=Española` | Filtrar autores por nacionalidad |
| GET | `/api/autores/:id` | Obtener un autor por referencia |
| POST | `/api/autores` | Crear un autor |
| PUT | `/api/autores/:id` | Actualizar un autor |
| DELETE | `/api/autores/:id` | Eliminar un autor y sus libros |
| GET | `/api/autores/:id/libros` | Obtener libros de un autor |

Ejemplo para crear autor:

```json
{
  "referencia": "AUT001",
  "nombre": "Miguel de Cervantes",
  "nacionalidad": "Española",
  "fechaNacimiento": "1547-09-29",
  "imagenUrl": "https://example.com/cervantes.jpg"
}
```

### Libros

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros?sort=titulo` | Ordenar libros por titulo |
| GET | `/api/libros/:id` | Obtener un libro por referencia |
| POST | `/api/libros` | Crear un libro |
| PUT | `/api/libros/:id` | Actualizar un libro |
| DELETE | `/api/libros/:id` | Eliminar un libro |

Ejemplo para crear libro:

```json
{
  "referencia": "LIB001",
  "titulo": "Don Quijote de la Mancha",
  "genero": "Novela",
  "anyoPublicacion": 1605,
  "autor": "AUT001",
  "imagenUrl": "https://example.com/quijote.jpg"
}
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio desde Vercel.
3. En `Settings > Environment Variables`, crea `MONGODB_URI` con la cadena de conexion de Atlas.
4. Despliega.

En MongoDB Atlas, en `Network Access`, permite la conexion desde Vercel. Para pruebas puedes usar `0.0.0.0/0`.

## Postman

Importa la coleccion [Biblioteca_API.postman_collection.json](postman/Biblioteca_API.postman_collection.json) para tener todas las peticiones como botones clicables.

- Variable `base_url`: `http://localhost:3000` o la URL de Vercel.
- Variable `autor_id`: referencia de autor para las pruebas.
- Variable `libro_id`: referencia de libro para las pruebas.

Guarda las capturas del funcionamiento completo en la carpeta `capturas/`.
