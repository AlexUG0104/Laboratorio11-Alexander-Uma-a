

// Importar todos los componentes
import './components/user-dashboard/user-dashboard.js';
import './components/user-card/user-card.js';
import './components/weather-time/weather-time.js';
import './components/warning-badge/warning-badge.js';

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log(' Aplicación de Web Components inicializada');
  console.log(' Componentes registrados:');
  console.log('  - user-dashboard');
  console.log('  - user-card');
  console.log('  - weather-time');
  console.log('  - warning-badge');

  // Obtener referencia al dashboard
  const dashboard = document.querySelector('user-dashboard');
  
  if (dashboard) {
    console.log('Dashboard encontrado en el DOM');
    
    // Opcionalmente: log cuando se reciben eventos
    dashboard.addEventListener('user-greet', (event) => {
      console.log('Evento user-greet recibido:', event.detail);
    });
  } else {
    console.warn('Dashboard no encontrado en el DOM');
  }
});

// Exportar para uso en consola o módulos externos (opcional)
// Nota: los componentes se importan y registran mediante ES modules.

