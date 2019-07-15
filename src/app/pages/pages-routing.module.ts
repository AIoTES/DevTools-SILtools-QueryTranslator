import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'query-builder',
    component: QueryBuilderComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
