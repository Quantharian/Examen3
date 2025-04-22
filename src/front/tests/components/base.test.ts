import { describe, it, expect } from 'vitest';
import { render } from '../../components/base';

describe('render', () => {
    it('should insert the template into the target element at the specified position', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const template = '<p>Hello, World!</p>';
        const result = render('#app', 'beforeend', template);

        expect(document.querySelector('#app')?.innerHTML).toBe(template);
        expect(result?.outerHTML).toBe('<p>Hello, World!</p>');
    });

    it('should throw an error if the target element is not found', () => {
        const template = '<p>Hello, World!</p>';
        expect(() => render('#nonexistent', 'beforeend', template)).toThrow(
            'Element with selector #nonexistent not found',
        );
    });

    it('should return the correct element when inserted at "beforeend"', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const template = '<p>Test</p>';
        const result = render('#app', 'beforeend', template);

        expect(result?.outerHTML).toBe('<p>Test</p>');
    });

    it('should return the correct element when inserted at "afterbegin"', () => {
        document.body.innerHTML = '<div id="app"><p>Existing</p></div>';
        const template = '<p>New</p>';
        const result = render('#app', 'afterbegin', template);

        expect(result?.outerHTML).toBe('<p>New</p>');
    });

    it('should return the correct element when inserted at "beforebegin"', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const template = '<p>Before</p>';
        const result = render('#app', 'beforebegin', template);

        expect(document.body.firstChild?.outerHTML).toBe('<p>Before</p>');
        expect(result?.outerHTML).toBe('<p>Before</p>');
    });

    it('should return the correct element when inserted at "afterend"', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const template = '<p>After</p>';
        const result = render('#app', 'afterend', template);

        expect(document.body.lastChild?.outerHTML).toBe('<p>After</p>');
        expect(result?.outerHTML).toBe('<p>After</p>');
    });
});
