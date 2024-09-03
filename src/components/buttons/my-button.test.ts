import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/dom';
import './my-button';

describe('MyButton', () => {
  it('renders the button with default text', async () => {
    // Manually add the component to the DOM
    document.body.innerHTML = `<my-button label="Click me"></my-button>`;

    // Wait for the component to finish rendering
    await waitFor(() => {
      const myButtonElement = document.querySelector('my-button');
      expect(myButtonElement).not.toBeNull(); // Check that the custom element exists

      const shadowRoot = myButtonElement?.shadowRoot;
      expect(shadowRoot).not.toBeNull(); // Ensure the shadow root exists

      const button = shadowRoot?.querySelector('button');
      expect(button).not.toBeNull(); // Ensure the button exists

      if (button) {
        expect(button).toHaveTextContent('Click me');
      }
    });
  });
});
