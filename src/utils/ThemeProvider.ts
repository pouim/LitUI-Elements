import { LitElement, html, css } from "lit";

class ThemeProvider extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--spacing-lg);
      background-color: var(--background-color);
      color: var(--text-color);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("theme-provider", ThemeProvider);
