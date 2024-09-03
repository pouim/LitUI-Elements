import { html } from "lit";
import { Meta, StoryFn } from "@storybook/web-components";
import "../my-button";

export default {
  title: "Components/MyButton",
  component: "my-button",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      description: "Choose the button style variant",
    },
  },
} as Meta;

const Template: StoryFn<{ label: string; variant: string }> = ({
  label,
  variant,
}) => {
  return html`<my-button label=${label} variant=${variant}></my-button>`;
};

// Story for the Contained Button
export const Contained = Template.bind({});
Contained.args = {
  label: "Contained Button",
  variant: "contained",
};

// Story for the Outlined Button
export const Outlined = Template.bind({});
Outlined.args = {
  label: "Outlined Button",
  variant: "outlined",
};

// Story for the Text Button
export const Text = Template.bind({});
Text.args = {
  label: "Text Button",
  variant: "text",
};
