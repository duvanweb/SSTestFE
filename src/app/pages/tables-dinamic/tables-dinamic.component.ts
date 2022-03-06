import { Component, OnInit } from '@angular/core';
import { SettingTablesService } from "../../services/setting-tables.service";
import { TableDataService } from "../../services/table-data.service";
import { TableDetail } from "../../models/tableDetail.Model";
import {TableType} from "../../models/tableTypes.Model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-tables-dinamic',
  templateUrl: './tables-dinamic.component.html',
  styleUrls: ['./tables-dinamic.component.scss']
})
export class TablesDinamicComponent implements OnInit {


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
  public dataTable: object[] = [{}];
  public formGroup: FormGroup | undefined = undefined;
  private editedRowIndex: number | undefined = undefined;

  /**
   *
   * @param settingTablesService
   * @param tableDataService
   */
  constructor(
    private settingTablesService: SettingTablesService,
    private tableDataService: TableDataService
  ) {}

  ngOnInit(): void {
  }

  /**
   *
   * @param value
   */
  onChangeSelected(value: TableType) {
    this.settingTablesService.getDetailTable(value.id).subscribe(result => {
      this.settingTable = result
      this.onGetDataTable(result.id)
    })
  }

  /**
   *
   * @param id
   */
  onGetDataTable (id: number) {
    this.tableDataService.getAll(id).subscribe(result => {
      this.dataTable = result;
      console.log(this.dataTable)
    })
  }


  /**
   * Agregar un nuevo registro a la tabla
   * @param sender
   */
  onAddItemTable ({ sender } : any) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup(this.structureForm());
    sender.addRow(this.formGroup);
  }

  /**
   *
   * @param sender
   * @param rowIndex
   * @param dataItem
   */
  onEditItemTable ({ sender, rowIndex, dataItem }: any) {

  }

  /**
   *
   * @param sender
   * @param rowIndex
   */
  onCancelItemTable ({ sender, rowIndex }: any) {

  }

  /**
   *
   * @param dataItem
   */
  onRemoveItemTable ({ dataItem }: any) {

  }

  /**
   *
   * @param sender
   * @param rowIndex
   * @param formGroup
   * @param isNew
   */
  onSaveItemTable ({ sender, rowIndex, formGroup, isNew }: any) {
    const itemTable = formGroup.value;
    console.log(this.settingTable)
    this.tableDataService.create(this.settingTable.id, itemTable).subscribe(result => {
      this.dataTable.push(result)
    })
    sender.closeRow(rowIndex);
  }


  /**
   * Funcion para crear la estructura dinamica del formulario
   */
  structureForm() {
    let formControl = Object();
    for (let column of this.settingTable.columns) {
      formControl[column.header] = new FormControl();
    }
    return  formControl;
  }

  /**
   *
   * @param grid
   * @param rowIndex
   * @private
   */
  private closeEditor(grid: any , rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
