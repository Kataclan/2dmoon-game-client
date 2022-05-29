import { MovingObjectProps } from "./types";

export interface MoonProps extends MovingObjectProps {}
export class Moon {
  public props: MoonProps;

  constructor(props: MoonProps) {
    this.props = props;
    this.props.height = this.props.iHeight / this.props.ratio;
    this.props.width = this.props.iWidth / this.props.ratio;
  }

  update = (minY: number, maxY: number) => {
    this.props.minY = minY;
    this.props.maxY = maxY;
    this.props.velocity_y = this.props.velocity_y + this.props.gravity;
    this.props.position.y = this.props.position.y + this.props.velocity_y;
    this.props.position.x = this.props.position.x + this.props.velocity_x;
    this.props.velocity_x = this.props.velocity_x * 0.99;
  };
}
