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
                    display: block;
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    text-align: center;
                    font-family: sans-serif;
                }
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 12px;
                }
                h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: #333;
                }
                p {
                    margin: 4px 0 16px 0;
                    color: #666;
                    font-size: 0.9rem;
                }
                button {
                    background-color: #667eea;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.2s;
                }
                button:hover {
                    background-color: #5a6fe0;
                }
            </style>
            <img src="${avatar}" alt="Avatar de ${username}">
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
