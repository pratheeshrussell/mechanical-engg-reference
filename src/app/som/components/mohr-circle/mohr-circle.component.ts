import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mech-ref-mohr-circle',
  templateUrl: './mohr-circle.component.html',
  styleUrls: ['./mohr-circle.component.css']
})
export class MohrCircleComponent implements OnInit {
  // Ref https://mechanicalc.com/calculators/mohrs-circle/
  constructor() { }

  ngOnInit(): void {
  }

}
