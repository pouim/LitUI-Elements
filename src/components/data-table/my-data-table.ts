import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { defaultTheme } from "../../theme/theme";

type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => unknown;
};

export class MyDataTable<T> extends LitElement {
  static styles = [
    defaultTheme,
    css`
      :host {
        display: block;
        font-family: var(--font-family, Arial, sans-serif);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--table-background-color);
        box-shadow: var(--table-box-shadow);
        border-radius: var(--table-border-radius);
      }
      th,
      td {
        padding: 8px 12px;
        border: 1px solid var(--table-cell-border-color);
        text-align: left;
        color: var(--table-row-text-color);
      }
      th {
        cursor: pointer;
        background-color: var(--table-header-background-color);
        color: var(--table-header-text-color);
        border-bottom: 1px solid var(--table-header-border-color);
      }
      tr:nth-child(even) {
        background-color: var(--table-row-background-color);
      }
      tr:hover {
        background-color: var(--table-row-hover-background-color);
      }
      .pagination {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        color: var(--table-pagination-text-color);
      }
      .pagination button {
        padding: 5px 10px;
        cursor: pointer;
        background-color: var(--button-bg-color, #6200ee);
        color: var(--button-text-color, #ffffff);
        border: none;
        border-radius: 4px;
      }
      .sortable {
        position: relative;
      }
      .sortable::after {
        content: "\\25B2"; /* Up arrow */
        position: absolute;
        right: 10px;
        font-size: 12px;
        opacity: 0.5;
      }
      .sortable.desc::after {
        content: "\\25BC"; /* Down arrow */
      }
    `,
  ];

  @property({ type: Array }) data: T[] = [];
  @property({ type: Array }) columns: ColumnConfig<T>[] = [];
  @property({ type: String }) sortColumn: keyof T | "" = "";
  @property({ type: Boolean }) sortAscending: boolean = true;
  @property({ type: Number }) pageSize: number = 10;
  @property({ type: Number }) currentPage: number = 1;
  @property({ type: Array }) selectedRows: T[] = [];

  @property({ type: String }) tableClassName: string = "";
  @property({ type: String }) headerClassName: string = "";
  @property({ type: String }) rowClassName: string = "";
  @property({ type: String }) cellClassName: string = "";
  @property({ type: String }) paginationClassName: string = "";

  @property({ type: Object }) tableStyle: Partial<CSSStyleDeclaration> = {};
  @property({ type: Object }) headerStyle: Partial<CSSStyleDeclaration> = {};
  @property({ type: Object }) rowStyle: Partial<CSSStyleDeclaration> = {};
  @property({ type: Object }) cellStyle: Partial<CSSStyleDeclaration> = {};
  @property({ type: Object }) paginationStyle: Partial<CSSStyleDeclaration> =
    {};

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  paginateData(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    return this._sortedData().slice(start, end);
  }

  render() {
    return html`
      <table
        class=${this.tableClassName}
        style=${this.styleMap(this.tableStyle)}
      >
        <thead>
          <tr
            class=${this.headerClassName}
            style=${this.styleMap(this.headerStyle)}
          >
            <th><input type="checkbox" @change=${this._toggleSelectAll} /></th>
            ${this.columns.map(
              (column) =>
                html` <th
                  class="sortable ${this.sortColumn === column.key
                    ? this.sortAscending
                      ? ""
                      : "desc"
                    : ""} ${this.headerClassName}"
                  style=${this.styleMap(this.headerStyle)}
                  @click=${() => this._sortColumn(column.key)}
                >
                  ${column.label}
                </th>`
            )}
          </tr>
        </thead>
        <tbody>
          ${this.paginateData().map(
            (row) => html`
              <tr
                class=${this.rowClassName}
                style=${this.styleMap(this.rowStyle)}
              >
                <td>
                  <input
                    type="checkbox"
                    .checked=${this.selectedRows.includes(row)}
                    @change=${() => this.toggleRowSelection(row)}
                  />
                </td>
                ${this.columns.map(
                  (column) => html`
                    <td
                      class=${this.cellClassName}
                      style=${this.styleMap(this.cellStyle)}
                    >
                      ${this.renderCell(column, row)}
                    </td>
                  `
                )}
              </tr>
            `
          )}
        </tbody>
      </table>
      <div
        class="pagination ${this.paginationClassName}"
        style=${this.styleMap(this.paginationStyle)}
      >
        <button
          @click=${this._previousPage}
          ?disabled=${this.currentPage === 1}
        >
          Previous
        </button>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <button
          @click=${this._nextPage}
          ?disabled=${this.currentPage === this.totalPages}
        >
          Next
        </button>
      </div>
    `;
  }

  styleMap(styles: Partial<CSSStyleDeclaration>) {
    return Object.entries(styles).reduce((styleString, [prop, value]) => {
      return `${styleString}${prop}: ${value};`;
    }, "");
  }

  renderCell(column: ColumnConfig<T>, row: T) {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    return html`${row[column.key]}`;
  }

  _sortColumn(column: keyof T) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
  }

  _sortedData(): T[] {
    return [...this.data].sort((a, b) => {
      const valA = a[this.sortColumn as keyof T];
      const valB = b[this.sortColumn as keyof T];

      if (valA > valB) {
        return this.sortAscending ? 1 : -1;
      }
      if (valA < valB) {
        return this.sortAscending ? -1 : 1;
      }
      return 0;
    });
  }

  _previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  toggleRowSelection(row: T) {
    const index = this.selectedRows.indexOf(row);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.requestUpdate();
  }

  _toggleSelectAll(e: Event) {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedRows = [...this.paginateData()];
    } else {
      this.selectedRows = [];
    }
  }
}

customElements.define("my-data-table", MyDataTable);
