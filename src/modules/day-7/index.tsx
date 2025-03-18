import { useMemo, useState } from "react";

// TODO: Move to components/calculator-button later
function CalculatorButton({
  label,
  executeOperation,
  testId,
}: {
  label: string;
  executeOperation: () => void;
  testId: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        executeOperation();
      }}
      className="block min-w-14 text-base leading-6 p-2.5 rounded-sm mr-1 hover:text-xl bg-gray-50 hover:bg-gray-100 border-solid border border-gray-400 hover:border-gray-600 nth-last-[1]:bg-orange-400 hover:nth-last-[1]:bg-orange-500! nth-last-[2]:bg-orange-400 hover:nth-last-[2]:bg-orange-500!"
      data-testid={testId}
    >
      {label}
    </button>
  );
}

// TODO: Move to components/calculator later
export default function Calculator() {
  const [result, setResult] = useState(0);
  const [inputText, setInputText] = useState("");
  const calculatorButtons: {
    label: string;
    executeOperation: () => void;
    testId?: string;
  }[] = useMemo(
    () => [
      {
        label: "+",
        executeOperation: () =>
          setResult((prevResult) => (prevResult += Number(inputText))),
        testId: "btn-add",
      },
      {
        label: "-",
        executeOperation: () =>
          setResult((prevResult) => (prevResult -= Number(inputText))),
        testId: "btn-sub",
      },
      {
        label: "x",
        executeOperation: () =>
          setResult((prevResult) => (prevResult *= Number(inputText))),
        testId: "btn-multiply",
      },
      {
        label: "÷",
        executeOperation: () =>
          setResult((prevResult) => (prevResult /= Number(inputText))),
        testId: "btn-divide",
      },
      {
        label: "C",
        executeOperation: () => setInputText(""),
      },
      {
        label: "A/C",
        executeOperation: () => setResult(0),
        testId: "btn-reset-result",
      },
    ],
    [inputText],
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl leading-10 font-bold">
          Simplest Working Calculator
        </h1>
      </div>
      <form>
        <div className="flex flex-row gap-4 items-center h-10 mb-4">
          <input
            value={inputText}
            pattern="[0-9]"
            type="number"
            placeholder="Type a number"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            className="block border rounded-sm h-full"
            data-testid="calculator-input"
          />
          <p className="text-base leading-6" data-testid="calculator-result">
            {result}
          </p>
        </div>
        <div
          className="flex flex-row gap-1.5
gap"
        >
          {calculatorButtons.map(({ label, executeOperation, testId }) => (
            <CalculatorButton
              key={label}
              {...{ label, executeOperation, testId: testId || "" }}
            />
          ))}
        </div>
      </form>{" "}
    </div>
  );
}
