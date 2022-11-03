# Back Los Alpes Store

## INIT

Se trata de una app que consulta en una base de datos de postgreSQL, productos de una tienda, se pueden hacer solicitudes `POST`, `GET` and `DELETE`

Lo primero que haremos es montar la base de datos en un contenedor. Ejecutamos el siguiente comando una vez hacemos fork al proyecto.

```bash
docker-compose up
```



Este comando ejecutara el archivo docker-compose.yml, la cual contiene las credeciales para concetarse con la base de datos.
Tambien es de notar que por temas de desarrollo y por tener el puerto 5432 ocupado, cambie el puerto a 5433.
```yml
environment:
  - POSTGRES_DB=my_store
  - POSTGRES_USER=Brandon
  - POSTGRES_PASSWORD=admin123
 ports:
  - 5433:5432
```

Una vez ejecutado el contenedor, procedemos a ejecutar node.js con el siguiente comando

```bash
npm run dev
```
## POSTMAN

La colleccion de pruebas para postman se adjunta en el repositorio, llamada `Prueba.postman_collection.json` solo se debe exportar a postman 

### GET ALL

http://localhost:3000/api/v1/products

Devuelve todos los productos, mostrando solo name, price y la url de la imagen.

### GET

(http://localhost:3000/api/v1/products/id)

Devuelve toda la informacion del producto, id, name, description, price, image y createdAt

### POST

http://localhost:3000/api/v1/products

Crea un producto en la base de datos de postgreSQL, el cual se le debe especificar obligatoriamente name y price.
Los demas parametros se generan automaticamente, como lo es el Id y el createdAt. 
Por otro lado se podra agregar una descripcion si lo desea y la url de la imagen, la cual de no ser especificada se generara una imagen generica.

```json
{
    "name": "Insert_Name",
    "description": "Insert_Description (Optional)",
    "price": "Insert_Value",
    "image": "Insert_URL (Optional)"
}
```
