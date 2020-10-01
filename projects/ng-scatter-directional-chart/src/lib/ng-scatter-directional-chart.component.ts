import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-scatter-directional-chart',
  template: `
    <div #wrapper [ngStyle]="style" (window:resize)="onResize($event)">
      <canvas #canvas style="width: 100%; height: 100%; transform: rotateZ(270deg);"></canvas>
    </div>
  `,
  styles: [
  ]
})
export class NgScatterDirectionalChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;

  @Input() style: object = {};

  @Input() dataPoint = 100;
  @Input() lineWidth = 2;
  @Input() pointWidth = 2;
  @Input() pointColor = 'white';
  @Input() pointRadius = 15;
  @Input() pointBorderColor = 'white';
  @Input() lineColor = 'black';
  @Input() lineNumber = false;
  @Input() backgroundImage: string = null;
  @Input() backgroundColor: string = null;

  @Input() data = [];

  ratioX = 1;
  ratioY = 1;

  ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    const bgc = this.backgroundColor ? { 'background-color': this.backgroundColor } : {};
    const bg = this.backgroundImage ? { 'background-image': `url('${this.backgroundImage}')` } : {};

    this.style = {
      ...{
        width: '100%',
        'background-color': 'transparent',
        'background-position': 'center',
        'background-repeat': 'no-repeat'
      },
      ...this.style,
      ...bg,
      ...bgc
    };
  }

  ngAfterViewInit(): void {
    this.plotGraph();
  }

  plot(b: number, y1: number, y2: number, x1: number, x2: number): void {
    this.ctx.translate(0, 0);
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.lineColor;
    const magnitude = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const i = (this.pointRadius * (x2 - x1)) / magnitude;
    const j = (this.pointRadius * (y2 - y1)) / magnitude;
    if (!magnitude) {
      console.log(b + 1, magnitude, x1, y1, x2, y2, i, j, x1 + i, y1 + j);
    }
    this.ctx.moveTo(x1 + i, y1 + j);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    if (b === 0) {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.pointWidth;
      this.ctx.strokeStyle = this.pointBorderColor;
      this.ctx.arc(x1, y1, this.pointRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.pointColor;
      this.ctx.fill();
      this.ctx.stroke();
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = this.pointWidth;
    this.ctx.strokeStyle = this.pointBorderColor;
    this.ctx.arc(x2, y2, this.pointRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.pointColor;
    this.ctx.fill();
    this.ctx.stroke();
    const angle = (y2 - y1) / (x2 - x1);

    let lineAngle = Math.atan(angle);

    let inverter = 1;
    if (lineAngle < Math.PI) {
      if (y1 > y2) {
        lineAngle += Math.PI;
        inverter = -1;
      }
    } else {
      inverter = -1;
      lineAngle += Math.PI;
    }
    if (x1 > x2) {
      inverter = 1;
    }
    if (x1 > x2 && (y1 < y2 || y1 === y2)) {
      inverter = -1;
    }

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.translate(0, 0);
    this.ctx.translate((x2 + x1) / 2, (y2 + y1) / 2);
    this.ctx.rotate(lineAngle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-6 * inverter, -6);
    this.ctx.stroke();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-6 * inverter, 6);
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.save();
    this.ctx.translate((x2 + x1) / 2, (y2 + y1) / 2);

    if (this.lineNumber) {
      this.ctx.strokeText((b + 1).toString(), 7, 10);
    }

    this.ctx.restore();
  }

  onResize(event): void {
    this.plotGraph();
  }

  plotGraph(): void {
    this.wrapper.nativeElement.style.height = this.wrapper.nativeElement.offsetWidth + 'px';
    this.canvas.nativeElement.width = this.wrapper.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.wrapper.nativeElement.clientHeight;
    this.ratioX = this.canvas.nativeElement.offsetWidth / this.dataPoint;
    this.ratioY = this.canvas.nativeElement.offsetHeight / this.dataPoint;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    for (let i = 0; i < this.data.length - 1; i++) {
      const x1 = this.data[i].x * this.ratioX;
      const y1 = this.data[i].y * this.ratioY;
      const x2 = this.data[i + 1].x * this.ratioX;
      const y2 = this.data[i + 1].y * this.ratioY;
      this.plot(i, x1, x2, y1, y2);
    }
  }

}
