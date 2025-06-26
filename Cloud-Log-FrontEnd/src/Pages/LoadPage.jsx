import { getPallette } from "../logInputWidget";
import 'p5.js-svg'
import Sketch from 'react-p5';

let svgImg;

function LoadPage () {
  const preload = (p5) => {
    svgImg = p5.loadImage('/cloudLogIconWhite.png');
  };

    let xPoint1;
    let yPoint1;

    const initialX = p5.width / 3;;
    const initialY = p5.height * (3 / 5);

  const setup = (p5, canvasParentRef) => {
    // create a full-window canvas, or size to parent
    const parentEl = canvasParentRef;
    const w = parentEl.offsetWidth
    p5.createCanvas(w, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(40)
    p5.noStroke();
   
    p5.imageMode(p5.CENTER);

    xPoint1 = p5.width / 3;
    yPoint1 = p5.height * (3/ 5);
  };

  const draw = p5 => {
    if (svgImg) {
      p5.background(154, 140, 152);
      cloud(p5, xPoint1, yPoint1);
      p5.image(svgImg, p5.width * (3 / 5), p5.height / 2);
      // cloud(p5, xPoint1, yPoint1)
    }
  };

  function cloud (p5, x, y) {
      p5.push();
      p5.fill(200);
      p5.ellipse(x + 40 , y, 40, 20);
      p5.ellipse(x , y, 40, 20);
      p5.ellipse(x + 7, y - 5, 40, 20);
      p5.ellipse(x + 20, y - 10, 40, 20);
      p5.ellipse(x + 27, y - 7, 40, 20);
      p5.ellipse(x + 20, y + 5, 40, 20);

      const x2 = x + (p5.width * (1 / 5)); 
      const y2 = y - 40;

      p5.ellipse(x2 + 40 , y2, 40, 20);
      p5.ellipse(x2 , y2, 40, 20);
      p5.ellipse(x2 + 7, y2 - 5, 40, 20);
      p5.ellipse(x2 + 20, y2 - 10, 40, 20);
      p5.ellipse(x2 + 27, y2 - 7, 40, 20);
      p5.ellipse(x2 + 20, y2 + 5, 40, 20);

      const x3 = x + (p5.width * (1 / 8)); 
      const y3 = y + 5;

      p5.ellipse(x3 + 40 , y3, 40, 20);
      p5.ellipse(x3 , y3, 40, 20);
      p5.ellipse(x3 + 7, y3 - 5, 40, 20);
      p5.ellipse(x3 + 20, y3 - 10, 40, 20);
      p5.ellipse(x3 + 27, y3 - 7, 40, 20);
      p5.ellipse(x3 + 20, y3 + 5, 40, 20);

      const x4 = x + (p5.width * (1 / 15)); 
      const y4 = y - 10 ;

      p5.ellipse(x4 + 40 , y4, 40, 20);
      p5.ellipse(x4 , y4, 40, 20);
      p5.ellipse(x4 + 7, y4 - 5, 40, 20);
      p5.ellipse(x4 + 20, y4 - 10, 40, 20);
      p5.ellipse(x4 + 27, y4 - 7, 40, 20);
      p5.ellipse(x4 + 20, y4 + 5, 40, 20);

      const x5 = x + (p5.width * (1 / 6.5)); 
      const y5 = y - 12 ;

      p5.ellipse(x5 + 40 , y5, 40, 20);
      p5.ellipse(x5 , y5, 40, 20);
      p5.ellipse(x5 + 7, y5 - 5, 40, 20);
      p5.ellipse(x5 + 20, y5 - 10, 40, 20);
      p5.ellipse(x5 + 27, y5 - 7, 40, 20);
      p5.ellipse(x5 + 20, y5 + 5, 40, 20);

      const x6 = x + (p5.width * (1 / 8.5)); 
      const y6 = y - 35 ;

      p5.ellipse(x6 + 40 , y6, 40, 20);
      p5.ellipse(x6 , y6, 40, 20);
      p5.ellipse(x6 + 7, y6 - 5, 40, 20);
      p5.ellipse(x6 + 20, y6 - 10, 40, 20);
      p5.ellipse(x6 + 27, y6 - 7, 40, 20);
      p5.ellipse(x6 + 20, y6 + 5, 40, 20);

      const x7 = x + (p5.width * (1 / 4.5)); 
      const y7 = y - 25;

      p5.ellipse(x7 + 40 , y7, 40, 20);
      p5.ellipse(x7 , y7, 40, 20);
      p5.ellipse(x7 + 7, y7 - 5, 40, 20);
      p5.ellipse(x7 + 20, y7 - 10, 40, 20);
      p5.ellipse(x7 + 27, y7 - 7, 40, 20);
      p5.ellipse(x7 + 20, y7 + 5, 40, 20);

      const x8 = x; 
      const y8 = y - 55;

      p5.ellipse(x8 + 40 , y8, 40, 20);
      p5.ellipse(x8 , y8, 40, 20);
      p5.ellipse(x8 + 7, y8 - 5, 40, 20);
      p5.ellipse(x8 + 20, y8 - 10, 40, 20);
      p5.ellipse(x8 + 27, y8 - 7, 40, 20);
      p5.ellipse(x8 + 20, y8 + 5, 40, 20);

      p5.pop();
      yPoint1--
  }

  return <Sketch preload={preload} setup={setup} draw={draw} />;
}


export default LoadPage