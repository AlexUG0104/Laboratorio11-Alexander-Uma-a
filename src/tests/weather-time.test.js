import { describe, test, expect, beforeEach } from 'vitest';
import '../components/weather-time/weather-time.js';

describe('weather-time', () => {
    let element;

    beforeEach(() => {
        document.body.innerHTML = '';
        element = document.createElement('weather-time');
        element.setAttribute('city', 'San Jose');
        element.setAttribute('temperature', '25°C');
        element.setAttribute('condition', 'Cloudy');
        document.body.appendChild(element);
    });

    test('renderiza city', () => {
        const city = element.shadowRoot.querySelector('.city');
        expect(city.textContent).toBe('San Jose');
    });

    test('renderiza temperature', () => {
        const temp = element.shadowRoot.querySelector('.temp');
        expect(temp.textContent).toBe('25°C');
    });

    test('renderiza condition', () => {
        const cond = element.shadowRoot.querySelector('.cond');
        expect(cond.textContent).toBe('Cloudy');
    });

    test('atributos reactivos funcionan y render dinámico es correcto', () => {
        element.setAttribute('city', 'Cartago');
        element.setAttribute('temperature', '20°C');
        element.setAttribute('condition', 'Rainy');

        const city = element.shadowRoot.querySelector('.city');
        const temp = element.shadowRoot.querySelector('.temp');
        const cond = element.shadowRoot.querySelector('.cond');

        expect(city.textContent).toBe('Cartago');
        expect(temp.textContent).toBe('20°C');
        expect(cond.textContent).toBe('Rainy');
    });
});
