import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MohrCircleComponent } from './components/mohr-circle/mohr-circle.component';
import { MohrCalcComponent } from './components/mohr-circle/subpages/mohr-calc/mohr-calc.component';
import { MohrIntroComponent } from './components/mohr-circle/subpages/mohr-intro/mohr-intro.component';
import { SomTemplateComponent } from './som-template/som-template.component';
import { SomIntroComponent } from './som-template/subpages/som-intro/som-intro.component';

const routes: Routes = [
  { path: '', component: SomTemplateComponent,
    children: [
      { path: '', component: SomIntroComponent, pathMatch: 'full'},
      { path: 'mohr', component: MohrCircleComponent,
      children: [
        { path: '', component: MohrIntroComponent, pathMatch: 'full'},
        { path: 'calc', component: MohrCalcComponent, }
      ] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomRoutingModule { }
