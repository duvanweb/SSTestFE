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
   *
   * @param id
   */
  getAll(id: number) {
    return this.http.get<[]>(`${this.apiUrl}/getTableData/${id}`);
  }

  /**
   *
   * @param id
   * @param data
   */
  create(id: number, data: Object) {
    return this.http.post(`${this.apiUrl}/createTableData/${id}`, data)
  }
}
