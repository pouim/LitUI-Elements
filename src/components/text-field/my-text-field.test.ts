import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/dom";
import { MyTextField } from "./my-text-field";
import "./my-text-field";

describe("MyTextField", () => {
  it("renders with a label and an input field", async () => {
    const el = document.createElement("my-text-field") as MyTextField;
    el.label = "Username";
    el.placeholder = "Enter your username";

    document.body.appendChild(el);

    await waitFor(() => {
      const label = el.shadowRoot!.querySelector("label");
      const input = el.shadowRoot!.querySelector("input");

      expect(label).toBeTruthy();
      expect(label!.textContent).toBe("Username");
      expect(input).toBeTruthy();
      expect(input!.getAttribute("placeholder")).toBe("Enter your username");
    });

    document.body.removeChild(el);
  });

  it("passes the value to the input field", async () => {
    const el = document.createElement("my-text-field") as MyTextField;
    el.value = "Hello";

    document.body.appendChild(el);

    await waitFor(() => {
      const input = el.shadowRoot!.querySelector("input");
      expect(input!.value).toBe("Hello");
    });

    document.body.removeChild(el);
  });

  it("applies custom styles to the input", async () => {
    const el = document.createElement("my-text-field") as MyTextField;
    el.inputStyle = "background-color: yellow;";

    document.body.appendChild(el);

    await waitFor(() => {
      const input = el.shadowRoot!.querySelector("input");
      expect(input!.getAttribute("style")).toContain(
        "background-color: yellow;"
      );
    });

    document.body.removeChild(el);
  });

  it("applies custom classes to the input", async () => {
    const el = document.createElement("my-text-field") as MyTextField;
    el.inputClass = "custom-class";

    document.body.appendChild(el);

    await waitFor(() => {
      const input = el.shadowRoot!.querySelector("input");
      expect(input!.classList.contains("custom-class")).toBe(true);
    });

    document.body.removeChild(el);
  });
});
