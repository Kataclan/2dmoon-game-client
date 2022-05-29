import { MovingObjectProps, RocketAssets } from "./types";

export interface RocketProps extends MovingObjectProps {
  drag: boolean;
  isFinished: boolean;
  angle: number;
  assets: RocketAssets;
  mouseX: number;
  mouseY: number;
}

export class Rocket {
  public props: RocketProps;

  constructor(props: RocketProps) {
    this.props = props;
  }

  getRocketImg = () => {
    if (!this.props.isFinished) {
      return this.props.assets.main;
    }
    if (this.props.drag) {
      return Math.random() > 0.5
        ? this.props.assets.moving1
        : this.props.assets.moving2;
    }
    return this.props.assets.main;
  };

  onBall = (x: number, y: number) => {
    return (
      x >= this.props.position.x &&
      x <= this.props.position.x + this.props.width &&
      y >= this.props.position.y &&
      y <= this.props.position.y + this.props.height
    );
  };

  startDrag = (mouseX: number, mouseY: number) => {
    this.props.drag = true;
    this.props.mouseX = mouseX;
    this.props.mouseY = mouseY;
  };

  endDrag = () => {
    this.props.drag = false;
  };

  update = (minY: number, maxY: number, mouseX: number, mouseY: number) => {
    this.props.minY = minY;
    this.props.maxY = maxY;
    if (this.props.drag) {
      this.props.position.x = mouseX - this.props.width / 2;
      this.props.position.y = mouseY - this.props.height / 2;
      this.props.velocity_x =
        this.props.velocity_x / 2 + (mouseX - this.props.mouseX);
      this.props.velocity_y =
        this.props.velocity_y / 2 + (mouseY - this.props.mouseY);
      this.props.mouseX = mouseX;
      this.props.mouseY = mouseY;
    } else {
      if (Math.abs(this.props.velocity_x) > 1) {
        this.props.position.x += this.props.velocity_x * 0.5;
        this.props.velocity_x = this.props.velocity_x * 0.5;
      }
      if (Math.abs(this.props.velocity_y) > 1) {
        this.props.position.y += this.props.velocity_y * 0.5;
        this.props.velocity_y = this.props.velocity_y * 0.5;
      }
    }
    this.props.angle = this.props.velocity_x;
  };
}
