import { html } from "lit";
import { Meta, StoryFn } from "@storybook/web-components";
import "../rich-text-editor";

export default {
  title: "Components/RichTextEditor",
  component: "rich-text-editor",
  argTypes: {},
} as Meta;

const Template: StoryFn = (args) => html`
  <rich-text-editor
    style="height: ${args.height}; width: ${args.width};"
  ></rich-text-editor>
`;

export const Default = Template.bind({});
Default.args = {
  height: "400px",
  width: "600px",
};
