class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['username', 'role', 'avatar'];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    addEventListeners() {
        const button = this.shadowRoot.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                const event = new CustomEvent('user-greet', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        username: this.getAttribute('username') || 'Usuario'
                    }
                });
                this.dispatchEvent(event);
            });
        }
    }

    render() {
        const username = this.getAttribute('username') || 'Unknown';
        const role = this.getAttribute('role') || 'Guest';
        const avatar = this.getAttribute('avatar') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border-radius: 12px;
                    padding: 32px 16px;
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    font-family: 'Inter', sans-serif;
                    flex: 1;
                    min-height: 280px;
                    box-sizing: border-box;
                }
                .avatar-container {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    border: 3px solid #fbbf24;
                    padding: 4px;
                    margin-bottom: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
                h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: #1e293b;
                    font-weight: 800;
                }
                p {
                    margin: 4px 0 24px 0;
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                button {
                    background-color: #0ea5e9;
                    color: white;
                    border: none;
                    padding: 10px 28px;
                    border-radius: 9999px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                button:hover {
                    background-color: #0284c7;
                    transform: scale(1.05);
                }
            </style>
            <div class="avatar-container">
                <img src="${avatar}" alt="Avatar de ${username}">
            </div>
            <h2>${username}</h2>
            <p>${role}</p>
            <button>Saludar</button>
        `;
        
        // Re-attach listeners after render
        this.addEventListeners();
    }
}

customElements.define('user-card', UserCard);
export default UserCard;
