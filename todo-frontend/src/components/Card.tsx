import { ReactNode } from "react";
import styled from "styled-components";
interface CardProps {
  children: ReactNode;
}

export function Card(props: CardProps) {
  return <CardContainer>{props.children}</CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0px;
  min-height: 40px;
  width: 100%;
`;
