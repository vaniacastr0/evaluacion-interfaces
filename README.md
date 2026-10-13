# Linde · Interfaces locales

Cuatro interfaces independientes, hechas con HTML, CSS y JavaScript. Todos los datos y operaciones son ficticios. No hay backend, autenticación, cobros ni llamadas a servicios externos.

## Abrir

1. Extrae el archivo ZIP completo.
2. Abre `index.html` con Microsoft Edge o Google Chrome de escritorio.
3. Selecciona un espacio. También puedes abrir directamente el `index.html` de cualquiera de las cuatro carpetas.

Cada carpeta contiene todos sus recursos y se puede copiar de forma independiente. No se requiere instalación ni conexión a Internet.

Como alternativa, si tienes Node.js instalado, desde esta carpeta ejecuta:

```sh
node servidor.cjs
```

Abre `http://127.0.0.1:4173`. Para detener el servidor, pulsa `Ctrl+C` en la terminal. También puedes usar cualquier servidor estático local con esta carpeta como raíz.

## Archivos

```text
index.html
README.md
servidor.cjs
interfaces/
  registro/
    index.html
    style.css
    app.js
  compra/
    index.html
    style.css
    app.js
    alba.svg
  reserva/
    index.html
    style.css
    app.js
  configuracion/
    index.html
    style.css
    app.js
```

- Registro: datos personales, creación de cuenta y confirmación.
- Compra: catálogo, producto, carrito, pago ficticio y confirmación.
- Reserva: servicio, fecha y horario, resumen y confirmación.
- Configuración: preferencias, guardado y navegación al resumen de cuenta.

## Entorno de ejecución

- Resolución recomendada: área de contenido de 1440 × 900 px, zoom del navegador al 100 %.
- Navegador recomendado: Microsoft Edge o Google Chrome de escritorio, manteniendo la misma versión durante todas las sesiones.
- JavaScript habilitado; almacenamiento de sesión disponible para configuración.
- Usa únicamente información ficticia. Los datos de pago de ejemplo aparecen en la pantalla correspondiente.
- La agenda usa un calendario fijo de octubre de 2026; no depende de la fecha del equipo.

## Volver al estado inicial

- Registro, compra y reserva: recarga su página. No conservan datos al recargar.
- Configuración: abre `interfaces/configuracion/index.html?inicio=1`. Si usas servidor, abre `http://127.0.0.1:4173/interfaces/configuracion/index.html?inicio=1`. Esto restablece únicamente las preferencias de esta interfaz y abre su pantalla inicial. La dirección se normaliza después de cargar.
- Las preferencias guardadas se conservan al navegar o recargar dentro de la misma pestaña. El mecanismo utilizado es `sessionStorage`. Para un reinicio controlado utiliza siempre el enlace con `?inicio=1`.
- Mantén el mismo modo de apertura (archivo directo o servidor) durante una sesión. Sus almacenamientos son independientes.

## Dependencias y edición

Sin dependencias externas: fuentes del sistema, estilos locales e ilustración SVG local. Node.js es opcional y solo se usa si eliges el servidor incluido. No se necesita gestor de paquetes ni compilación.

Cada caso tiene su propio CSS y JavaScript. Modifica esos archivos y recarga la página. No hay archivos compartidos necesarios para ejecutar una carpeta por separado.
