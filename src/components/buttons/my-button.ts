import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class MyButton extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      background-color: var(--my-button-bg, #6200ee);
      color: white;
      border: none;
      border-radius: 4px;
    }

    button:hover {
      background-color: var(--my-button-bg-hover, #3700b3);
    }
  `;

  @property()
  label: string = "";

  render() {
    return html`<button>${this.label}<slot></slot></button>`;
  }
}

customElements.define("my-button", MyButton);
