# 🔧 Laboratorio 12: Entorno de Pruebas con Vite y Vitest para Web Components

**Autor:** Alexander Umaña  
**Fecha:** Mayo 2026  
**Asignatura:** Multimedios - Laboratorio de Web Components  

---

## 📌 Descripción del Proyecto

Este laboratorio se centra en la configuración de un entorno de desarrollo robusto y la implementación de pruebas unitarias para Web Components (Vanilla JavaScript). Se ha migrado el proyecto anterior a **Vite** para la construcción y servidor de desarrollo, y se ha integrado **Vitest** junto con **Testing Library** y **JSDOM** para asegurar la calidad de los componentes.

---

## 📂 Estructura del Proyecto

```text
Laboratorio12-Alexander Umaña/
│
├── index.html                    # Punto de entrada
├── package.json                  # Dependencias y scripts
├── vite.config.js                # Configuración de Vite y Vitest
│
├── src/
│   ├── app.js                    # Inicializador de la aplicación
│   │
│   ├── styles/
│   │   └── global.css            # Estilos globales
│   │
│   ├── components/               # Web Components
│   │   ├── user-dashboard/       
│   │   ├── user-card/           
│   │   ├── weather-time/        
│   │   └── warning-badge/       
│   │
│   └── tests/                    # Pruebas Unitarias
│       ├── user-dashboard.test.js
│       ├── user-card.test.js
│       ├── weather-time.test.js
│       └── warning-badge.test.js
│
└── README.md                     # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5, CSS3, JavaScript (ES6+)**: Web Components puros (Shadow DOM, Custom Elements, Templates).
- **Vite**: Herramienta de frontend rápida para el servidor de desarrollo y el empaquetado.
- **Vitest**: Framework de pruebas unitarias ultrarrápido impulsado por Vite.
- **JSDOM**: Implementación de DOM en Node.js para emular el navegador en las pruebas.
- **Testing Library (@testing-library/dom)**: Herramientas para probar el DOM enfocándose en las mejores prácticas (consultas accesibles, simulación de eventos del usuario).

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalación de dependencias

Asegúrate de tener Node.js instalado. Abre la terminal en la raíz del proyecto y ejecuta:

```bash
npm install
```

### 2. Servidor de Desarrollo

Para levantar el servidor local de Vite con Hot Module Replacement (HMR):

```bash
npm run dev
```

Luego accede a la URL que indica la terminal (usualmente `http://localhost:5173`).

---

## 🧪 Cómo Ejecutar las Pruebas

Para correr el suite de pruebas (Vitest) y verificar el correcto funcionamiento de los Web Components:

```bash
npm run test
```

Esto ejecutará las pruebas en `src/tests/` para verificar:
- Renderizado correcto del Shadow DOM.
- Eventos personalizados (`user-greet`).
- Interacciones del usuario (clics, etc.).
- Comportamiento reactivo de los atributos.

---

## 📖 Comunicación entre Componentes (Flujo)

Aunque se agregaron pruebas, la aplicación mantiene su flujo de eventos original:
- `user-card` emite el evento `user-greet`.
- `user-dashboard` escucha el evento y reacciona modificando `warning-badge`.
- `warning-badge` activa su animación.

---

## 👨‍💻 Autor

**Alexander Umaña**  
Laboratorio de Multimedios - 2026
