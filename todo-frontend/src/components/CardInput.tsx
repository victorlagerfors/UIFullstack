import { Card } from "./Card";
import { ReactNode, SyntheticEvent, useRef, useState } from "react";
import styled from "styled-components";

interface CardInputProps {
  onSubmit: (value: string) => void;
  children?: ReactNode;
}

export function CardInput({
  onSubmit,
  children, // Add children here
}: CardInputProps): ReactNode {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: SyntheticEvent) => {
    // Do something with inputValue
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
      {children}
      <FormStyled onSubmit={handleClick}>
        <input
          data-testid="add-new-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          data-testid="add-new-button"
          disabled={!inputValue}
          type="submit">
          Add
        </button>
      </FormStyled>
    </Card>
  );
}

const FormStyled = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
