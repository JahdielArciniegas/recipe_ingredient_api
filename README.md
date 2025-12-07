# Api Recipe Ingredients

## Esta es una api para gestionar recetas e ingredientes de los usuarios que no tienen tiempo que perder, y quieren encontrar todo en un solo lugar para asi mejorar su productividad.

# Caracteristicas Principales

- Autentificación de usurios, para diferencias precios y recetas de todos los paises y que ninguna receta sea expuesta a otra persona
- Gestion de recetas, para que el cliente tenga la posibilidad de crear, actualizar, eliminar esas recetas que estan llenas de polvo, y visualizar su precio de producción
- Gestion de ingredientes, donde podras colocar los precios de los ingredientes que mas usas y asi facilitar el calculo de tus presupuestos

# Tecnologias Utilizadas

- Node.js
- Typescript
- Express
- Postgres
- Bcrypt
- Jsonwebtoken
- Swagger
- Prisma
- EJS

# Estructura del proyecto

- src
  - controllers
  - middlewares
  - models
  - routes
  - config
  - lib
  - repositories
  - services
- views
  - ingredients.ejs
  - recipes.ejs
  - auth.ejs
  - recipe.ejs
- index.ts
- .env
- swagger.js
- swagger.json
- package.json
- tsconfig.json

# Instalación

git clone https://github.com/jahdiel/recipe_ingredients.git
npm install
npm run dev

# Configuración del Entorno

crea un archivo .env en la raiz del proyecto y agrega las siguientes variables:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:PORT_TABLE/TABLE_NAME?schema=public"
PORT=3000
JWT_SECRET

# ENDPOINTS Principales

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

GET /api/ingredients
GET /api/ingredients/:id
POST /api/ingredients
PUT /api/ingredients/:id
DELETE /api/ingredients/:id

GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PUT /api/recipes/:id
DELETE /api/recipes/:id

# Documentación

http://localhost:3000/docs

# Arquitectura

- El proyecto se realizo con una arquitectura de capas, donde tenemos rutas -> controladores -> servicios -> repositorio.
- Se usaron Middlewares para la autenticación, limitación y validación de datos.
- Prisma como acceso a datos con transcciiones
- JWT manejado por cookies/httpOnly
- EJS como motor de plantillas (Demostración de la api)

# Autor

Jahdiel Arciniegas, https://jahdiel-arciniegas.vercel.app/, https://www.linkedin.com/in/jahdiel-arciniegas-55714125b/
