class UserDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        this.addEventListener('user-greet', (e) => {
            const badge = this.querySelector('warning-badge');
            if (badge) {
                badge.textContent = `¡Hola ${e.detail.username}!`;
                badge.setAttribute('pulsing', '');
                
                // Remove pulse after 3 seconds
                setTimeout(() => {
                    badge.removeAttribute('pulsing');
                }, 3000);
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 24px;
                    background: #e5e7eb;
                    border-radius: 12px;
                    max-width: 400px;
                    margin: 0 auto;
                }
                .slots-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
            </style>
            <div class="slots-container">
                <slot name="top"></slot>
                <slot name="bottom"></slot>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('user-dashboard', UserDashboard);
export default UserDashboard;
