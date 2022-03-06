import { Component, OnInit } from '@angular/core';
import { SettingTablesService } from "../../services/setting-tables.service";
import { TableDetail } from "../../models/tableDetail.Model";
import {TableType} from "../../models/tableTypes.Model";

@Component({
  selector: 'app-tables-dinamic',
  templateUrl: './tables-dinamic.component.html',
  styleUrls: ['./tables-dinamic.component.scss']
})
export class TablesDinamicComponent implements OnInit {

  constructor(private settingTablesService: SettingTablesService) { }
  public settingTable: TableDetail  = {
    "id": 1,
    "name": "Tabla 1",
    "columns": [
      {
        "id":1,
        "header": "T1C1",
        "dataType": "Int",
        "format": "",
        "required": true
      }
    ]
  }

  ngOnInit(): void {
  }

  onChangeSelected(value: TableType) {
    this.settingTablesService.getDetailTable(value.id).subscribe(result => {
      this.settingTable = result
    })
  }

}
