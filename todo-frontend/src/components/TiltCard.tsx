import { ReactNode } from "react";
import Tilt from "react-parallax-tilt";
import { Card } from "./Card";

interface CardProps {
  children: ReactNode;
}

export function TiltCard(props: CardProps) {
  return (
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true}>
      <Card>{props.children}</Card>
    </Tilt>
  );
}
