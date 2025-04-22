import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createHeader } from '../../components/header';
import { render } from '../../components/base';

vi.mock('../../components/base', () => ({
    render: vi.fn(),
}));

describe('createHeader', () => {
    const mockSelector = 'body';
    const mockPosition = 'afterbegin';
    const mockTemplate = /*html*/ `
        <header class="header">
            <div class="header__container">
                <img src="favicon.png" alt="Logo de la empresa" class="header__logo" />
                <h1 class="header__title">Productos</h1>
            </div>
            <menu>
              <button class="header__nav-button" type="button" aria-expanded="false" aria-controls="add">Add</button>
            </menu>
        </header>  
        <details class="add">
            <summary class="header__nav-title">Add</summary>  
        </details>
    `;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call render with the correct arguments', () => {
        createHeader(mockSelector, mockPosition);
        expect(render).toHaveBeenCalledWith(
            mockSelector,
            mockPosition,
            mockTemplate,
        );
    });

    it('should return an HTMLElement', () => {
        const mockElement = document.createElement('div');
        (render as vi.Mock).mockReturnValue(mockElement);

        const result = createHeader(mockSelector, mockPosition);
        expect(result).toBeInstanceOf(HTMLElement);
        expect(result).toBe(mockElement);
    });

    it('should use default parameters when no arguments are provided', () => {
        createHeader();
        expect(render).toHaveBeenCalledWith('body', 'afterbegin', mockTemplate);
    });
});
