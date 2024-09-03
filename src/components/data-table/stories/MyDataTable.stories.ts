import { html } from "lit";
import { Meta, StoryFn } from "@storybook/web-components";
import { MyDataTable } from "../my-data-table";
import "../my-data-table";

export default {
  title: "Components/MyDataTable",
  component: "my-data-table",
  argTypes: {
    pageSize: { control: "number" },
    currentPage: { control: "number" },
    sortColumn: { control: "text" },
    sortAscending: { control: "boolean" },
  },
} as Meta;

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
] as any;

const Template: StoryFn<MyDataTable<(typeof userData)[0]>> = (args) => {
  return html`
    <my-data-table
      .data="${args.data}"
      .columns="${args.columns}"
      .pageSize="${args.pageSize}"
      .currentPage="${args.currentPage}"
      .sortColumn="${args.sortColumn}"
      .sortAscending="${args.sortAscending}"
    >
    </my-data-table>
  `;
};

export const Default = Template.bind({});
Default.args = {
  data: userData,
  columns: userColumns,
  pageSize: 5,
  currentPage: 1,
  sortColumn: "name",
  sortAscending: true,
};

export const SortedByDate = Template.bind({});
SortedByDate.args = {
  data: userData,
  columns: userColumns,
  pageSize: 5,
  currentPage: 1,
  sortColumn: "date",
  sortAscending: false,
};

export const Paginated = Template.bind({});
Paginated.args = {
  data: userData,
  columns: userColumns,
  pageSize: 2,
  currentPage: 1,
  sortColumn: "name",
  sortAscending: true,
};

export const CustomRendering = Template.bind({});
CustomRendering.args = {
  data: userData,
  columns: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "date",
      label: "Formatted Date",
      render: (value: string) =>
        html`<strong>${new Date(value).toLocaleDateString()}</strong>`,
    },
    {
      key: "image",
      label: "Profile Picture",
      render: (value: string) =>
        html`<img src="${value}" alt="Image" width="50" />`,
    },
  ],
  pageSize: 5,
  currentPage: 1,
  sortColumn: "name",
  sortAscending: true,
};
