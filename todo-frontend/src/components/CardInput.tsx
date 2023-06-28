import { Card } from "./Card";
import { SyntheticEvent, useRef, useState } from "react";
import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export function CardInput({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: SyntheticEvent) => {
    // Do something with inputValue
    console.log(inputValue);
    onSubmit(inputValue);
    event.preventDefault();

    // Reset the input value to empty string and focus the input for the next entry
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Card>
      <FormStyled onSubmit={handleClick}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </FormStyled>
    </Card>
  );
}
