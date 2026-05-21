

class UserCard extends HTMLElement {
  constructor() {
    super();
    
    // Attachar Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Estado interno (puede cambiar)
    this.state = {
      username: '',
      role: '',
      avatar: ''
    };
  }

  /**
   * Atributos que serán observados para cambios
   */
  static get observedAttributes() {
    return ['username', 'role', 'avatar'];
  }

  /**
   * Se ejecuta cuando el componente se inserta en el DOM
   */
  connectedCallback() {
    this.state.username = this.getAttribute('username') || '';
    this.state.role = this.getAttribute('role') || '';
    this.state.avatar = this.getAttribute('avatar') || '';
    this.render();
    this.attachEventListeners();
  }

  /**
   * Se ejecuta cuando un atributo observado cambia
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.state[name] = newValue;
      this.render();
    }
  }

  /**
   * Renderiza el contenido del componente
   */
  render() {
    const template = `
      <div part="card" class="card">
        <div class="card-content">
          <img 
            part="avatar" 
            class="avatar" 
            src="${this.state.avatar}" 
            alt="Avatar de ${this.state.username}"
          />
          
          <div class="info">
            <h2 part="username" class="username">${this.state.username || 'Usuario'}</h2>
            <p part="role" class="role">${this.state.role || 'Sin rol'}</p>
          </div>
        </div>

        <button part="button" class="btn-greet">Saludar</button>

        <!-- Slot opcional para acciones personalizadas -->
        <slot name="actions"></slot>
      </div>
    `;

    // Inyectar estilos
    const styles = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          color: white;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 250px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.5);
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .avatar:hover {
          transform: scale(1.1);
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .username {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .role {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }

        .btn-greet {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.9);
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .btn-greet:hover {
          background-color: white;
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-greet:active {
          transform: scale(0.98);
        }

        ::slotted([slot="actions"]) {
          margin-top: 8px;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = styles + template;

    // Re-attachear event listeners después de re-renderizar
    this.attachEventListeners();
  }

  /**
   * Attacha event listeners a elementos del Shadow DOM
   */
  attachEventListeners() {
    const btnGreet = this.shadowRoot.querySelector('.btn-greet');
    
    if (btnGreet) {
      btnGreet.addEventListener('click', () => this.handleGreet());
    }
  }

  /**
   * Manejador del botón Saludar
   * Dispara un CustomEvent que burbujea hacia el padre
   */
  handleGreet() {
    // Crear y disparar evento personalizado
    const event = new CustomEvent('user-greet', {
      detail: {
        username: this.state.username,
        role: this.state.role,
        timestamp: new Date().toLocaleTimeString()
      },
      bubbles: true,      // Permitir que burbujee hacia arriba
      composed: true      // Permitir que traspase Shadow DOM
    });

    this.dispatchEvent(event);
  }

  /**
   * Getters y setters para propiedades (opcional, para facilitar manipulación)
   */
  get username() {
    return this.getAttribute('username');
  }

  set username(value) {
    this.setAttribute('username', value);
  }

  get role() {
    return this.getAttribute('role');
  }

  set role(value) {
    this.setAttribute('role', value);
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  set avatar(value) {
    this.setAttribute('avatar', value);
  }
}

// Registrar el componente
customElements.define('user-card', UserCard);
