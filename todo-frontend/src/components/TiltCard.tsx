import { ReactNode } from "react";
import Tilt from "react-parallax-tilt";
import { Card } from "./Card";

interface CardProps {
  children: ReactNode;
}

export function TiltCard(props: CardProps) {
  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true}>
      <Card>{props.children}</Card>
    </Tilt>
  );
}
