import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';
import '../my-button';

export default {
  title: 'Components/MyButton',
  component: 'my-button',
  argTypes: {
    label: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<{ label: string }> = ({ label }) => {
  return html`<my-button label=${label}></my-button>`;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click me',
};
