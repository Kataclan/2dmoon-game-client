import styles from "../../styles/Game.module.css";

import React, { useRef } from "react";
import p5Types from "p5";
import dynamic from "next/dynamic";

import { initEarh, initMoon, initRocket } from "game/utils";
import { noop } from "utils/misc";
import { rotateAndDrawImage } from "utils/p5-utils";
import { Moon } from "game/moon";
import { Rocket } from "game/rocket";
import { Earth } from "game/earth";

const Sketch = dynamic(() => import("react-p5"), {
  ssr: false,
});

interface GameSketchProps {
  onFirstPress?: () => void;
  onFinishGame?: (score: number) => void;
  onResetGame?: () => void;
}

const GameSketch: React.FC<GameSketchProps> = ({
  onFirstPress = noop,
  onFinishGame = noop,
  onResetGame = noop,
}) => {
  const font = useRef<p5Types.Font>();
  const moonMainImg = useRef<p5Types.Image>();
  const rocketMainImg = useRef<p5Types.Image>();
  const earthMainImg = useRef<p5Types.Image>();
  const rocketMoving1Img = useRef<p5Types.Image>();
  const rocketMoving2Img = useRef<p5Types.Image>();

  const earth = useRef<Earth>();
  const moon = useRef<Moon>();
  const rocket = useRef<Rocket>();

  const containerRef = useRef<Element>();
  const CONTAINER_WIDTH = useRef<number>();
  const CONTAINER_HEIGHT = useRef<number>();
  const hasStarted = useRef<boolean>();

  // Custom methods
  const resetGame = () => {
    initObjects();
    onResetGame();
  };

  const initObjects = () => {
    earth.current = initEarh(
      CONTAINER_HEIGHT.current!,
      CONTAINER_WIDTH.current!,
      {
        main: earthMainImg.current!,
      }
    );
    moon.current = initMoon(
      CONTAINER_HEIGHT.current!,
      CONTAINER_WIDTH.current!,
      {
        main: moonMainImg.current!,
      }
    );
    rocket.current = initRocket(
      CONTAINER_HEIGHT.current!,
      CONTAINER_WIDTH.current!,
      {
        main: rocketMainImg.current!,
        moving1: rocketMoving1Img.current!,
        moving2: rocketMainImg.current!,
        collision: rocketMainImg.current!,
      }
    );
  };

  const drawEarth = (p5: p5Types) => {
    p5.image(
      earth.current!.props.assets.main,
      earth.current!.props.position.x,
      earth.current!.props.position.y,
      earth.current!.props.width,
      earth.current!.props.height
    );
    // p5 methods
    p5.noFill();
    p5.noStroke();
    p5.rect(
      earth.current!.props.position.x,
      earth.current!.props.position.y,
      earth.current!.props.width,
      earth.current!.props.height
    );
  };

  const drawMoon = (p5: p5Types) => {
    p5.image(
      moon.current!.props.assets.main,
      moon.current!.props.position.x,
      moon.current!.props.position.y,
      moon.current!.props.width,
      moon.current!.props.height
    );
    // p5 methods
    p5.noFill();
    p5.noStroke();
    p5.rect(
      moon.current!.props.position.x,
      moon.current!.props.position.y,
      moon.current!.props.width,
      moon.current!.props.height
    );
  };

  const drawRocket = (p5: p5Types) => {
    rotateAndDrawImage(
      p5,
      rocket.current!.getRocketImg(),
      rocket.current!.props.position.x,
      rocket.current!.props.position.y,
      rocket.current!.props.width,
      rocket.current!.props.height,
      rocket.current!.props.angle
    );
    p5.noFill();
    p5.noStroke();
    p5.rect(
      rocket.current!.props.position.x,
      rocket.current!.props.position.y,
      rocket.current!.props.width,
      rocket.current!.props.height
    );
  };

  const checkRocketCollisionWithMoon = () =>
    rocket.current!.props.position.x <
      moon.current!.props.position.x +
        moon.current!.props.height +
        moon.current!.props.padding &&
    rocket.current!.props.position.x +
      rocket.current!.props.height -
      moon.current!.props.padding >
      moon.current!.props.position.x &&
    rocket.current!.props.position.y <
      moon.current!.props.position.y + moon.current!.props.height &&
    rocket.current!.props.height + rocket.current!.props.position.y >
      moon.current!.props.position.y;

  // P5 Methods
  const preload = (p5: p5Types) => {
    font.current = p5.loadFont("fonts/Proxima-Nova.otf");
    earthMainImg.current = p5.loadImage("/images/earth-512x512.png");
    moonMainImg.current = p5.loadImage("/images/moon-256x256.png");
    rocketMainImg.current = p5.loadImage("/images/rocket-128x128.png");
    rocketMoving1Img.current = p5.loadImage(
      "/images/rocket-moving-1-128x128.png"
    );
    rocketMoving2Img.current = p5.loadImage(
      "/images/rocket-moving-2-128x128.png"
    );
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    containerRef.current = canvasParentRef;
    CONTAINER_WIDTH.current = canvasParentRef.getBoundingClientRect().width;
    CONTAINER_HEIGHT.current = canvasParentRef.getBoundingClientRect().height;

    const canvas = p5
      .createCanvas(CONTAINER_WIDTH.current, CONTAINER_HEIGHT.current)
      .parent(canvasParentRef);
    canvas.style("z-index", "0");
    canvas.style("position", "absolute");
    canvas.style("left", "50%");
    canvas.style("top", "50%");
    canvas.style("transform", "translate(-50%, -50%)");
    initObjects();
  };

  const touchStarted = (p5: p5Types) => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      onFirstPress();
    }
    if (rocket.current!.onBall(p5.mouseX, p5.mouseY))
      rocket.current!.startDrag(p5.mouseX, p5.mouseY);
  };

  const mouseReleased = (p5: p5Types) => {
    if (
      rocket.current!.props.position.x < 0 ||
      rocket.current!.props.position.x > CONTAINER_WIDTH.current! ||
      rocket.current!.props.position.y < 0 ||
      rocket.current!.props.position.y > CONTAINER_HEIGHT.current!
    ) {
      rocket.current = initRocket(
        CONTAINER_HEIGHT.current!,
        CONTAINER_WIDTH.current!,
        {
          main: rocketMainImg.current!,
          moving1: rocketMoving1Img.current!,
          moving2: rocketMainImg.current!,
          collision: rocketMainImg.current!,
        }
      );
    }
    rocket.current!.endDrag();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0, 0, 1);
    p5.clear();
    rocket.current!.update(
      rocket.current!.props.height / 2,
      CONTAINER_HEIGHT.current! - rocket.current!.props.height / 2,
      p5.mouseX,
      p5.mouseY
    );
    drawEarth(p5);
    drawRocket(p5);
    drawMoon(p5);
    if (
      (checkRocketCollisionWithMoon() ||
        rocket.current!.props.position.x > CONTAINER_WIDTH.current!) &&
      moon.current!.props.collision === false
    ) {
      moon.current!.props.velocity_x = rocket.current!.props.velocity_x * 0.1;
      moon.current!.props.velocity_y = rocket.current!.props.velocity_y * 0.1;
      moon.current!.props.collision = true;
      const velocity = Math.sqrt(
        Math.pow(moon.current!.props.velocity_y, 2) +
          Math.pow(moon.current!.props.velocity_x, 2)
      );
      const speedFloat =
        (CONTAINER_WIDTH.current! < 900 ? velocity * 1.1 : velocity * 0.4) *
        1.08;

      // RESULT
      const speed = Math.floor(speedFloat);
      onFinishGame(speed);
      setTimeout(function () {
        resetGame();
      }, 2000);
      // Update moon
      // if (moon.current!.props.collision === true) {
      //   moon.current!.update(
      //     moon.current!.props.height / 2,
      //     CONTAINER_HEIGHT.current! - moon.current!.props.height / 2
      //   );
      // }
    }
  };

  const windowResized = (p5: p5Types) => {
    CONTAINER_WIDTH.current =
      containerRef.current!.getBoundingClientRect().width;
    CONTAINER_HEIGHT.current =
      containerRef.current!.getBoundingClientRect().height;
    p5.resizeCanvas(CONTAINER_WIDTH.current, CONTAINER_HEIGHT.current);
    initObjects();
  };

  return (
    <Sketch
      className={styles.container}
      setup={setup}
      draw={draw}
      preload={preload}
      mousePressed={touchStarted}
      touchStarted={touchStarted}
      touchEnded={mouseReleased}
      mouseReleased={mouseReleased}
      windowResized={windowResized}
    />
  );
};

export default GameSketch;
