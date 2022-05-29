import { Moon } from "game/moon";
import { Rocket } from "game/rocket";
import { EarthAssets, MoonAssets, RocketAssets } from "game/types";
import { Earth } from "./earth";

export function initEarh(
  containerHeight: number,
  containerWidth: number,
  assets: EarthAssets
) {
  const iWidth = 512;
  const iHeight = 512;
  const ratio = 2;
  const width = iWidth / ratio;
  const height = iHeight / ratio;

  const earthProps = {
    iHeight,
    iWidth,
    ratio,
    width,
    height,
    position: {
      y: containerHeight - height / 2,
      x: 0 - width / 2,
    },
    minY: height / 2,
    maxY: containerHeight - height,
    padding: 0,
    collision: false,
    assets,
  };

  return new Earth(earthProps);
}

export function initRocket(
  containerHeight: number,
  containerWidth: number,
  assets: RocketAssets
) {
  const iWidth = 128;
  const iHeight = 128;
  const ratio = 1.5;
  const width = iWidth / ratio;
  const height = iHeight / ratio;

  const rocketProps = {
    iHeight,
    iWidth,
    ratio,
    width,
    height,
    position: {
      y: containerHeight - height, // bottom left corner
      x: 10,
    },
    minY: height / 2,
    maxY: containerHeight - height,
    padding: 0,
    velocity_y: 0,
    velocity_x: 0,
    angle: 0,
    gravity: 0.5,
    drag: false,
    isFinished: false,
    assets,
    mouseX: 0,
    mouseY: 0,
    img: assets.main,
  };

  return new Rocket(rocketProps);
}

export function initMoon(
  containerHeight: number,
  containerWidth: number,
  assets: MoonAssets
) {
  const iWidth = 256;
  const iHeight = 256;
  const ratio = 1.5;
  const width = iWidth / ratio;
  const height = iHeight / ratio;
  const padding = 10;

  const moonProps = {
    iHeight,
    iWidth,
    ratio,
    width,
    height,
    position: {
      y: 0 - height / 2 + padding,
      x: containerWidth - width / 2 - padding,
    },
    minY: height / 2,
    maxY: containerHeight - height,
    padding: 10,
    velocity_x: 0,
    velocity_y: 0,
    gravity: 0.5,
    collision: false,
    assets,
  };
  return new Moon(moonProps);
}
