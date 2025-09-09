# DMCOffers 🎮 

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-blue?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?style=for-the-badge)
![Angular Material](https://img.shields.io/badge/Angular_Material-UI-1976D2?style=for-the-badge&logo=angular&logoColor=white)

---

## Información del Grupo  

**Integrantes:**  
- 47412 - Tobajas Ramírez, Ignacio 
- 47138 - Marcosano, Mauro Agustín  
- 46860 - Ceballos, Ramiro  
- 46848 - Hoyos, Alex Nicolás  
- 44865 - Fernández, Mateo  

---

## Repositorios  

- **Frontend:** [Link al repo](https://github.com/AlexNHoyos/dmcoffers-client)  
- **Backend:** [Link al repo](https://github.com/AlexNHoyos/dmcoffers-server-main)  

---

## Video de la aplicación

[Proximamente](https://www.youtube.com/watch) 

---

## Descripción del Proyecto

**DMCOffers** es un servicio web para:  
- Consultar **fechas de salida, precios y ofertas de videojuegos**.  
- Agregar juegos a su **lista de deseos**.
- Realizar compras simuladas y gestionar su **biblioteca de juegos** con códigos de canje.  
- Contratar servicios de **hosting para juegos** (publicadores).  

**Roles del sistema:**  
- **Administrador:** Gestiona CRUDs de juegos, publicadores, desarrolladores, hostings, usuarios y tickets de soporte.  
- **Moderador:** Gestiona tickets de soporte y hostings relacionados.  
- **Usuario tienda:** Accede a tienda, wishlist, biblioteca y carrito.  

---

## Funcionalidades  

### Usuarios finales  
- Registro e inicio de sesión con distintos niveles de acceso (usuario tienda, moderador, administrador).
- Recuperacion de contraseña vía email.  
- Gestión de **listas de deseos**, **biblioteca** y **carro de compras**.  
- Exploración de juegos con filtros por categoría, precio o fecha de salida.  
- Contratación de **servicios de hosting** para juegos propios (publicadores).  
- Envío de **tickets de soporte**.  

### Administradores  
- CRUDs completos de:  
  - Publicadores  
  - Desarrolladores  
  - Categorías  
  - Usuarios  
  - Juegos
  - Tickets de soporte  
  - Servicios de hosting  
- Gestión de roles de usuario.  
- Listados filtrados de tickets de soporte, hosting y juegos.  

---

## Especificaciones Tecnicas

### Backend  
- **Framework:** Express.js  
- **Base de datos:** Postgres
- **ORM:** TypeORM  
- **Autenticación:** JWT con diferentes roles  
- **Encriptación:** bcrypt   

### Frontend  
- **Framework:** Angular 19 
- **Estilos:** Angular Material 
- **Estrategia CSS:** Mobile-first con breakpoints SM, MD, LG  

---

## Otras caracteristicas del proyecto   

- Backend y Frontend desacoplados, comunicados por API
- Login con JWT y roles (sesion en SessionStorage)
- Theme-toggle (guardado en localStorage)
- Tests de frontend con Jasmine y testbed
- Tests de backend Jest
- Deploy de la app:
           - Front: <proximamente>  
           - Back: <proximamente>
           - DB: <proximamente>    

---

## Instalación y Ejecución   

### Clonar repositorios  
```sh
git clone https://github.com/AlexNHoyos/dmcoffers-client
git clone https://github.com/AlexNHoyos/dmcoffers-server-main  
```

### Configuración del Backend

1. Navega hacia la carpeta del backend:
   ```sh
   cd dmcoffers-server-main 
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` en la carpeta `pg-database` con el siguiente contenido:
   ```plaintext
   POSTGRES_HOST=<tu-host>
   POSTGRES_PORT=<tu-puerto>
   POSTGRES_USER=<tu-usuario>
   POSTGRES_PASSWORD=<tu-contraseña>
   POSTGRES_DB=<nombre-de-tu-bd>
   
   EMAIL_USER=<smtp-host>
   EMAIL_PASS=<smtp-puerto>

   ```
4. Ejecuta el servidor en modo desarrollo:
   ```sh
   npm run start-dev
   ```

### Configuración del Frontend

1. Navega hacia la carpeta del frontend:
   ```sh
   cd dmcoffers-client
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Ejecuta el frontend:
   ```sh
   npm run start
   ```

---

## Endpoints del Backend 

<Cargar capturas de Swagger o Postman>

---

## Modelo de Datos   

![Modelo DER en Draw.io](https://drive.google.com/file/d/1tck3RD6nlFP1pz9xcckBYNq8MNagbDFf/view)  

---

## Capturas de Funcionalidades

<Cargar GIFS con funcionalidades>

---

## Roadmap 

- Simular implementacion de carrito real
---

