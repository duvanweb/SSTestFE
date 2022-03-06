import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private apiUrl = `${environment.API_UR}/tablesData`
  constructor(private http: HttpClient) { }

  /**
   * Función para consular el endPoint getTableData para consultar la informacion de un tipo de tabla
   * @param id {number} pertenece al codigo unico de un tipo de tabla
   */
  getAll(id: number) {
    return this.http.get<[]>(`${this.apiUrl}/getTableData/${id}`);
  }

  /**
   * Función crear un registro en un tipo de tabla
   * @param id {number} pertenece al codigo unico de un tipo de tabla
   * @param data {Object} informacion que se desea guardar
   */
  create(id: number, data: Object) {
    return this.http.post(`${this.apiUrl}/createTableData/${id}`, data)
  }

  /**
   * Función para actualizar un registro de un tipo de tabla
   * @param id {numbre} Es el codigo del tipo de tabla seleccionada
   * @param idItem {number} El el codigo del registro que se va actualizar
   * @param data {Object}  informacion que se desea actualizar
   */
  update(id: number,idItem:number, data: Object) {
    return this.http.put(`${this.apiUrl}/updateTableData/${id}/${idItem}`, data)
  }

  /**
   * Función para elimara un registro de un tipo de tabla
   * @param id Es el codigo del tipo de tabla seleccionada
   * @param idItem El el codigo del registro que se va eliminar
   */
  remove(id: number, idItem: number) {
    return this.http.delete(`${this.apiUrl}/removeTableData/${id}/${idItem}`)
  }
}
