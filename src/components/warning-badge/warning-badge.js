

class WarningBadge extends HTMLElement {
  constructor() {
    super();
    
    // Attachar Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Estado interno
    this.state = {
      pulsing: false,
      message: 'Advertencia'
    };
  }

  /**
   * Atributos observados
   */
  static get observedAttributes() {
    return ['pulsing'];
  }

  /**
   * Se ejecuta cuando el componente se inserta en el DOM
   */
  connectedCallback() {
    // Sincronizar estado
    this.state.pulsing = this.hasAttribute('pulsing');
    
    this.render();
  }

  /**
   * Reacciona a cambios en atributos
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pulsing') {
      // Si newValue es null, el atributo fue removido
      this.state.pulsing = newValue !== null;
      this.render();
    }
  }

  /**
   * Renderiza el contenido
   */
  render() {
    const template = `
      <div part="badge" class="badge ${this.state.pulsing ? 'pulsing' : ''}">
        <span class="warning-icon">⚠️</span>
        <div part="text" class="text">
          <slot>Sesión por expirar</slot>
        </div>
      </div>
    `;

    const styles = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          --warning-color: #ff6b6b;
          --warning-glow: rgba(255, 107, 107, 0.5);
          --pulse-duration: 1.5s;
        }

        :host([pulsing]) {
          --warning-color: #ff4757;
          --warning-glow: rgba(255, 71, 87, 0.8);
        }

        .badge {
          background: linear-gradient(135deg, #ffa502 0%, #ff6b6b 100%);
          border-radius: 12px;
          padding: 16px 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .badge.pulsing {
          animation: pulse-glow var(--pulse-duration) ease-in-out infinite;
          box-shadow: 
            0 0 0 0 var(--warning-glow),
            0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .warning-icon {
          font-size: 24px;
          animation: bounce 0.6s ease-in-out infinite;
        }

        .badge.pulsing .warning-icon {
          animation: bounce 0.6s ease-in-out infinite, 
                     spin 2s linear infinite;
        }

        .text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          font-size: 15px;
        }

        /* Animación de pulso y glow */
        @keyframes pulse-glow {
          0% {
            box-shadow: 
              0 0 0 0 var(--warning-glow),
              0 8px 24px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 
              0 0 0 12px rgba(255, 107, 107, 0),
              0 8px 24px rgba(0, 0, 0, 0.3);
          }
          100% {
            box-shadow: 
              0 0 0 0 rgba(255, 107, 107, 0),
              0 8px 24px rgba(0, 0, 0, 0.2);
          }
        }

        /* Animación de bounce para el icono */
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Animación de spin */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Efecto de brillo */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        /* Estados visuales */
        ::slotted(*) {
          margin: 0;
          font-size: inherit;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = styles + template;
  }

  /**
   * Método público para activar el pulsing
   */
  activate() {
    this.setAttribute('pulsing', '');
  }

  /**
   * Método público para desactivar el pulsing
   */
  deactivate() {
    this.removeAttribute('pulsing');
  }

  /**
   * Alterna el estado de pulsing
   */
  toggle() {
    if (this.state.pulsing) {
      this.deactivate();
    } else {
      this.activate();
    }
  }
}

// Registrar el componente
customElements.define('warning-badge', WarningBadge);
