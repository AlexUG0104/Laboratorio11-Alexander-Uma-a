

class WeatherTime extends HTMLElement {
  constructor() {
    super();
    
    // Attachar Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Estado interno
    this.state = {
      city: '',
      temperature: '',
      condition: ''
    };
  }

  /**
   * Atributos observados
   */
  static get observedAttributes() {
    return ['city', 'temperature', 'condition'];
  }

  /**
   * Se ejecuta cuando el componente se inserta en el DOM
   */
  connectedCallback() {
    // Sincronizar estado con atributos
    this.state.city = this.getAttribute('city') || '';
    this.state.temperature = this.getAttribute('temperature') || '';
    this.state.condition = this.getAttribute('condition') || '';
    
    this.render();
  }

  /**
   * Reacciona a cambios en atributos observados
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.state[name] = newValue;
      this.render();
    }
  }

  /**
   * Obtiene un emoji según la condición del clima
   */
  getWeatherEmoji(condition) {
    const conditions = {
      'sunny': '☀️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'stormy': '⛈️',
      'windy': '💨',
      'foggy': '🌫️'
    };

    const normalizedCondition = condition.toLowerCase();
    return conditions[normalizedCondition] || '🌍';
  }

  /**
   * Renderiza el contenido del componente
   */
  render() {
    const weatherEmoji = this.getWeatherEmoji(this.state.condition);

    const template = `
      <div part="weather-card" class="weather-card">
        <div class="header">
          <h3 part="city" class="city">${this.state.city || 'Ciudad'}</h3>
          <span class="emoji">${weatherEmoji}</span>
        </div>

        <div class="weather-info">
          <div part="temperature" class="temperature">
            <span class="value">${this.state.temperature || '--'}</span>
          </div>
          
          <p part="condition" class="condition">${this.state.condition || 'Sin datos'}</p>
        </div>

        <div class="time">
          <span id="time-display"></span>
        </div>
      </div>
    `;

    const styles = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .weather-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          color: white;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 250px;
          transition: transform 0.3s ease;
        }

        .weather-card:hover {
          transform: translateY(-5px);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .city {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          flex: 1;
        }

        .emoji {
          font-size: 40px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .weather-info {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .temperature {
          font-size: 32px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .value {
          display: block;
        }

        .condition {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.95;
          text-transform: capitalize;
        }

        .time {
          padding-top: 12px;
          border-top: 2px solid rgba(255, 255, 255, 0.3);
          font-size: 14px;
          text-align: center;
          opacity: 0.9;
          font-weight: 600;
        }

        #time-display {
          font-family: 'Courier New', monospace;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = styles + template;

    // Actualizar la hora cada segundo
    this.updateTime();
  }

  /**
   * Actualiza la hora mostrada
   */
  updateTime() {
    const timeDisplay = this.shadowRoot.querySelector('#time-display');
    
    if (timeDisplay) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('es-ES');
      timeDisplay.textContent = timeString;

      // Actualizar cada segundo
      this.timeInterval = setTimeout(() => {
        this.updateTime();
      }, 1000);
    }
  }

  /**
   * Limpieza al remover el componente
   */
  disconnectedCallback() {
    if (this.timeInterval) {
      clearTimeout(this.timeInterval);
    }
  }

  /**
   * Getters y setters para propiedades
   */
  get city() {
    return this.getAttribute('city');
  }

  set city(value) {
    this.setAttribute('city', value);
  }

  get temperature() {
    return this.getAttribute('temperature');
  }

  set temperature(value) {
    this.setAttribute('temperature', value);
  }

  get condition() {
    return this.getAttribute('condition');
  }

  set condition(value) {
    this.setAttribute('condition', value);
  }
}

// Registrar el componente
customElements.define('weather-time', WeatherTime);
