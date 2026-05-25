import { describe, test, expect, beforeEach, vi } from 'vitest';
import '../components/user-dashboard/user-dashboard.js';
import '../components/user-card/user-card.js';
import '../components/warning-badge/warning-badge.js';

describe('user-dashboard', () => {
    let dashboard;
    let card;
    let badge;

    beforeEach(() => {
        document.body.innerHTML = `
            <user-dashboard>
                <user-card slot="top" username="TestUser" role="Dev"></user-card>
                <warning-badge slot="bottom">Default</warning-badge>
            </user-dashboard>
        `;
        dashboard = document.querySelector('user-dashboard');
        card = document.querySelector('user-card');
        badge = document.querySelector('warning-badge');
        
        // Use fake timers to test setTimeout
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('captura evento user-greet y escucha correctamente eventos hijos', () => {
        const event = new CustomEvent('user-greet', {
            bubbles: true,
            composed: true,
            detail: { username: 'TestUser' }
        });
        
        card.dispatchEvent(event);
        
        expect(badge.textContent).toBe('¡Hola TestUser!');
    });

    test('actualiza warning-badge y activa atributo pulsing', () => {
        const event = new CustomEvent('user-greet', {
            bubbles: true,
            composed: true,
            detail: { username: 'TestUser' }
        });
        
        card.dispatchEvent(event);
        
        expect(badge.hasAttribute('pulsing')).toBe(true);
    });

    test('cambia mensaje dinámicamente y quita pulsing después de 3s', () => {
        const event = new CustomEvent('user-greet', {
            bubbles: true,
            composed: true,
            detail: { username: 'Alice' }
        });
        
        card.dispatchEvent(event);
        
        expect(badge.textContent).toBe('¡Hola Alice!');
        expect(badge.hasAttribute('pulsing')).toBe(true);
        
        // Fast-forward 3 seconds
        vi.advanceTimersByTime(3000);
        
        expect(badge.hasAttribute('pulsing')).toBe(false);
    });
});
