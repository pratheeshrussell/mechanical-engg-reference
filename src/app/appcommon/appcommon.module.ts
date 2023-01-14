import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphPlotterComponent } from './components/graph-plotter/graph-plotter.component';



@NgModule({
  declarations: [
    GraphPlotterComponent,
  ],
  exports:[
    GraphPlotterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppcommonModule { }
