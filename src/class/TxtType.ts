export class TxtType {
  text: string = "";
  toRotate: string[];
  el: HTMLAnchorElement;
  loopNum: number = 0;
  period: number;
  tick: () => void;
  isDeleting: boolean = false;

  constructor(el: HTMLAnchorElement, toRotate: string[], period: number) {
    this.el = el;
    this.period = period || 2000;
    this.toRotate = toRotate;
    this.tick();
  }
}

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];
  console.log(i);

  if (this.isDeleting) {
    this.text = fullTxt.substring(0, this.text.length - 1);
  } else {
    this.text = fullTxt.substring(0, this.text.length + 1);
  }
  console.log(this.text);

  this.el.innerHTML = `<span class="wrap">${this.text}</span>`;

  let that = this;
  // var delta = 200 - Math.random() * 100;
  let delta = 200;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.text === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(() => {
    that.tick();
  }, delta);
};
