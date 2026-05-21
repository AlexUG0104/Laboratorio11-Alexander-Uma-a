

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    
    // Attachar Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Estado del dashboard
    this.state = {
      greetCount: 0,
      lastGreetedUser: null,
      isSessionActive: false
    };

    // Mensajes dinámicos según el estado
    this.messages = {
      greeting: (username) => `¡Hola ${username}! 👋`,
      active: () => 'Sesión activa ✅',
      warning: () => 'Sesión por expirar ⚠️'
    };
  }

  /**
   * Se ejecuta cuando el componente se inserta en el DOM
   */
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  /**
   * Renderiza la estructura del dashboard
   */
  render() {
    const template = `
      <div part="container" class="dashboard-container">
        <div part="header" class="header">
          <h1>Panel de Control</h1>
          <p class="subtitle">Web Components Lab - Comunicación entre componentes</p>
        </div>

        <div part="content" class="content-grid">
          <div class="grid-top">
            <slot name="top"></slot>
          </div>

          <div class="grid-bottom">
            <slot name="bottom"></slot>
          </div>
        </div>
      </div>
    `;

    const styles = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0f7fa 0%, #f0f4ff 100%);
          min-height: 100vh;
          padding: 40px 20px;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
          padding-bottom: 24px;
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
        }

        .header h1 {
          margin: 0;
          font-size: 32px;
          color: #333;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          margin: 12px 0 0 0;
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }

        .grid-top {
          display: grid;
          grid-template-columns: repeat(2, minmax(280px, 1fr));
          gap: 32px;
          align-items: start;
        }

        .grid-bottom {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        ::slotted(user-card),
        ::slotted(weather-time) {
          width: 100%;
          max-width: 100%;
        }

        ::slotted(warning-badge) {
          width: fit-content;
        }

        @media (max-width: 900px) {
          .grid-top {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 24px;
          }

          .header h1 {
            font-size: 24px;
          }
        }
      </style>
    `;

    this.shadowRoot.innerHTML = styles + template;
  }

  /**
   * Attacha event listeners al dashboard
   */
  attachEventListeners() {
    // Escuchar eventos emitidos por user-card que burbujean a través del DOM
    this.addEventListener('user-greet', (event) => {
      this.handleUserGreet(event);
    });

    // Opcionalmente: escuchar eventos del light DOM también
    this.addEventListener('user-greet', (event) => {
      console.log('Evento recibido en dashboard:', event.detail);
    });
  }

  /**
   * Manejador del evento user-greet emitido por user-card
   */
  handleUserGreet(event) {
    const { username, role, timestamp } = event.detail;

    // Actualizar estado del dashboard
    this.state.greetCount++;
    this.state.lastGreetedUser = username;
    this.state.isSessionActive = true;

    console.log(`✅ Usuario ${username} saludó a las ${timestamp}`);

    // Buscar el componente warning-badge en el light DOM
    const warningBadge = this.querySelector('warning-badge');

    if (warningBadge) {
      // Activar pulsing
      warningBadge.activate();

      // Cambiar el mensaje dinámicamente
      const message = this.messages.greeting(username);
      
      // Actualizar el contenido del slot del warning-badge
      warningBadge.textContent = message;

      // Después de 3 segundos, cambiar el mensaje a "Sesión activa"
      setTimeout(() => {
        warningBadge.textContent = this.messages.active();
        warningBadge.deactivate();
      }, 3000);
    }

    // Logging del estado actual
    console.log(`Saludos totales: ${this.state.greetCount}`);
    console.log(`Último usuario: ${this.state.lastGreetedUser}`);
  }

  /**
   * Método público para actualizar el estado del dashboard
   */
  updateDashboardStatus(isActive) {
    this.state.isSessionActive = isActive;
    const warningBadge = this.querySelector('warning-badge');
    
    if (warningBadge) {
      if (isActive) {
        warningBadge.deactivate();
        warningBadge.textContent = this.messages.active();
      } else {
        warningBadge.activate();
        warningBadge.textContent = this.messages.warning();
      }
    }
  }

  /**
   * Obtener información del estado del dashboard
   */
  getStatus() {
    return {
      greetCount: this.state.greetCount,
      lastGreetedUser: this.state.lastGreetedUser,
      isSessionActive: this.state.isSessionActive
    };
  }
}

// Registrar el componente
customElements.define('user-dashboard', UserDashboard);
