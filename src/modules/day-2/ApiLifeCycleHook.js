import React, { useState } from "react";

export default () => {
  const [{ name, age, address }, setForm] = useState({
    name: "",
    age: 20,
    address: { block: "", street: "", city: "" },
  });
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setForm((form) => ({ ...form, name: e.target.value }))}
      />
      <button
        onClick={() => {
          setForm((form) => ({ ...form, age: form.age + 1 }));
        }}
      >
        Click to increment your age
      </button>
      <div>
        Address form
        {Object.entries(address).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key.toUpperCase()}</label>
            <input
              type="text"
              value={value}
              name={key}
              onChange={(e) =>
                setForm((form) => ({
                  ...form,
                  address: { ...form.address, [key]: e.target.value },
                }))
              }
            />
          </div>
        ))}
        <p>your address: {Object.values(address).join(" ")}</p>
      </div>
      <p>
        Hello {name}. You are {age} olds
      </p>
    </div>
  );
};
