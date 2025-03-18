"use client";

import React, { ChangeEvent, JSX, useState } from "react";

export const RadioGroup = ({
  onChange: setSelected,
  selected,
  children,
}: {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  children: JSX.Element[];
}) => {
  // Use React.Children.map and React.cloneElement to clone the children
  // and pass the correct props to each RadioOption
  const RadioOptions = React.Children.map(children, (RadioOption) => {
    const cloneRadioOption = React.cloneElement(RadioOption, {
      ...RadioOption.props,
      key: RadioOption.props.value,
      checked: RadioOption.props.value === selected,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === selected) {
          return;
        }
        setSelected(RadioOption.props.value);
      },
    });
    return cloneRadioOption;
  });

  return <div className="RadioGroup">{RadioOptions}</div>;
};

export const RadioOption = ({
  value,
  children,
  checked,
  onChange,
}: {
  value: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children: string;
}) => {
  // Hook up the onChange handler to call the onChange prop passed to RadioGroup
  // Also, make sure to pass the correct checked prop to the input element
  return (
    <div className="RadioOption">
      <input
        id={value}
        type="radio"
        name={value}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={value}>{children}</label>
    </div>
  );
};

export default function Home() {
  return <div>{(() => true)()}</div>;
}
