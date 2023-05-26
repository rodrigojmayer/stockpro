export interface Data {
  id: number;
  product: string;
  amount: number;
  measure: string;
  category: string;
  sub_category: string;
  [key?: string]: any;
}

export interface DataTable {
  data: Data[] 
  columns: ColumnData[]
}

export interface ColumnData {
  id: number;
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  id_client?: number;
  deleted: boolean;
}

export interface ColumnDataCustom {
  id: number;
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  id_client?: number;
  deleted: boolean;
  okButtonShow: boolean;
  fieldRepeatedShow: boolean;
}

export interface DataMenuOptions {
  fields: boolean,
  alerts: boolean,
  massive: boolean,
  users: boolean,
  profile: boolean,
  preferences: boolean
}

export interface ChildProps {
  open:  boolean
  handleClose: (newData: boolean) => void
  // columns: ColumnData[]
  columnsDefault: ColumnData[]
  columnsCustom: ColumnData[]
  idColumnsTableOrder: Number[]
  // columnsHiddenFields: ColumnData[]
}