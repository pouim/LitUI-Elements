// src/components/rich-text-editor.ts
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { defaultTheme } from "../../theme/theme";

@customElement("rich-text-editor")
export class RichTextEditor extends LitElement {
  static styles = [
    defaultTheme,
    css`
      :host {
        display: block;
        font-family: var(--font-family);
      }

      .toolbar {
        display: flex;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        background-color: var(--toolbar-background-color);
        border-radius: var(--border-radius-medium);
        align-items: center;
      }

      .toolbar button {
        background: none;
        color: var(--toolbar-icon-color);
        border: none;
        padding: var(--spacing-xs);
        border-radius: var(--border-radius-small);
        font-size: var(--font-size-medium);
        cursor: pointer;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
      }

      .toolbar button:hover {
        background-color: var(--secondary-color);
      }

      .toolbar button.active {
        color: var(--toolbar-icon-active-color);
        background-color: var(--secondary-color);
      }

      .toolbar button svg {
        width: 16px;
        height: 16px;
      }

      .editor-container {
        min-height: 300px;
        padding: var(--spacing-md);
        border-radius: var(--border-radius-medium);
        background-color: var(--background-color);
        color: var(--secondary-text-color);
        font-size: var(--font-size-large);
        outline: none;
        line-height: 1.6;
        border: 1px solid #e0e0e0;
      }

      .editor-container:focus {
        box-shadow: var(--focus-shadow);
        border-color: var(--primary-color);
      }
    `,
  ];

  @state() private isBold = false;
  @state() private isItalic = false;
  @state() private isUnderline = false;
  @state() private isStrikethrough = false;
  @state() private isSuperscript = false;
  @state() private isSubscript = false;
  @state() private isOrderedList = false;
  @state() private isUnorderedList = false;
  @state() private isJustifyLeft = false;
  @state() private isJustifyCenter = false;
  @state() private isJustifyRight = false;

  render() {
    return html`
      <div class="toolbar">
        <button
          class="${this.isBold ? "active" : ""}"
          @click=${this.toggleBold}
          title="Bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h1a2 2 0 100-4h-4v8h5a2 2 0 100-4h-1m-2 0h2a2 2 0 100-4H9m0 8h2a2 2 0 100-4H9"
            />
          </svg>
        </button>
        <button
          class="${this.isItalic ? "active" : ""}"
          @click=${this.toggleItalic}
          title="Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5h-4m4 14h-4m4-14L10 19"
            />
          </svg>
        </button>
        <button
          class="${this.isUnderline ? "active" : ""}"
          @click=${this.toggleUnderline}
          title="Underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 4v6a4 4 0 01-8 0V4m4 12v2a2 2 0 11-4 0v-2m0 0v2a2 2 0 104 0v-2"
            />
          </svg>
        </button>
        <button
          class="${this.isStrikethrough ? "active" : ""}"
          @click=${this.toggleStrikeThrough}
          title="Strikethrough"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 12h12m-6 7a7 7 0 01-7-7h14a7 7 0 01-7 7zM6 12h12m-6-7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
        <button
          class="${this.isUnorderedList ? "active" : ""}"
          @click=${this.toggleList}
          title="Unordered List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h10M8 12h6m-6 5h10m-10 0h1m0 0v1m-1-1h1m-1 0v-1m0 1h1M8 17h1m0 0v1m-1-1h1m-1 0v-1m0 1h1m0-10h1m-1 0h1M8 7h1m0 0V6m0 1V6m0 1h1M8 7h1m0 0V6m0 1V6m0 1h1m0 5h1m-1 0h1m0 5h1m-1 0h1m0 0h1m0-5h1m-1 0h1m0-5h1m-1 0h1m0 0h1"
            />
          </svg>
        </button>
        <button
          class="${this.isOrderedList ? "active" : ""}"
          @click=${this.toggleOrderedList}
          title="Ordered List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h10M8 12h6m-6 5h10M5 7l.868.5L7 7m0 10v.01M5 17h1v-1.5h.5v1.5H5v1m0-2h1v1h.5v-.5H5m0 0v-.5h1.5v-.5H5m3-3v.01"
            />
          </svg>
        </button>
        <button
          class="${this.isJustifyLeft ? "active" : ""}"
          @click=${this.toggleAlignLeft}
          title="Align Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M3 14h10"
            />
          </svg>
        </button>
        <button
          class="${this.isJustifyCenter ? "active" : ""}"
          @click=${this.toggleAlignCenter}
          title="Align Center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 14h10"
            />
          </svg>
        </button>
        <button
          class="${this.isJustifyRight ? "active" : ""}"
          @click=${this.toggleAlignRight}
          title="Align Right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M11 14h10"
            />
          </svg>
        </button>
        <button @click=${this.insertImage} title="Insert Image">🖼️</button>
        <button @click=${this.insertLink} title="Insert Link">🔗</button>
        <button @click=${this.undo} title="Undo">↺</button>
        <button @click=${this.redo} title="Redo">↻</button>
      </div>
      <div
        class="editor-container"
        contenteditable="true"
        @input=${this.handleInput}
        @mouseup=${this.updateToolbarState}
        @keyup=${this.updateToolbarState}
      ></div>
    `;
  }

  private toggleBold() {
    document.execCommand("bold");
    this.isBold = !this.isBold;
  }

  private toggleItalic() {
    document.execCommand("italic");
    this.isItalic = !this.isItalic;
  }

  private toggleUnderline() {
    document.execCommand("underline");
    this.isUnderline = !this.isUnderline;
  }

  private toggleStrikeThrough() {
    document.execCommand("strikethrough");
    this.isStrikethrough = !this.isStrikethrough;
  }

  private toggleList() {
    document.execCommand("insertUnorderedList");
    this.isUnorderedList = !this.isUnorderedList;
  }

  private toggleOrderedList() {
    document.execCommand("insertOrderedList");
    this.isOrderedList = !this.isOrderedList;
  }

  private toggleAlignLeft() {
    document.execCommand("justifyLeft");
    this.isJustifyLeft = true;
    this.isJustifyCenter = false;
    this.isJustifyRight = false;
  }

  private toggleAlignCenter() {
    document.execCommand("justifyCenter");
    this.isJustifyLeft = false;
    this.isJustifyCenter = true;
    this.isJustifyRight = false;
  }

  private toggleAlignRight() {
    document.execCommand("justifyRight");
    this.isJustifyLeft = false;
    this.isJustifyCenter = false;
    this.isJustifyRight = true;
  }

  private insertImage() {
    const url = prompt("Enter image URL");
    if (url) {
      document.execCommand("insertImage", false, url);
    }
  }

  private insertLink() {
    const url = prompt("Enter the URL");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  }

  private undo() {
    document.execCommand("undo");
  }

  private redo() {
    document.execCommand("redo");
  }

  private handleInput(e: Event) {
    // Handle input events here if needed
  }

  private updateToolbarState() {
    this.isBold = document.queryCommandState("bold");
    this.isItalic = document.queryCommandState("italic");
    this.isUnderline = document.queryCommandState("underline");
    this.isStrikethrough = document.queryCommandState("strikethrough");
    this.isUnorderedList = document.queryCommandState("insertUnorderedList");
    this.isOrderedList = document.queryCommandState("insertOrderedList");
    this.isJustifyLeft = document.queryCommandState("justifyLeft");
    this.isJustifyCenter = document.queryCommandState("justifyCenter");
    this.isJustifyRight = document.queryCommandState("justifyRight");
  }
}
