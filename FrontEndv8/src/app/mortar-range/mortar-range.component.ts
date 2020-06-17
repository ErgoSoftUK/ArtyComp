import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-mortar-range',
  templateUrl: './mortar-range.component.html',
  styleUrls: ['./mortar-range.component.scss']
})
export class MortarRangeComponent implements AfterViewInit{
  batteries = [
    {
      name: 'Mk6 Mortar', charges: [
        {distance: 'Close', range: '34-499', v: 70},
        {distance: 'Medium', range: '139-1998', v: 140},
        {distance: 'Far', range: '284-4078', v: 200}
      ]
    },
    {
      name: 'M5 MLRS', charges: [
        {distance: 'Close', range: '799-4604', v: 212.5},
        {distance: 'Medium', range: '3918-18418', v: 425},
        {distance: 'Far', range: '7196-41422', v: 637.5},
        {distance: 'Full', range: '12793-73674', v: 772.5}
      ]
    },
    {
      name: 'M4 Scorcher', charges: [
        {distance: 'Close', range: '826-2415', v: 153.9},
        {distance: 'Medium', range: '2059-6021', v: 243},
        {distance: 'Far', range: '5271-15414', v: 388.8},
        {distance: 'Full', range: '14644-42818', v: 648},
        {distance: 'Extreme', range: '22881-66903', v: 810}
      ]
    },
    {
      name: 'M6 Mortar (3CB)', charges: [
        {distance: 'Close', range: '200-800', v: 88.9},
        {distance: 'Medium', range: '400-1200', v: 109.8},
        {distance: 'Far', range: '600-1700', v: 130.2},
        {distance: 'Full', range: '800-2350', v: 152.5},
      ]
    }
  ];

  battery: any = this.batteries[0];
  charge: any = this.battery.charges[2];

  locx: number = 1045;
  locy: number = 1356;
  locz: number = 70;

  tgtx: number = 1342;
  tgty: number = 1204;
  tgtz: number = 2;

  g = 9.80665;

  // Outputs
  range: number;
  altDiff: number;
  bearingEast: number;
  bearingWest: number;
  eleHigh: number;
  etaHigh: number;
  eleLow: number;
  etaLow: number;

  constructor() { }

  ngAfterViewInit() {
    this.calculateRangeBearingAlt();
  }

  calculateRangeBearingAlt() {
    const A = this.tgtx - this.locx;
    const B = this.tgty - this.locy;
    this.bearingEast = +(90 - ((180 / Math.PI) * Math.atan(B / A))).toFixed(4);
    this.bearingWest = +(270 - ((180 / Math.PI) * Math.atan(B / A))).toFixed(4);
    this.range = +(Math.sqrt(Math.pow(A, 2) + Math.pow(B, 2)) * 10).toFixed(4);
    this.altDiff = this.tgtz - this.locz;

    this.calculateEleEta();
  }

  calculateEleEta() {
    // Ensure charge is relevant to battery
    if (this.battery.charges.indexOf(this.charge) == -1)
      this.charge = this.battery.charges[0];

/* V1
    const v2 = Math.pow(this.charge.v, 2);
    const v4 = Math.pow(this.charge.v, 4);
    const r2 = Math.pow(this.range, 2);
    const g2 = Math.pow(this.g, 2);
    const gRange = this.g * this.range;
    const arcVar = Math.sqrt(v4 - (g2 * r2) - (2 * this.altDiff * v2)); // √(v⁴ - (g² x r²) - (2av²))
    const hiArc = v2 + arcVar;                                          // v² + √(v⁴ - (g² x r²) - (2av²))
    const loArc = v2 - arcVar;                                          // v² - √(v⁴ - (g² x r²) - (2av²))
    this.eleHigh = +(Math.atan(hiArc / gRange) * (180 / Math.PI)).toFixed(4);
    this.eleLow = +(Math.atan(loArc / gRange) * (180 / Math.PI)).toFixed(4);
*/
/* V2
    const v2 = Math.pow(this.charge.v, 2);        // v²
    const v4 = Math.pow(this.charge.v, 4);        // v⁴
    const gx2= this.g * Math.pow(this.range, 2);  // gx²
    const yv2 = 2*(-this.altDiff)*v2;                // 2yv²
    const gx = this.g * this.range;                  // gx
    const ggx222yv2 = this.g * (gx2+yv2);            // g(gx² + 2yv²)
    const v4ggx222yv2 = v4-ggx222yv2;                // v⁴ - g(gx² + 2yv²)
    const sqrt = Math.sqrt(v4ggx222yv2)              // √(v⁴ - g(gx² + 2yv²))
    const hi = (v2 + sqrt) / gx;                     // v² + √(v⁴ - g(gx² + 2yv²))
    const lo = (v2 - sqrt) / gx;                     // v² - √(v⁴ - g(gx² + 2yv²))
    this.eleHigh = +(Math.atan(hi) * (180 / Math.PI)).toFixed(4);
    this.eleLow = +(Math.atan(lo) * (180 / Math.PI)).toFixed(4);
*/
    // V3       (ACos(((gx²/v²) - h) / √(x² + h²)) + ATan(x/h))/2

    const x = this.range;
    const h = -this.altDiff;
    const phi = Math.atan(x/h);                      // ATAN(x/h)
    const v2 = Math.pow(this.charge.v, 2);           // v²
    const gx2= this.g * Math.pow(x, 2);              // gx²
    const gx2_v2_h = (gx2/v2) - h;                      // (gx²/v²) - h
    const h2_x2 = Math.pow(h,2) + Math.pow(x,2);  // x² + h²
    const sqrt = Math.sqrt(h2_x2)                       // √(x² + h²)

    this.eleHigh = +((Math.acos(gx2_v2_h/sqrt)+phi) * (180 / Math.PI) / 2).toFixed(2);
    this.eleLow = +((Math.acos(gx2_v2_h/-sqrt)+phi) * (180 / Math.PI) / 2 - 90).toFixed(2);

    this.etaHigh = +Math.abs(this.range / (this.charge.v * Math.cos((Math.PI / 180) * this.eleHigh))).toFixed(2);
    this.etaLow = +Math.abs(this.range / (this.charge.v * Math.cos((Math.PI / 180) * this.eleLow))).toFixed(2);
  }
}
