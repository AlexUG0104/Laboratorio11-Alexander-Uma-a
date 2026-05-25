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
                    gap: 24px;
                    padding: 40px;
                    width: 100%;
                    max-width: 1000px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 0 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    color: #1a202c;
                }
                .status-badge {
                    background: #dcfce7;
                    color: #166534;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .status-badge::before {
                    content: '';
                    display: block;
                    width: 8px;
                    height: 8px;
                    background: #16a34a;
                    border-radius: 50%;
                }
                .cards-container {
                    display: flex;
                    flex-direction: row;
                    gap: 24px;
                    justify-content: center;
                    align-items: stretch;
                }
            </style>
            <div class="header">
                <h1>Panel de Usuario</h1>
                <div class="status-badge">Sesión activa</div>
            </div>
            <div class="cards-container">
                <slot name="top"></slot>
                <slot></slot>
                <slot name="bottom"></slot>
            </div>
        `;
    }
}

customElements.define('user-dashboard', UserDashboard);
export default UserDashboard;
