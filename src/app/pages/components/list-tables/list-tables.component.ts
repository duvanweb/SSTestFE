import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TableType } from "../../../models/tableTypes.Model";
import { SettingTablesService } from "../../../services/setting-tables.service";

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.scss']
})
export class ListTablesComponent implements OnInit {

  @Output() selectedChange = new  EventEmitter<TableType>();
  constructor(protected settingTablesService: SettingTablesService) { }
  selectedTableType: TableType = {
    id: 0,
    name: ''
  }

  listTableType: TableType[] = [{
   id: 0,
   name: ''
  }]

  ngOnInit(): void {
    // Cargar el listado de tipos de tablas
    this.settingTablesService.getAllTableTypes().subscribe(result => {
      if(result.length > 0) {
        // Se selecciona el primer valor por default
        this.onChangeSelected(result[0])
        this.selectedTableType = result[0];
        this.listTableType = result;
        // delete this.listTableType[0];
      }
    });
  }


  /* Emitir al padres el tipo de tabla seleccionada
  * @value { TableType } Objeto con el tipo de tabla seleccionada
  */
  onChangeSelected(value: TableType) {
    this.selectedChange.emit(value)
  }

}
