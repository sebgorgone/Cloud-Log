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
    let yPoint2;

  const setup = (p5, canvasParentRef) => {
    // create a full-window canvas, or size to parent
    const parentEl = canvasParentRef;
    const w = parentEl.offsetWidth
    p5.createCanvas(w, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(60)
    p5.noStroke();
   
    p5.imageMode(p5.CENTER);

    xPoint1 = p5.width / 4.5;
    yPoint1 = p5.height * (3/ 5); 
    yPoint2 = p5.height * (1 /2);
  };

  const draw = p5 => {
    if (svgImg) {
      p5.background(154, 140, 152);
      cloud(p5, xPoint1, yPoint1);
      cloud2(p5, p5.width * (4 /6), yPoint2)
      p5.image(svgImg, p5.width * (3 / 5), p5.height / 2);
      streams(p5, (p5.width * (3 / 5)) - 53, (p5.height / 2) - 50);
      streams2(p5, (p5.width * (3 / 5)) + 68, (p5.height / 2) - 45);
      streams3(p5, (p5.width * (3 / 5)) - 75, (p5.height / 2) + 50);

      p5.pop();
      p5.textFont('L1')
      p5.fill(255)
      p5.textSize(40)
      p5.text('CloudLog', p5.width * (3 /5), yPoint2 + 100)
      p5.push();

      loadingText(p5, p5.width / 2 - 150, p5.height * (2 / 3))
    }
    if (p5.frameCount % (60 * 10) === 0) {
      xPoint1 = p5.width / 4.5;
      yPoint1 = p5.height * (3/ 5);
      yPoint2 = p5.height * (1 /2);
    }
  };

  function cloud (p5, x, y) {
      p5.push();
      p5.fill(200);
      p5.ellipse(x + 40 , y, p5.width * (1 /12), 20);
      p5.ellipse(x , y, p5.width * (1 /12), 20);
      p5.ellipse(x + 7, y - 5, p5.width * (1 /12), 20);
      p5.ellipse(x + 20, y - 10, p5.width * (1 /12), 20);
      p5.ellipse(x + 27, y - 7, p5.width * (1 /12), 20);
      p5.ellipse(x + 20, y + 5, p5.width * (1 /12), 20);

      const x2 = x + (p5.width * (1 / 5)); 
      const y2 = y - 40;

      p5.ellipse(x2 + 40 , y2, p5.width * (1 /12), 20);
      p5.ellipse(x2 , y2, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 7, y2 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 20, y2 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 27, y2 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 20, y2 + 5, p5.width * (1 /12), 20);

      const x3 = x + (p5.width * (1 / 8)); 
      const y3 = y + 5;

      p5.ellipse(x3 + 40 , y3, p5.width * (1 /12), 20);
      p5.ellipse(x3 , y3, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 7, y3 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 20, y3 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 27, y3 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 20, y3 + 5, p5.width * (1 /12), 20);

      const x4 = x + (p5.width * (1 / 15)); 
      const y4 = y - 8 ;

      p5.ellipse(x4 + 40 , y4, p5.width * (1 /12), 20);
      p5.ellipse(x4 , y4, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 7, y4 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 20, y4 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 27, y4 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 20, y4 + 5, p5.width * (1 /12), 20);

      const x5 = x + (p5.width * (1 / 6.5)); 
      const y5 = y - 12 ;

      p5.ellipse(x5 + 40 , y5, p5.width * (1 /12), 20);
      p5.ellipse(x5 , y5, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 7, y5 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 20, y5 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 27, y5 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 20, y5 + 5, p5.width * (1 /12), 20);

      const x6 = x + (p5.width * (1 / 8.5)); 
      const y6 = y - 25 ;

      p5.ellipse(x6 + 40 , y6, p5.width * (1 /12), 20);
      p5.ellipse(x6 , y6, p5.width * (1 /12), 20);
      p5.ellipse(x6 + 7, y6 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x6 + 20, y6 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x6 + 27, y6 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x6 + 20, y6 + 5, p5.width * (1 /12), 20);

      const x7 = x + (p5.width * (1 / 4.5)); 
      const y7 = y - 25;

      p5.ellipse(x7 + 40 , y7, p5.width * (1 /12), 20);
      p5.ellipse(x7 , y7, p5.width * (1 /12), 20);
      p5.ellipse(x7 + 7, y7 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x7 + 20, y7 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x7 + 27, y7 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x7 + 20, y7 + 5, p5.width * (1 /12), 20);

      const x8 = x; 
      const y8 = y - 55;

      p5.ellipse(x8 + 40 , y8, p5.width * (1 /12), 20);
      p5.ellipse(x8 , y8, p5.width * (1 /12), 20);
      p5.ellipse(x8 + 7, y8 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x8 + 20, y8 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x8 + 27, y8 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x8 + 20, y8 + 5, p5.width * (1 /12), 20);

      p5.pop();
      yPoint1 -= .25
  }

  function cloud2 (p5, x, y) {
      p5.push();
      p5.fill(200);
      p5.ellipse(x + 40 , y, p5.width * (1 /12), 20);
      p5.ellipse(x , y, p5.width * (1 /12), 20);
      p5.ellipse(x + 7, y - 5, p5.width * (1 /12), 20);
      p5.ellipse(x + 20, y - 10, p5.width * (1 /12), 20);
      p5.ellipse(x + 27, y - 7, p5.width * (1 /12), 20);
      p5.ellipse(x + 20, y + 5, p5.width * (1 /12), 20);

      const x2 = x + (p5.width * (1 / 5)); 
      const y2 = y - 40;

      p5.ellipse(x2 + 40 , y2, p5.width * (1 /12), 20);
      p5.ellipse(x2 , y2, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 7, y2 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 20, y2 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 27, y2 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x2 + 20, y2 + 5, p5.width * (1 /12), 20);

      const x3 = x + (p5.width * (1 / 8)); 
      const y3 = y + 5;

      p5.ellipse(x3 + 40 , y3, p5.width * (1 /12), 20);
      p5.ellipse(x3 , y3, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 7, y3 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 20, y3 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 27, y3 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x3 + 20, y3 + 5, p5.width * (1 /12), 20);

      const x4 = x + (p5.width * (1 / 15)); 
      const y4 = y - 8 ;

      p5.ellipse(x4 + 40 , y4, p5.width * (1 /12), 20);
      p5.ellipse(x4 , y4, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 7, y4 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 20, y4 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 27, y4 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x4 + 20, y4 + 5, p5.width * (1 /12), 20);

      const x5 = x + (p5.width * (1 / 6.5)); 
      const y5 = y - 12 ;

      p5.ellipse(x5 + 40 , y5, p5.width * (1 /12), 20);
      p5.ellipse(x5 , y5, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 7, y5 - 5, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 20, y5 - 10, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 27, y5 - 7, p5.width * (1 /12), 20);
      p5.ellipse(x5 + 20, y5 + 5, p5.width * (1 /12), 20);

      p5.pop();
  }

  function streams (p5, x, y) {
    p5.push()
    p5.stroke(255);
    p5.strokeWeight(2)
    p5.frameCount % 20 === 0 && p5.line(x , y , x , y - 20);
    p5.frameCount % 15 === 0 && p5.line(x- 3 , y - 2 , x - 3 , y - 22);
    p5.frameCount % 23 === 0 && p5.line(x - 6 , y - 10 , x - 6, y - 20);
    p5.frameCount % 17 === 0 && p5.line(x + 3 , y - 2 , x + 3 , y - 23);
    p5.frameCount % 20 === 0 && p5.line(x , y-5 , x , y - 30);
    p5.frameCount % 21 === 0 && p5.line(x - 7 , y-5 , x - 7 , y - 25);
    p5.frameCount % 18 === 0 && p5.line(x + 6 , y-5 , x + 6 , y - 25);
    p5.pop();
  }

  function streams2 (p5, x, y) {
    p5.push()
    p5.stroke(255);
    p5.strokeWeight(2)
    p5.frameCount % 25 === 0 && p5.line(x , y , x , y - 20);
    p5.frameCount % 25 === 0 && p5.line(x- 3 , y - 2 , x - 3 , y - 22);
    p5.frameCount % 14 === 0 && p5.line(x - 6 , y - 10 , x - 6, y - 20);
    p5.frameCount % 30 === 0 && p5.line(x + 3 , y - 2 , x + 3 , y - 23);
    p5.frameCount % 19 === 0 && p5.line(x , y-5 , x , y - 30);
    p5.frameCount % 17 === 0 && p5.line(x - 7 , y-5 , x - 7 , y - 25);
    p5.frameCount % 18 === 0 && p5.line(x + 6 , y-5 , x + 6 , y - 25);
    p5.pop();
  }

  function streams3 (p5, x, y) {
    p5.push()
    p5.stroke(255);
    p5.strokeWeight(2)
    p5.frameCount % 12 === 0 && p5.line(x , y , x , y - 20);
    p5.frameCount % 30 === 0 && p5.line(x- 3 , y - 2 , x - 3 , y - 22);
    p5.frameCount % 18 === 0 && p5.line(x - 6 , y - 10 , x - 6, y - 20);
    p5.frameCount % 9 === 0 && p5.line(x + 3 , y - 2 , x + 3 , y - 23);
    p5.frameCount % 24 === 0 && p5.line(x , y-5 , x , y - 30);
    p5.frameCount % 21 === 0 && p5.line(x - 7 , y-5 , x - 7 , y - 25);
    p5.frameCount % 13 === 0 && p5.line(x + 6 , y-5 , x + 6 , y - 25);
    p5.pop();

    yPoint2 -= .1
  }

  function loadingText (p5, x, y) {
    p5.push();
    p5.fill(255);
    p5.textFont('L1')
    p5.fill(255)
    p5.textSize(40)
    p5.text(loadingAnim(p5), x, y)
    p5.pop();
  }

  function loadingAnim (p5) {
    if (p5.frameCount % 30 > 20) return 'Loading...'
    if (p5.frameCount % 30 > 10) return 'Loading..'
    return 'Loading.'
  }

  return <Sketch preload={preload} setup={setup} draw={draw} />;
}


export default LoadPage