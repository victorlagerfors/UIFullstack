import { Card } from "./Card";
import { SyntheticEvent, useRef, useState } from "react";

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
      <form onSubmit={handleClick}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </Card>
  );
}
