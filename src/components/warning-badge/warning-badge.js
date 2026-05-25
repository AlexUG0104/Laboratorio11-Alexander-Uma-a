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
                    display: inline-block;
                    background-color: #fca5a5;
                    color: #991b1b;
                    padding: 4px 12px;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    font-family: sans-serif;
                }
                .pulsing {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
            </style>
            <div class="${isPulsing ? 'pulsing' : ''}">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('warning-badge', WarningBadge);
export default WarningBadge;
