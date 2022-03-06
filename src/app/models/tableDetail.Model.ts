export interface column {
  id: number;
  header: string;
  dataType: string;
  format: any;
  required: boolean;
}

export interface TableDetail {
  id: number;
  name: string;
  columns: column[];
}
