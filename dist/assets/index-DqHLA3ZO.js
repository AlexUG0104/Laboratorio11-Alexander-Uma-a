(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["username","role","avatar"]}connectedCallback(){this.render(),this.addEventListeners()}attributeChangedCallback(){this.render()}addEventListeners(){const e=this.shadowRoot.querySelector("button");e&&e.addEventListener("click",()=>{const s=new CustomEvent("user-greet",{bubbles:!0,composed:!0,detail:{username:this.getAttribute("username")||"Usuario"}});this.dispatchEvent(s)})}render(){const e=this.getAttribute("username")||"Unknown",s=this.getAttribute("role")||"Guest",n=this.getAttribute("avatar")||"";this.shadowRoot.innerHTML=`
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
            <img src="${n}" alt="Avatar de ${e}">
            <h2>${e}</h2>
            <p>${s}</p>
            <button>Saludar</button>
        `,this.addEventListeners()}}customElements.define("user-card",a);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["pulsing"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.hasAttribute("pulsing");this.shadowRoot.innerHTML=`
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
            <div class="${e?"pulsing":""}">
                <slot></slot>
            </div>
        `}}customElements.define("warning-badge",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["city","temperature","condition"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("city")||"Unknown",s=this.getAttribute("temperature")||"--",n=this.getAttribute("condition")||"Unknown";this.shadowRoot.innerHTML=`
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
            <div class="city">${e}</div>
            <div class="temp-cond">
                <span class="temp">${s}</span>
                <span>•</span>
                <span class="cond">${n}</span>
            </div>
        `}}customElements.define("weather-time",c);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.addEventListeners()}addEventListeners(){this.addEventListener("user-greet",e=>{const s=this.querySelector("warning-badge");s&&(s.textContent=`¡Hola ${e.detail.username}!`,s.setAttribute("pulsing",""),setTimeout(()=>{s.removeAttribute("pulsing")},3e3))})}render(){this.shadowRoot.innerHTML=`
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
        `}}customElements.define("user-dashboard",l);
