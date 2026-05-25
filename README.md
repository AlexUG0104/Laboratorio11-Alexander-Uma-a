# 🔧 Laboratorio 12: Pruebas Unitarias y Entornos Modernos en Web Components

**Autor:** Alexander Umaña  
**Fecha:** Mayo 2026  
**Asignatura:** Multimedios - Laboratorio de Web Components  

---

## 📌 Descripción del Proyecto

El **Laboratorio 12** marca la evolución de nuestro proyecto de Web Components nativos (Vanilla JavaScript) al integrarlo con herramientas modernas de construcción y pruebas (Testing). En los laboratorios anteriores logramos crear componentes aislados con Shadow DOM y comunicarlos mediante Custom Events. Ahora, el objetivo principal de este laboratorio es **asegurar la calidad y robustez del código mediante la implementación de un entorno de Pruebas Unitarias (Unit Testing)**.

Para lograr esto, hemos migrado la arquitectura de un servidor estático simple (`http-server`) a **Vite**, e implementado **Vitest** en conjunto con **JSDOM** y **Testing Library**. Esta combinación nos permite emular un navegador en la terminal y comprobar exhaustivamente que cada componente se renderiza correctamente, reacciona a los cambios de estado/atributos y emite los eventos esperados cuando el usuario interactúa.

---

## 📂 Estructura del Proyecto y Configuración

El proyecto ha sido restructurado para soportar el empaquetado y las pruebas:

```text
Laboratorio12-Alexander Umaña/
│
├── index.html                    # Punto de entrada de la aplicación
├── package.json                  # Registro de dependencias y scripts de npm
├── vite.config.js                # Configuración integral de Vite y Vitest
│
├── src/
│   ├── app.js                    # Inicializador e importación de componentes
│   │
│   ├── styles/
│   │   └── global.css            # Hoja de estilos principal
│   │
│   ├── components/               # Web Components Nativos
│   │   ├── user-dashboard/       # Contenedor padre que gestiona la comunicación
│   │   ├── user-card/            # Tarjeta de usuario con el botón emisor de eventos
│   │   ├── weather-time/         # Componente informativo de solo lectura
│   │   └── warning-badge/        # Componente reactivo con animaciones CSS
│   │
│   └── tests/                    # 🧪 Suites de Pruebas Unitarias
│       ├── user-dashboard.test.js
│       ├── user-card.test.js
│       ├── weather-time.test.js
│       └── warning-badge.test.js
│
└── README.md                     # Este archivo (Documentación principal)
```

---

## 🛠️ Stack Tecnológico Moderno

- **Web Components (Vanilla JS)**: Uso de Shadow DOM, Custom Elements y HTML Templates sin frameworks.
- **Vite**: Herramienta de empaquetado de nueva generación (Bundler) extremadamente rápida que provee el servidor de desarrollo local con Hot Module Replacement (HMR).
- **Vitest**: Framework de pruebas nativo para Vite. Aprovecha la misma configuración para ejecutar pruebas de forma casi instantánea.
- **JSDOM**: Un entorno Node.js que simula el DOM y APIs del navegador (necesario ya que Node.js por sí solo no entiende de HTML ni Shadow DOM).
- **DOM Testing Library**: Herramientas que fomentan la escritura de pruebas que imitan el comportamiento real de un usuario (buscando por roles y textos en lugar de selectores frágiles).

---

## 🧪 Estrategia de Pruebas (Qué estamos probando)

Cada Web Component tiene su propio archivo de pruebas para garantizar una alta cobertura:

1. **`user-card.test.js`**: Verifica que los atributos (`username`, `role`, `avatar`) se reflejen en el HTML renderizado. También simula un click en el botón "Saludar" usando `@testing-library/user-event` para asegurarse de que el `CustomEvent('user-greet')` sea emitido correctamente.
2. **`warning-badge.test.js`**: Comprueba que el componente reacciona adecuadamente al atributo dinámico `pulsing`, activando y desactivando la clase de animación en el momento correcto.
3. **`weather-time.test.js`**: Prueba que los datos estáticos inyectados vía atributos (`city`, `temperature`, `condition`) se muestren tal cual en la interfaz del usuario, garantizando la fidelidad de la presentación.
4. **`user-dashboard.test.js`**: (Prueba de Integración) Renderiza todos los componentes en conjunto y simula el flujo completo de comunicación: se presiona el botón en la tarjeta y se valida que el contenedor atrape el evento y modifique el estado visual del badge.

---

## 🚀 Guía de Uso y Ejecución

Sigue estos pasos para desplegar el proyecto localmente y ejecutar las pruebas:

### 1. Instalación de Dependencias
Asegúrate de tener **Node.js** instalado en tu computadora. Abre una terminal en la raíz de este proyecto y ejecuta:
```bash
npm install
```

### 2. Iniciar el Servidor de Desarrollo
Para levantar la aplicación en tu navegador con actualizaciones en tiempo real:
```bash
npm run dev
```
Accede a la dirección que se muestre en tu terminal, generalmente `http://localhost:5173`.

### 3. 🧪 Ejecutar las Pruebas Unitarias
Para correr todas las pruebas diseñadas con Vitest y visualizar el reporte:
```bash
npm run test
```
Esto mostrará en la terminal un resumen detallado indicando qué pruebas pasaron, el tiempo de ejecución y posibles errores a corregir.

### 4. Construcción para Producción (Opcional)
Si deseas minificar y compilar el proyecto para subirlo a un servidor real:
```bash
npm run build
```
Esto generará una carpeta `dist/` optimizada y lista para despliegue.

---

## 👨‍💻 Autor

**Alexander Umaña**  
*Laboratorio de Multimedios - Mayo 2026*
