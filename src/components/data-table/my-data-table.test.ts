import { describe, it, expect } from "vitest";
import { fireEvent, waitFor } from "@testing-library/dom";
import { html, render } from "lit";
import { MyDataTable } from "./my-data-table";
import "./my-data-table";

describe("MyDataTable", () => {
  const userData = [
    {
      name: "John Doe",
      email: "john@example.com",
      date: "2023-09-01",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      date: "2023-09-02",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Alice Brown",
      email: "alice@example.com",
      date: "2023-09-03",
      image: "https://via.placeholder.com/50",
    },
  ];

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "date",
      label: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "image",
      label: "Image",
      render: (value: string) =>
        html`<img src="${value}" alt="Image" width="50" />`,
    },
  ];

  it("renders correctly with given data and columns", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      html`
        <my-data-table
          .data=${userData}
          .columns=${userColumns}
          .pageSize=${5}
          .currentPage=${1}
          .sortColumn=${"name"}
          .sortAscending=${true}
        ></my-data-table>
      `,
      container
    );

    const table = container.querySelector("my-data-table") as MyDataTable<
      (typeof userData)[0]
    >;

    await waitFor(() => {
      const rows = table.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows.length).toBe(userData.length);
    });

    document.body.removeChild(container);
  });
  it("sorts data when clicking on a sortable column header", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      html`
        <my-data-table
          .data=${userData}
          .columns=${userColumns}
          .pageSize=${5}
          .currentPage=${1}
          .sortColumn=${"name"}
          .sortAscending=${true}
        ></my-data-table>
      `,
      container
    );

    const table = container.querySelector("my-data-table") as MyDataTable<
      (typeof userData)[0]
    >;

    await waitFor(() => {
      const nameHeader = table.shadowRoot!.querySelector(
        "th.sortable"
      ) as HTMLElement;
      expect(nameHeader).not.toBeNull();

      fireEvent.click(nameHeader);
    });

    await waitFor(() => {
      const rows = table.shadowRoot!.querySelectorAll("tbody tr");
      const firstRowName =
        rows[0].querySelector("td:nth-child(2)")!.textContent;

      expect(firstRowName!.trim()).toBe("John Doe");
    });

    document.body.removeChild(container);
  });

  it("paginates data correctly", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      html`
        <my-data-table
          .data=${userData}
          .columns=${userColumns}
          .pageSize=${2}
          .currentPage=${1}
          .sortColumn=${"name"}
          .sortAscending=${true}
        ></my-data-table>
      `,
      container
    );

    const table = container.querySelector("my-data-table") as MyDataTable<
      (typeof userData)[0]
    >;

    await waitFor(() => {
      const rows = table.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows.length).toBe(2);
    });

    const nextPageButton = table.shadowRoot!.querySelector(
      "button:last-child"
    ) as HTMLElement;
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      const rows = table.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows.length).toBe(1);
    });

    document.body.removeChild(container);
  });
});
