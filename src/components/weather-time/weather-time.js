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
                    justify-content: space-between;
                    background: white;
                    border-radius: 12px;
                    padding: 24px;
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    font-family: 'Inter', sans-serif;
                    flex: 1;
                    min-height: 280px;
                    box-sizing: border-box;
                    position: relative;
                    overflow: hidden;
                }
                .circle-bg {
                    position: absolute;
                    top: -30px;
                    right: -30px;
                    width: 120px;
                    height: 120px;
                    background: #fef08a; /* amarillo pálido */
                    border-radius: 50%;
                    opacity: 0.5;
                }
                .header {
                    z-index: 1;
                }
                .header-title {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #64748b;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }
                .city {
                    font-weight: 900;
                    font-size: 1.4rem;
                    color: #1e293b;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    z-index: 1;
                    width: 100%;
                }
                .temperature {
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: #0ea5e9;
                    line-height: 1;
                }
                .condition-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 8px;
                }
                .condition-badge {
                    background: #fef08a;
                    color: #ca8a04;
                    font-size: 0.7rem;
                    font-weight: 800;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                .condition-text {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #475569;
                }
            </style>
            <div class="circle-bg"></div>
            <div class="header">
                <div class="header-title">Clima Actual</div>
                <div class="city">${city}</div>
            </div>
            <div class="footer">
                <div class="temperature">${temperature}</div>
                <div class="condition-wrapper">
                    <div class="condition-badge">NUB</div>
                    <div class="condition-text">${condition}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('weather-time', WeatherTime);
export default WeatherTime;
