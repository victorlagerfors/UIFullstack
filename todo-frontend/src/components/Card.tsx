import { ReactNode } from "react";
import styled from "styled-components";

interface CardProps {
  children: ReactNode;
}

export function Card(props: CardProps): ReactNode {
  return <CardContainer>{props.children}</CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0px;
  min-height: 40px;
  min-width: 250px; // to prevent it from getting too wide //TODO fix this
  width: 100%; // to fill the parent
  position: relative;
  background: linear-gradient(145deg, #acfbff, #ffffff);
  color: black; // to make text visible against the blue background: ;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; // to include padding and border in the element's total width and height
`;
