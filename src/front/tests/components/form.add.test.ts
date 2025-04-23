// filepath: src/front/tests/form.add.test.ts
import { describe, it, expect } from 'vitest';
import { createFormAdd } from '../../components/form.add';

describe('FormAdd Component', () => {
    it('should render the form', () => {
        document.body.innerHTML = '';
        const form = createFormAdd();
        expect(document.body.contains(form)).toBe(true);
    });
});
it('should have the correct structure', () => {
    const form = createFormAdd();
    expect(form.tagName).toBe('FORM');
    expect(form.querySelector('input[type="text"]')).not.toBeNull();
    expect(form.querySelector('button[type="submit"]')).not.toBeNull();
});

it('should trigger submit event', () => {
    const form = createFormAdd();
    const handleSubmit = vi.fn();
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit();
    });

    const submitButton = form.querySelector(
        'button[type="submit"]',
    ) as HTMLButtonElement;
    submitButton.click();

    expect(handleSubmit).toHaveBeenCalled();
});
it('should prevent default and call the submit handler', () => {
    const form = createFormAdd();
    const handleSubmit = vi.fn();
    const preventDefault = vi.fn();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        preventDefault();
        handleSubmit();
    });

    const submitButton = form.querySelector(
        'button[type="submit"]',
    ) as HTMLButtonElement;
    submitButton.click();

    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
});
