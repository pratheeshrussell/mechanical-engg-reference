import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomModule } from './som/som.module';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: '', component: TemplateComponent, pathMatch: 'full'},
  {path: 'som', loadChildren: () => import('./som/som.module').then(m => m.SomModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
