import { describe, test, expect, beforeEach } from 'vitest';
import { getByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '../components/user-card/user-card.js';

describe('user-card', () => {
    let element;

    beforeEach(() => {
        document.body.innerHTML = '';
        element = document.createElement('user-card');
        element.setAttribute('username', 'TestUser');
        element.setAttribute('role', 'Developer');
        element.setAttribute('avatar', 'test.jpg');
        document.body.appendChild(element);
    });

    test('renderiza username', () => {
        const title = element.shadowRoot.querySelector('h2');
        expect(title.textContent).toBe('TestUser');
    });

    test('renderiza role', () => {
        const role = element.shadowRoot.querySelector('p');
        expect(role.textContent).toBe('Developer');
    });

    test('renderiza avatar', () => {
        const img = element.shadowRoot.querySelector('img');
        expect(img.getAttribute('src')).toBe('test.jpg');
    });

    test('botón existe', () => {
        const btn = element.shadowRoot.querySelector('button');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toBe('Saludar');
    });

    test('dispatchEvent funciona y emite user-greet', async () => {
        const user = userEvent.setup();
        const btn = element.shadowRoot.querySelector('button');
        
        let eventFired = false;
        let eventDetail = null;
        let eventBubbles = false;
        let eventComposed = false;

        document.body.addEventListener('user-greet', (e) => {
            eventFired = true;
            eventDetail = e.detail;
            eventBubbles = e.bubbles;
            eventComposed = e.composed;
        });

        await user.click(btn);

        expect(eventFired).toBe(true);
        expect(eventDetail.username).toBe('TestUser');
        expect(eventBubbles).toBe(true);
        expect(eventComposed).toBe(true);
    });

    test('atributos reactivos actualizan render', () => {
        element.setAttribute('username', 'NewUser');
        const title = element.shadowRoot.querySelector('h2');
        expect(title.textContent).toBe('NewUser');
    });
});
