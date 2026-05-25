class WeatherTime extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['city', 'temperature', 'condition'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const city = this.getAttribute('city') || 'Unknown';
        const temperature = this.getAttribute('temperature') || '--';
        const condition = this.getAttribute('condition') || 'Unknown';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #f3f4f6;
                    padding: 16px;
                    border-radius: 8px;
                    font-family: sans-serif;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .city {
                    font-weight: bold;
                    font-size: 1.1rem;
                    color: #1f2937;
                    margin-bottom: 4px;
                }
                .temp-cond {
                    display: flex;
                    gap: 8px;
                    color: #4b5563;
                }
            </style>
            <div class="city">${city}</div>
            <div class="temp-cond">
                <span class="temp">${temperature}</span>
                <span>•</span>
                <span class="cond">${condition}</span>
            </div>
        `;
    }
}

customElements.define('weather-time', WeatherTime);
export default WeatherTime;
