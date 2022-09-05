const canvas = document.querySelector("canvas");
//setting canvas width and height to that of the browser
//doing this within style sheet won't have that same effect
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//we use c for shorthand to create a super object so we can render in a 2d space
const c = canvas.getContext("2d");
/*
//fillStyle will take a color can be rgba, hex or text, and color the Rect
//fillStyle will style all rects after it has been declared
c.fillStyle = `rgba(255, 0, 0, 0.3)`;
//fillRect(x, y, width, height);
//using coords we can create 2d objects
c.fillRect(100, 100, 100, 100);
c.fillStyle = `rgba(0, 100, 255, 0.3)`;
c.fillRect(200, 200, 200, 200);
c.fillRect(300, 300, 300, 300);

c.fillStyle = `rgba(180, 0, 255, 0.25)`;
c.fillRect(500, 250, 500, 250);

//Creating a line
c.beginPath();
//moveTo(x, y)
c.moveTo(50, 300);
//lineTo(x, y)
c.lineTo(300, 100);
c.lineTo(200, 500);
c.strokeStyle = "#fa3e32";
//stroke() will draw the line
c.stroke();

//Creating a arc / circle
//arc(x, y, radius, startAngle, endAngle, drawCounterClockwise)
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "black";
c.stroke();

//will generate circles randomly dependate on window height and width
for (let i = 0; i < 100; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255Math.floor(Math.random() * 255)}, 0.8)`;
  c.stroke();
}
*/

let colorArray = ["#FF4858", "#1B7F79", "#00CCC0", "#72F2EB", "#747F7F"];

const mouse = {
  x: undefined,
  y: undefined,
};

const maxRadius = 40;
const minRadius = 5;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.fillStyle = this.color;
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

function init() {
  circleArray = [];

  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1;
    //x and y we take the width and height and we - raidus * 2 then + radius so that our circles don't spawn outside of our canvas specified width and height
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

/**
 * creates a loop that is animated
 */
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
