# DmcoffersClient

Este proyecto fue generado con Angular. Para correrlo hay que usar el comando `ng serve` en un terminal, y navegar a `http://localhost:4200/`.

Además de correr `npm run start` en el backend para la traer los datos de la bdd.

## Proof of concept

`npm i -D @angular-builders/custom-webpack@16` (version 16 porque la mas nueva da problemas con nuestro angular que no es el mas nuevo)

Crear el archivo `webpack.config.js`

Completar la config con plugins a utilizar

Modificar `angular.json` con el nuevo builder

```
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    ...
  }
}
```

a

```
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "./webpack.config.js"
      },
      ...
    }
  }
}
```

Realizamos los mismos cambios para la configuración de serve para que custom webpack se aplique también durante el desarrollo:

```
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    ...
  },
  "serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    ...
  }
}
```
