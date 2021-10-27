# project4

This project aims to create an application with login and crud of products.

## Frontend - Client

### Features

- Management state with Redux, Redux Toolkit
- Login and Sign In with Google
- Products Crud 


### Instalación

Utilice el gestor de paquetes [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) para instalar los paquetes.

```bash
npm install
```

### Ejecución

```bash
npm run start
```

## Backend - Server

### Features

- JWT Authentication
- Sign In with Google
- Products Crud Endpoints 
- Users Crud Endpoints

### Instalación

Utilice el gestor de paquetes [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) para instalar los paquetes.

```bash
npm install
```

### Env Variables

Create a .env.development (or .production with NOVE_ENV=production in npm run start) file in then root and add the following

```bash
PORT=7000
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASS=
MONGODB_DATABASE=project4
JWT_SECRETKEY=zxcvb098765
GOOGLE_CLIENT_ID=your google client id
GOOGLE_SECRET_ID=your google secret id
CLOUDINARY_URL=your cloudinary url
CLOUDINARY_NAME=your cloudinary name
CLOUDINARY_API_KEY=your cloudinary api key
CLOUDINARY_API_SECRET=your cloudinary api secret
```

### Ejecución

For Development
```bash
npm run dev
```

For Production
```bash
npm run start
```
