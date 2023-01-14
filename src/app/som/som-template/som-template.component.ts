import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mech-ref-som-template',
  templateUrl: './som-template.component.html',
  styleUrls: ['./som-template.component.css']
})
export class SomTemplateComponent implements OnInit {

  showSidebarOnSmallScreen = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebarOnSmallScreen(){
    this.showSidebarOnSmallScreen = !this.showSidebarOnSmallScreen
  }
}
