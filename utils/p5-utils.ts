import p5Type from "p5";

export const rotateAndDrawImage = (
  p5: p5Type,
  imgURL: p5Type.Image,
  img_x: number,
  img_y: number,
  img_width: number,
  img_height: number,
  img_angle: number
) => {
  p5.imageMode(p5.CENTER);
  p5.translate(img_x + img_width / 2, img_y + img_width / 2);
  p5.rotate((p5.PI / 180) * img_angle);
  p5.image(imgURL, 0, 0, img_width, img_height);
  p5.rotate((-p5.PI / 180) * img_angle);
  p5.translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
  p5.imageMode(p5.CORNER);
};
