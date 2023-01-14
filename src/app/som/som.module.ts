import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomRoutingModule } from './app-routing.module';
import { MohrCircleComponent } from './components/mohr-circle/mohr-circle.component';
import { SomTemplateComponent } from './som-template/som-template.component';
import { MohrIntroComponent } from './components/mohr-circle/subpages/mohr-intro/mohr-intro.component';
import { MohrCalcComponent } from './components/mohr-circle/subpages/mohr-calc/mohr-calc.component';
import { SomIntroComponent } from './som-template/subpages/som-intro/som-intro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SomSidebarComponent } from './components/som-sidebar/som-sidebar.component';
import { AppcommonModule } from '../appcommon/appcommon.module';



@NgModule({
  declarations: [
    MohrCircleComponent,
    MohrIntroComponent,
    MohrCalcComponent,
    SomTemplateComponent,
    SomIntroComponent,
    SomSidebarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SomRoutingModule,
    AppcommonModule
  ]
})
export class SomModule { }
