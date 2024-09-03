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
        color: var(--text-color);
        border-radius: var(--border-radius-small);
        transition:
          background-color 0.3s ease,
          box-shadow 0.3s ease,
          border-color 0.3s ease,
          color 0.3s ease;
      }

      /* Contained Button */
      button.contained {
        background-color: var(--primary-color);
        color: var(--text-color);
        border: none;
        box-shadow: var(--shadow-light);
      }

      button.contained:hover {
        background-color: var(--primary-color-hover);
        box-shadow: var(--shadow-medium);
      }

      button.contained:active {
        box-shadow: var(--shadow-large);
      }

      /* Outlined Button */
      button.outlined {
        background-color: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
      }

      button.outlined:hover {
        background-color: var(--primary-color-hover, transparent);
        color: var(--text-color-hover);
        border-color: var(--primary-color-hover);
      }

      button.outlined:active {
        background-color: var(--primary-color-hover, transparent);
        color: var(--primary-color-hover);
      }

      /* Text Button */
      button.text {
        background-color: transparent;
        color: var(--primary-color);
        border: none;
      }

      button.text:hover {
        background-color: var(--primary-color-hover, transparent);
        color: var(--text-color-hover);
      }

      button.text:active {
        background-color: var(--primary-color-hover, transparent);
        color: var(--primary-color-hover);
      }
    `,
  ];

  @property({ type: String })
  label: string = "";

  @property({ type: String })
  variant: "contained" | "outlined" | "text" = "contained";

  render() {
    return html`<button class=${this.variant}>
      ${this.label}<slot></slot>
    </button>`;
  }
}

customElements.define("my-button", MyButton);
