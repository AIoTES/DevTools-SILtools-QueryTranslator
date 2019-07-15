import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { QueryBuilderComponent } from './query-builder.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgJsonEditorModule } from 'ang-jsoneditor';

@NgModule({
  imports: [
    ThemeModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgJsonEditorModule
  ],
  declarations: [
    QueryBuilderComponent
  ],
  providers: [
    
  ],
})
export class QueryBuilderModule { }