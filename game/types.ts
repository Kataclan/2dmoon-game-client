import p5 from "p5";

export interface EarthAssets {
  main: p5.Image;
}
export interface MoonAssets {
  main: p5.Image;
}
export interface RocketAssets {
  main: p5.Image;
  collision: p5.Image;
  moving1: p5.Image;
  moving2: p5.Image;
}
export type ObjectAssets = EarthAssets | MoonAssets | RocketAssets;

export interface ObjectProps {
  iWidth: number;
  iHeight: number;
  ratio: number;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  maxY: number;
  minY: number;
  assets: ObjectAssets;
  padding: number;
}
export interface MovingObjectProps extends ObjectProps {
  velocity_x: number;
  velocity_y: number;
  gravity: number;
  collision?: boolean;
}
