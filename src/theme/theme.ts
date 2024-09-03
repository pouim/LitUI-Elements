// src/theme/theme.ts
import { css } from "lit";

export const defaultTheme = css`
  /* Colors */
  :host {
    --primary-color: #6200ee;
    --primary-color-hover: #3700b3;
    --secondary-color: #03dac6;
    --secondary-color-hover: #018786;
    --error-color: #b00020;
    --background-color: #ffffff;
    --surface-color: #f5f5f5;
    --text-color: #000000;
    --text-color-secondary: #757575;

    /* Typography */
    --font-family: "Roboto", sans-serif;
    --font-size-small: 12px;
    --font-size-medium: 16px;
    --font-size-large: 20px;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-bold: 700;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Border Radius */
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-large: 12px;

    /* Shadows */
    --shadow-light: 0px 1px 3px rgba(0, 0, 0, 0.12);
    --shadow-medium: 0px 3px 6px rgba(0, 0, 0, 0.16);
    --shadow-large: 0px 10px 20px rgba(0, 0, 0, 0.19);
  }
`;
