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
  public formGroup: FormGroup = new FormGroup(this.structureForm({}));
  private editedRowIndex: number | undefined = undefined;
  public actionsDisabled: boolean = false ;
  public dialogOpened = false;
  private dataItem = { id: 0 }

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
   * Función abrir dialogo
   */
  public onCloseDialog() {
    this.dialogOpened = false;
  }

  /**
   * Función cerrar dialogo
   * @param dataItem
   */
  public onOpenDialog({ dataItem }: any) {
    this.dialogOpened =  true;
    this.dataItem = dataItem;
  }

  /**
   * Función que escucha el evento cuando cambia el tipo de tabla
   * @param value {TableType}
   */
  onChangeSelected(value: TableType) {
    this.settingTablesService.getDetailTable(value.id).subscribe(result => {
      this.settingTable = result;
      this.onGetDataTable(result.id);
    })
  }

  /**
   * Función que trae la informacion del tipo de tabla seleccionada
   * @param id { number } Es el codigo del tipo de tala
   */
  onGetDataTable (id: number) {
    this.tableDataService.getAll(id).subscribe(result => {
      this.dataTable = result;
    })
  }


  /**
   * Agregar un nuevo registro a la tabla
   * @param sender
   */
  onAddItemTable ({ sender } : any) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup(this.structureForm({}));
    this.actionsDisabled = true;
    sender.addRow(this.formGroup);
  }

  /**
   * Función para editar un registro seleccionado
   * @param sender
   * @param rowIndex {number}
   * @param dataItem {Object}
   */
  onEditItemTable ({ sender, rowIndex, dataItem }: any) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup(this.structureForm(dataItem));
    this.editedRowIndex = rowIndex;
    this.actionsDisabled = true;
    sender.editRow(rowIndex, this.formGroup);
  }

  /**
   * Función para cancelar un registro nuevo o editar
   * @param sender
   * @param rowIndex {number}
   */
  onCancelItemTable ({ sender, rowIndex }: any) {
    this.closeEditor(sender, rowIndex);
  }

  /**
   * Función para eliminar un registro de la tabla
   * @param status {boolean}
   */
  onRemoveItemTable (status: boolean) {
    if(status) {
      this.tableDataService.remove(this.settingTable.id, this.dataItem.id).subscribe(result => {
        this.onGetDataTable(this.settingTable.id);
      })
    }
    this.dialogOpened = false;
  }

  /**
   * Función para guardar un registro nuevo o editar
   * @param sender
   * @param rowIndex {number}
   * @param formGroup {FormGroup}
   * @param isNew {Boolean}
   */
  onSaveItemTable ({ sender, rowIndex, formGroup, isNew, dataItem }: any) {
    const itemTable = formGroup.value;
    if (isNew) {
      this.tableDataService.create(this.settingTable.id, itemTable).subscribe(result => {
        this.onGetDataTable(this.settingTable.id);
      })
    } else {
      this.tableDataService.update(this.settingTable.id, dataItem.id, itemTable).subscribe(result => {
        this.onGetDataTable(this.settingTable.id);
      })
    }
    this.actionsDisabled = false;
    sender.closeRow(rowIndex);
  }


  /**
   * Función para crear la estructura dinamica del formulario
   * @param data {Object}
   * @private
   */
  private structureForm(data: any) {
    let formControl = Object();
    let options = [];
    for (let column of this.settingTable.columns) {
      if (column.required) options.push(Validators.required);
      formControl[column.header] = new FormControl(data[column.header],Validators.compose(options));
    }
    return  formControl;
  }

  /**
   *
   * @param grid
   * @param rowIndex {number}
   * @private
   */
  private closeEditor(grid: any , rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = new FormGroup({});
    this.actionsDisabled = false;
  }

}
