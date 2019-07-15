import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonEditorOptions } from 'ang-jsoneditor';

@Component({
    selector: 'ngx-query-builder',
    styleUrls: ['./query-builder.component.scss'],
    templateUrl: './query-builder.component.html',
})
export class QueryBuilderComponent implements OnInit {
    editorOptions: JsonEditorOptions = new JsonEditorOptions();
    model = {
        deviceType: null,
        platform: null,
        ds: null,
        deviceId: "",
        fromDate: null,
        toDate: null,
        fromTime: {
            hour: 0, minute: 0
        },
        toTime: {
            hour: 0, minute: 0
        }
    };

    dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'label',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false
    };

    deviceTypes = [];
    platforms = [];
    ds = [];

    apis = [{
        url: "https://api.ds_gr.eu/get_data/luminocity",
        method: "GET",
        headers: "Authentication: Basic",
        body: '{"sensor": "light_sensor"}',
        showDetails: true
    }, {
        url: "https://api.ds_gr.eu/get_data/luminocity",
        method: "GET",
        headers: "Authentication: Basic",
        body: '{"sensor": "light_sensor"}'
    }];

    responseData = [{
        url: "https://api.ds_gr.eu/get_data/luminocity",
        method: "GET",
        headers: "Authentication: Basic",
        body: '{"sensor": "light_sensor"}'
    }, {
        url: "https://api.ds_gr.eu/get_data/luminocity",
        method: "GET",
        headers: "Authentication: Basic",
        body: '{"sensor": "light_sensor"}'
    }];

    constructor(private http: HttpClient) {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.mode = 'text';
        this.editorOptions.modes = ['text'];
        this.editorOptions.expandAll = true;
    }

    ngOnInit() {
        this.http.get("assets/data/data.json").subscribe((x: any) => {
            this.ds = x.ds;
            this.platforms = x.platforms;
            this.deviceTypes = x.deviceTypes;
        });
    }

    clearForm() {
        this.model = {
            deviceType: null,
            platform: null,
            ds: null,
            deviceId: "",
            fromDate: null,
            toDate: null,
            fromTime: {
                hour: 0, minute: 0
            },
            toTime: {
                hour: 0, minute: 0
            }
        };
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    onDeviceTypeItemSelect(item: any) {
        this.model.deviceId = "";
    }

    onDeviceTypeSelectAll(item: any) {
        this.model.deviceId = "";
    }

    onPlatformItemSelect(item: any) {
        this.model.ds = null;
    }

    onPlatformSelectAll(item: any) {
        this.model.ds = null;
    }

    onDsItemSelect(item: any) {
        this.model.platform = null;
    }

    onDsSelectAll(item: any) {
        this.model.platform = null;
    }

    deviceIdChanged() {
        this.model.deviceType = null;
    }

    search() {
        if (this.model.platform == null && this.model.ds == null) {
            alert("Please provide at least on platform or a deployment site");
            return false;
        }

        const requestModel: any = {};

        if (this.model.deviceId && this.model.deviceId != "") {
            requestModel.deviceID = this.model.deviceId.split(",");
        }

        if (this.model.deviceType && this.model.deviceType.length > 0) {
            requestModel.deviceType = [];
            this.model.deviceType.forEach(x => {
                requestModel.deviceType.push(x.id ? x.id : x);
            });
        }

        if (this.model.ds && this.model.ds.length > 0) {
            requestModel.ds = [];
            this.model.ds.forEach(x => {
                requestModel.ds.push(x.id ? x.id : x);
            });
        }

        if (this.model.platform && this.model.platform.length > 0) {
            requestModel.platform = [];
            this.model.platform.forEach(x => {
                requestModel.platform.push(x.id ? x.id : x);
            });
        }

        if (this.model.fromDate && this.model.fromDate != "") {
            requestModel.startDate = new Date(this.model.fromDate.year, this.model.fromDate.month - 1, this.model.fromDate.day);

            requestModel.startDate.setHours(this.model.fromTime.hour);
            requestModel.startDate.setMinutes(this.model.fromTime.minute);
        }

        if (this.model.toDate && this.model.toDate != "") {
            requestModel.endDate = new Date(this.model.toDate.year, this.model.toDate.month - 1, this.model.toDate.day);

            requestModel.endDate.setHours(this.model.toTime.hour);
            requestModel.endDate.setMinutes(this.model.toTime.minute);
        }

        console.log(requestModel);

        this.http.post("http://localhost:4570/querytranslation", requestModel).subscribe((x: any) => {
            console.log(x);
        });
    }

    toggleShowDetails(api) {
        if (!api.showDetails) {
            api.showDetails = true;
            return;
        }

        api.showDetails = false;
    }
}