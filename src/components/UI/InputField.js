import React, { useState } from "react";

const InputField = (props) => {
  const { type, label, options, initialValue, onValueChange } = props;
  const [value, setValue] = useState(initialValue);

  const inputChangeHandler = (val) => {
    setValue(val);
    onValueChange(val);
  };

  return (
    <div>
      <div>{label}</div>
      {!options || options.length == 0 ? (
        <input
          type={type}
          onChange={(e) => inputChangeHandler(e.target.value)}
          value={value}
        />
      ) : (
        <div>{JSON.stringify(options)}</div>
      )}
    </div>
  );
};

export default InputField;
