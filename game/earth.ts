import { ObjectProps } from "./types";

export interface EarthProps extends ObjectProps {}

export class Earth {
  public props: EarthProps;

  constructor(props: EarthProps) {
    this.props = props;
    this.props.height = this.props.iHeight / this.props.ratio;
    this.props.width = this.props.iWidth / this.props.ratio;
  }
}
