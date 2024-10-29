# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.

```console
npm install --legacy-peer-deps
```

## Clean Project
Es posible eliminar el archivo `package-lock.json` y limpiar la caché para volver a descargar todos los paquetes. Aquí tienes los pasos para hacerlo:

1. **Eliminar `node_modules` y `package-lock.json`**:
   ```bash
   rm -rf node_modules package-lock.json
   ```

    En la termina de Visual Code con PS:

    ```console
    Remove-Item -Recurse -Force node_modules
    Remove-Item package-lock.json
    ```

2. **Limpiar la caché de npm**:
   ```bash
   npm cache clean --force
   ```

3. **Reinstalar las dependencias**:
   ```bash
   npm install
   ```

Estos comandos eliminarán el directorio `node_modules` y el archivo `package-lock.json`, limpiarán la caché de npm y volverán a instalar todas las dependencias desde cero. Esto puede ayudar a resolver problemas relacionados con dependencias corruptas o conflictos en las versiones de los paquetes.

## Project Configuration
### Environment Variables
Utilice el [.env.example](./resources/.env.example) como ejemplo para crear y configurar su propio **.env** en la raiz del proyecto.
### Database Schema
Ejecute el script [ddl.sql](./resources/ddl.sql) para definir la estructura de la base de datos. Luego, puede ejectuar el script [dml.sql](./resources/dml.sql) para insertar los datos iniciales.
### User Admin
Al ejecutar el proyecto en su ambiente de desarrollo se autoconfigurara el usuario administrador con el password que proporciono sin encriptar en la variable de entorno **ADMIN_PASSWORD** del **.env**.  Ademas, recuerde que tambien debe configurar las variables de conexion a la base de datos en MySQL: **DB_USER**, **DB_PASSWORD**, **DB_PORT**.
### Email Server
Debe configurar una cuenta y autorizar su cuenta de correo electronico en SendGrid para luego obtener la clave de API y configurarla en la variable de entorno **EMAIL_APIKEY** como su cuenta **EMAIL_SENDER**.
