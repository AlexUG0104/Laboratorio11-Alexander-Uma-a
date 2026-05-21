# 🔧 Laboratorio 11: Web Components con Comunicación entre Componentes

**Autor:** Alexander Umaña  
**Fecha:** Mayo 2026  
**Asignatura:** Multimedios - Laboratorio de Web Components  

---
## Estructura del Proyecto

```
Laboratorio11-Alexander Umaña/
│
├── index.html                    # Punto de entrada
│
├── src/
│   ├── app.js                   # Inicializador de la aplicación
│   │
│   ├── styles/
│   │   └── global.css           # Estilos globales
│   │
│   └── components/
│       ├── user-dashboard/      # Componente contenedor padre
│       │   ├── user-dashboard.js
│       │   ├── user-dashboard.css
│       │   └── user-dashboard.html
│       │
│       ├── user-card/           # Tarjeta de usuario con botón
│       │   ├── user-card.js
│       │   ├── user-card.css
│       │   └── user-card.html
│       │
│       ├── weather-time/        # Información climática
│       │   ├── weather-time.js
│       │   ├── weather-time.css
│       │   └── weather-time.html
│       │
│       └── warning-badge/       # Badge de advertencia con animación
│           ├── warning-badge.js
│           ├── warning-badge.css
│           └── warning-badge.html
│
└── README.md                     # Este archivo

```

---

##  Cómo Ejecutar

### Opció Usar un servidor local simple


# Con Node.js/npm
npx http-server

Luego acceder a `http://localhost:8000`
---

**Animaciones:**
- `:host([pulsing])` activa glow y pulso
- Icono con bounce y spin
- Variables CSS personalizables

---

##  Flujo de Comunicación

```
┌─────────────────────────────────────────┐
│     user-dashboard (Contenedor)         │
│  Escucha: 'user-greet'                  │
│  Modifica: warning-badge                │
└─────────────────────────────────────────┘
          ▲          │          ▼
          │          │          │
     Recibe    Emite  │    Modifica
      evento    evento │    atributos
          │          │          │
    ┌─────────┐      │    ┌──────────────┐
    │user-card│      │    │warning-badge │
    │"Saludar"│      │    │ [pulsing]    │
    └─────────┘      │    └──────────────┘
                     │
           ┌─────────────────┐
           │ weather-time    │
           │ (No interactúa) │
           └─────────────────┘
```

---

##  Secuencia de Eventos

1. **Usuario presiona "Saludar"** en user-card
2. **user-card dispara** `CustomEvent('user-greet', {...})`
3. **user-dashboard escucha** el evento (bubbles + composed)
4. **user-dashboard busca** warning-badge en el DOM
5. **user-dashboard activa** `pulsing` en warning-badge
6. **warning-badge cambia** mensaje dinámicamente
7. **Animación** se ejecuta por 3 segundos
8. **warning-badge desactiva** automáticamente

---

##  Autor

**Alexander Umaña**  
Laboratorio de Multimedios - 2026

---
