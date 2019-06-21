import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./../App.css";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function CardXmlVal() {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  return (
    <animated.div
      className="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.interpolate(trans),
        backgroundColor: "red"
      }}
    >
      <Link style={linkStyle} to="/xmlval">
        XML Validation
      </Link>
    </animated.div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default CardXmlVal;
