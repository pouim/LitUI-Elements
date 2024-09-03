import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { defaultTheme } from "../../theme/theme";

export class MyTextField extends LitElement {
  static styles = [
    defaultTheme,
    css`
      :host {
        display: block;
        margin-bottom: var(--spacing-md);
      }

      label {
        display: block;
        font-family: var(--font-family);
        font-size: var(--font-size-medium);
        margin-bottom: var(--spacing-xs);
        color: var(--text-color-secondary);
      }

      input {
        width: 100%;
        padding: var(--spacing-sm);
        font-size: var(--font-size-medium);
        font-family: var(--font-family);
        color: var(--text-color-secondary);
        background-color: var(--background-color);
        border: 1px solid var(--primary-color);
        border-radius: var(--border-radius-small);
        box-sizing: border-box;
        transition:
          border-color 0.3s ease,
          box-shadow 0.3s ease;
      }

      input:focus {
        border-color: var(--primary-color-hover);
        box-shadow: var(--focus-shadow);
        outline: none;
      }

      input::placeholder {
        color: var(--text-color-secondary);
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) type = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) inputStyle = "";
  @property({ type: String }) inputClass = "";

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent("input", { detail: this.value }));
  }

  render() {
    return html`
      <label>${this.label}</label>
      <input
        .type=${this.type}
        .placeholder=${this.placeholder}
        .value=${this.value}
        style=${ifDefined(this.inputStyle || undefined)}
        class=${classMap({ [this.inputClass]: !!this.inputClass })}
        @input=${this.handleInput}
      />
    `;
  }
}

customElements.define("my-text-field", MyTextField);
