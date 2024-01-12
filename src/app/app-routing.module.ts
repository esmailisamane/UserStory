import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGeneratorComponent } from './table-generator/table-generator.component';

const routes: Routes = [
  { path: 'table-generator', component: TableGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
