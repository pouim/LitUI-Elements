import { html } from "lit";
import { Meta, StoryFn } from "@storybook/web-components";
import "../my-text-field";

export default {
  title: "Components/MyTextField",
  component: "my-text-field",
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    value: { control: "text" },
    inputStyle: { control: "text" },
    inputClass: { control: "text" },
  },
} as Meta;

const Template: StoryFn<{
  label: string;
  placeholder: string;
  type: string;
  value: string;
  inputStyle: string;
  inputClass: string;
}> = ({ label, placeholder, type, value, inputStyle, inputClass }) => {
  return html`
    <my-text-field
      .label=${label}
      .placeholder=${placeholder}
      .type=${type}
      .value=${value}
      .inputStyle=${inputStyle}
      .inputClass=${inputClass}
    ></my-text-field>
  `;
};

export const Default = Template.bind({});
Default.args = {
  label: "Default Label",
  placeholder: "Enter text",
  type: "text",
  value: "",
};

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  placeholder: "Enter your password",
  type: "password",
  value: "",
};

export const Email = Template.bind({});
Email.args = {
  label: "Email",
  placeholder: "Enter your email",
  type: "email",
  value: "",
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: "With Value",
  placeholder: "Enter text",
  type: "text",
  value: "Pre-filled value",
};

export const CustomStyled = Template.bind({});
CustomStyled.args = {
  label: "Custom Styled Input",
  placeholder: "Enter something",
  type: "text",
  value: "",
  inputStyle:
    "background-color: #f0f0f0; border-radius: 8px; border: 2px solid blue;",
  inputClass: "custom-input-class",
};
