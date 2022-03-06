import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http'
import { TableType } from "../models/tableTypes.Model";
import { TableDetail } from "../models/tableDetail.Model";

@Injectable({
  providedIn: 'root'
})
export class SettingTablesService {

  private apiUrl = `${environment.API_UR}/settingTables`
  constructor(private http: HttpClient) { }

  /*
  * Obtener el listado de tipos de tablas
  */
  getAllTableTypes() {
      return this.http.get<TableType[]>(`${this.apiUrl}/getTables`);
  }

  /*
  * Obtener la configuración de la tabla seleccionada
  *  @id {number} Debe ser el id del tipo de tabla seleccionada
  */
  getDetailTable(id: number) {
    return this.http.get<TableDetail>(`${this.apiUrl}/getTableDetail/${id}`);
  }

}
