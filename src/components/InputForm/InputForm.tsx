import { useState } from 'react';

interface propsInputForm {
  name: string;
  value: string;
  changeInput: (name: string, value: string) => void;
}

function InputForm({ name, value, changeInput }: propsInputForm) {
  const [textInput, setInput] = useState(value);

  return (
    <input
      type="text"
      name={name}
      value={textInput}
      onChange={(event) => {
        setInput(event.target.value);
        changeInput(name, event.target.value);
      }}
    />
  );
}

export default InputForm;
