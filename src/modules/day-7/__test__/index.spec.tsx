import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "..";

describe("Page", () => {
  beforeEach(() => {
    render(<Calculator />);
  });
  it("should renders a heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Simplest Working Calculator");
  });

  it("Should contains enough calculator buttons", () => {
    const calculatorButtons = screen.getAllByRole("button");

    expect(calculatorButtons).toHaveLength(6);
    calculatorButtons.forEach((btn) => {
      const isExisted = ["+", "-", "x", "÷", "C", "A/C"].includes(
        btn.textContent!,
      );
      expect(isExisted).toBeTruthy();
    });
  });

  it("should render default result = 0", () => {
    const result = screen.getByTestId("calculator-result");

    expect(result).toBeInTheDocument();
    expect(result.textContent).toBe("0");
  });

  it("should calculate correctly when type number = 1 into the input field then press add button", () => {
    const input = screen.getByTestId("calculator-input");
    const btnAdd = screen.getByTestId("btn-add");

    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.click(btnAdd);

    const result = screen.getByTestId("calculator-result");

    expect(result.textContent).toBe("1");
  });

  it("should render 0 when click reset result button", () => {
    const input = screen.getByTestId("calculator-input");
    const btnAdd = screen.getByTestId("btn-add");

    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.click(btnAdd);

    const btnResetResult = screen.getByTestId("btn-reset-result");

    fireEvent.click(btnResetResult);

    const result = screen.getByTestId("calculator-result");

    expect(result.textContent).toBe("0");
  });

  it("should render 100 after type input 10 then press the add button next press multiply button", () => {
    const input = screen.getByTestId("calculator-input");
    const btnAdd = screen.getByTestId("btn-add");

    fireEvent.change(input, { target: { value: 10 } });
    fireEvent.click(btnAdd);

    const btnMul = screen.getByTestId("btn-multiply");

    fireEvent.click(btnMul);

    const result = screen.getByTestId("calculator-result");

    expect(result.textContent).toBe("100");
  });

  it("should render 1 after type input 20 then press the add button next press divide button", () => {
    const input = screen.getByTestId("calculator-input");
    const btnAdd = screen.getByTestId("btn-add");

    fireEvent.change(input, { target: { value: 20 } });
    fireEvent.click(btnAdd);

    const btnDivide = screen.getByTestId("btn-divide");

    fireEvent.click(btnDivide);

    const result = screen.getByTestId("calculator-result");

    expect(result.textContent).toBe("1");
  });

  it("should render 40 after type input 100 then press the add button next change input to 60 finally press subtract button", () => {
    const input = screen.getByTestId("calculator-input");
    const btnAdd = screen.getByTestId("btn-add");

    fireEvent.change(input, { target: { value: 100 } });
    fireEvent.click(btnAdd);
    fireEvent.change(input, { target: { value: 60 } });

    const btnSub = screen.getByTestId("btn-sub");

    fireEvent.click(btnSub);

    const result = screen.getByTestId("calculator-result");

    expect(result.textContent).toBe("40");
  });
});
