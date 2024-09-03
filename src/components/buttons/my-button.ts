import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { defaultTheme } from "../../theme/theme";

export class MyButton extends LitElement {
  static styles = [
    defaultTheme,
    css`
      button {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: var(--font-size-medium);
        font-family: var(--font-family);
        font-weight: var(--font-weight-regular);
        cursor: pointer;
        background-color: var(--primary-color);
        color: var(--text-color);
        border: none;
        border-radius: var(--border-radius-small);
        box-shadow: var(--shadow-light);
        transition:
          background-color 0.3s ease,
          box-shadow 0.3s ease;
      }

      button:hover {
        background-color: var(--primary-color-hover);
        box-shadow: var(--shadow-medium);
      }
      button:active {
        box-shadow: var(--shadow-large);
      }
    `,
  ];

  @property()
  label: string = "";

  render() {
    return html`<button>${this.label}<slot></slot></button>`;
  }
}

customElements.define("my-button", MyButton);
