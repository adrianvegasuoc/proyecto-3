import './styles/style.css';
import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    // Usamos el div con id="app" como contenedor
    canvas.parent('app');
  };

  p.draw = () => {
    p.background(220);
    p.fill(0);
    p.circle(p.width / 2, p.height / 2, 80);
  };
};

new p5(sketch);
