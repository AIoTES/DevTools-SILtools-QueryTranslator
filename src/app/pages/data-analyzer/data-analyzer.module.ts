import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DataAnalyzerComponent } from './data-analyzer.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataAnalyzerService } from './data-analyzer.service';
import { NgJsonEditorModule } from 'ang-jsoneditor' 

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NgJsonEditorModule
  ],
  declarations: [
    DataAnalyzerComponent
  ],
  providers: [
    DataAnalyzerService
  ],
})
export class DataAnalyzerModule { }
