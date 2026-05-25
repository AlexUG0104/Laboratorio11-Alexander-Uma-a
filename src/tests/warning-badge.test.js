import { describe, test, expect, beforeEach } from 'vitest';
import '../components/warning-badge/warning-badge.js';

describe('warning-badge', () => {
    let element;

    beforeEach(() => {
        document.body.innerHTML = '';
        element = document.createElement('warning-badge');
        element.textContent = 'Mensaje de alerta';
        document.body.appendChild(element);
    });

    test('shadowRoot existe', () => {
        expect(element.shadowRoot).not.toBeNull();
    });

    test('renderiza slot/texto', () => {
        const slot = element.shadowRoot.querySelector('slot');
        expect(slot).not.toBeNull();
        expect(element.textContent).toBe('Mensaje de alerta');
    });

    test('atributo pulsing existe y activa clase/estado visual', () => {
        element.setAttribute('pulsing', '');
        const div = element.shadowRoot.querySelector('div');
        expect(div.classList.contains('pulsing')).toBe(true);
    });

    test('reactividad del atributo pulsing', () => {
        expect(element.shadowRoot.querySelector('div').classList.contains('pulsing')).toBe(false);

        element.setAttribute('pulsing', '');
        expect(element.shadowRoot.querySelector('div').classList.contains('pulsing')).toBe(true);

        element.removeAttribute('pulsing');
        expect(element.shadowRoot.querySelector('div').classList.contains('pulsing')).toBe(false);
    });
});
