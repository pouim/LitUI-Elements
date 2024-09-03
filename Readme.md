
# LitUI Elements

LitUI Elements is a customizable UI component library built with [Lit](https://lit.dev/). This library provides a set of reusable, themable UI components that can be easily integrated into any web application. The components are designed with flexibility and customization in mind, allowing you to tailor them to your application's unique design needs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [MyButton](#mybutton)
- [Theming](#theming)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Lightweight**: Built with Lit, a minimal and fast web components library.
- **Customizable**: Full theming support, allowing you to override styles and create consistent designs.
- **Reusable**: Components are designed to be easily reusable across different projects.
- **Accessible**: Built with accessibility in mind.

## Installation

To install the library, use npm or yarn:

```bash
npm install litui-elements
```

Or with yarn:

```bash
yarn add litui-elements
```

## Usage

Import the components into your project and start using them:

```javascript
import 'litui-elements/components/buttons/my-button.js';
```

Then, you can use the components in your HTML:

```html
<my-button label="Click Me" variant="contained"></my-button>
<my-button label="Outlined Button" variant="outlined"></my-button>
<my-button label="Text Button" variant="text"></my-button>
```

## Components

### MyButton

The `MyButton` component is a versatile button that supports multiple variants, including contained, outlined, and text buttons.

**Props:**
- `label`: The text label of the button.
- `variant`: The style variant of the button. Can be `contained`, `outlined`, or `text`.

**Example:**

```html
<my-button label="Contained Button" variant="contained"></my-button>
<my-button label="Outlined Button" variant="outlined"></my-button>
<my-button label="Text Button" variant="text"></my-button>
```

## Theming

LitUI Elements supports full theming, allowing you to customize the look and feel of your components via CSS variables.

**Default Theme:**

```css
:root {
  --primary-color: #6200ee;
  --primary-color-hover: #3700b3;
  --text-color: #ffffff;
  --font-family: 'Roboto', sans-serif;
  --border-radius-small: 4px;
  --shadow-light: 0px 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-medium: 0px 3px 6px rgba(0, 0, 0, 0.16);
  --shadow-large: 0px 10px 20px rgba(0, 0, 0, 0.19);
}
```

**Custom Theme:**

You can override the default theme variables to match your application's design:

```css
:root {
  --primary-color: #ff5722;
  --primary-color-hover: #e64a19;
  --text-color: #000000;
  --font-family: 'Arial', sans-serif;
  --border-radius-small: 8px;
}
```

## Development

### Running the Project Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/pouim/LitUI-Elements.git
cd litui-elements
npm install
```

### Storybook

We use Storybook for developing and showcasing components. To start Storybook:

```bash
npm run storybook
```

### Building the Project

To build the project:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
