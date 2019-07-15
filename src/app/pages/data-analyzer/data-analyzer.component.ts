import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dataAnalyserData } from '../../@core/data/data-analyzer-data';
import { DataAnalyzerService } from './data-analyzer.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';

@Component({
    selector: 'ngx-data-analyzer',
    styleUrls: ['./data-analyzer.component.scss'],
    templateUrl: './data-analyzer.component.html',
})
export class DataAnalyzerComponent implements OnInit {
    dataModel: Array<any> = [];
    tempDataModel: Array<any> = [];
    analyzedDataModel: Array<any> = [];
    showAnalyzedDataTable: boolean = false;
    showAnalyzedDataJson: boolean = false;
    public editorOptions: JsonEditorOptions;
    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

    analyzedDataHref = "";

    settings: any = this.defaultTableSettings;
    analyzedDataSettings: any = this.defaultTableSettings;

    analysisAlgorithms: any = dataAnalyserData.analysisAlgorithms;
    selectedAlgorithm: any = null;

    constructor(private dataAnalyzerService: DataAnalyzerService) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['tree'];
        this.editorOptions.expandAll = true;
     }

    ngOnInit() {

    }

    get enabledExportButtons() {
        return this.showAnalyzedDataTable || this.showAnalyzedDataJson;
    }

    uploadFile() {
        this.dataModel = JSON.parse(JSON.stringify(this.tempDataModel));

        this.createTableColumns();
    }

    onFileChange(event) {
        var files = event.srcElement.files;

        var reader = new FileReader();

        reader.onload = (e: any) => {
            if (this.getFileExtension(files[0]) == "json") {
                this.tempDataModel = JSON.parse(e.target.result);
            }
        }
        reader.readAsText(files[0]);
    }

    getFileExtension(file): string {
        return file.name.split('.')[1];
    }

    createTableColumns() {
        const newSettings = this.defaultTableSettings;

        if (this.dataModel && this.dataModel.length > 0) {
            for (var property in this.dataModel[0]) {
                if (this.dataModel[0].hasOwnProperty(property)) {
                    newSettings.columns[property] = { title: property };
                }
            }
        }

        this.settings = Object.assign({}, newSettings);
    }

    createAnalyzeTableColumns() {
        const newSettings = this.defaultTableSettings;

        if (this.analyzedDataModel && this.analyzedDataModel.length > 0) {
            for (var property in this.analyzedDataModel[0]) {
                if (this.analyzedDataModel[0].hasOwnProperty(property)) {
                    newSettings.columns[property] = { title: property };
                }
            }
        }

        this.analyzedDataSettings = Object.assign({}, newSettings);
    }

    get defaultTableSettings(): any {
        return {
            actions: false,
            columns: {},
        };
    }

    get selectedAlgorithmObj() {
        let algorithm: any = null;
        this.analysisAlgorithms.groups.forEach(x => {
            x.algorithms.forEach(z => {
                if (z.id == this.selectedAlgorithm) {
                    algorithm = z;
                }
            })
        });

        return algorithm;
    }

    get selectedModelProperties() {
        const columns = [];

        if (this.dataModel && this.dataModel.length > 0) {
            for (var property in this.dataModel[0]) {
                if (this.dataModel[0].hasOwnProperty(property)) {
                    columns.push(property);
                }
            }
        }

        return columns;
    }

    addFeature(item) {
        if (!item.items)
            item.items = [];

        item.items.push(JSON.parse(JSON.stringify(item.options)));
    }

    analyseData() {
        this.showAnalyzedDataJson = false;
        this.showAnalyzedDataTable = false;

        const url: string = this.selectedAlgorithmObj.serviceUrl;

        const payload = {
            data: this.dataModel,
            options: {

            }
        };

        this.selectedAlgorithmObj.options.attributes.forEach(x => {
            if (x.type == 'selectSingle' || x.type == 'inputNumber' || x.type == 'selectMultiple') {
                payload.options[x.propertyName] = x.selectedAttributeValue;
            }

            if (x.type == 'minMax') {
                payload.options[x.propertyName] = [x.selectedAttributeValueMin, x.selectedAttributeValueMax];
            }

            if (x.type == 'objectArray') {

                payload.options[x.propertyName] = [];
                x.items.forEach(y => {
                    const ob = {};
                    y.forEach(z => {
                        if (z.type == 'selectMultiple' || z.type == 'inputText') {
                            ob[z.propertyName] = z.selectedAttributeValue;
                        }
                    });
                    payload.options[x.propertyName].push(ob);
                });
            }
        });

        this.dataAnalyzerService.getData(url, payload).subscribe(x => {
            this.analyzedDataModel = x;
            if(Array.isArray(x)){
                this.showAnalyzedDataTable = true;
                this.createAnalyzeTableColumns();
            }else{
                this.showAnalyzedDataJson = true;
            }
            
        });
    }

    exportJson() {
        this.analyzedDataHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.analyzedDataModel));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", this.analyzedDataHref);
        dlAnchorElem.setAttribute("download", "data.json");
        dlAnchorElem.click();
    }

    exportCSV() {
        const headers = [];
        if (this.analyzedDataModel && this.analyzedDataModel.length > 0) {
            for (var property in this.analyzedDataModel[0]) {
                if (this.analyzedDataModel[0].hasOwnProperty(property)) {
                    headers.push(property);
                }
            }
        }

        new AngularCsv(this.analyzedDataModel, 'My Report', { showLabels: true, headers: headers });
    }
}
