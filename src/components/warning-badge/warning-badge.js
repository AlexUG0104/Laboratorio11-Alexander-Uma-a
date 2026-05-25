class WarningBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['pulsing'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const isPulsing = this.hasAttribute('pulsing');
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #dc2626;
                    color: white;
                    border-radius: 12px;
                    font-family: 'Inter', sans-serif;
                    flex: 1;
                    min-height: 280px;
                    box-sizing: border-box;
                    box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.4);
                    padding: 24px;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    justify-content: space-between;
                }
                .icon-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-circle {
                    width: 56px;
                    height: 56px;
                    background: rgba(255, 255, 255, 0.25);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.8rem;
                    font-weight: 900;
                }
                .message {
                    font-weight: 800;
                    font-size: 1.1rem;
                    text-align: center;
                    padding-bottom: 8px;
                }
                .pulsing .icon-circle {
                    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.15); }
                }
            </style>
            <div class="container ${isPulsing ? 'pulsing' : ''}">
                <div class="icon-wrapper">
                    <div class="icon-circle">!</div>
                </div>
                <div class="message">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('warning-badge', WarningBadge);
export default WarningBadge;
