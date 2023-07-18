export interface UserData {
  id: number;
  id_client: number;
  name: string;
  user: string;
  pass: string;
  deleted: boolean;
  enabled: boolean;
  ordered_fields: array;
}

export interface Data {
  id: number;
  id_client: number;
  product: string;
  amount: number;
  measure: string;
  category: string;
  sub_category: string;
  [key?: string]: any;
  custom_fields?: array;
  id_custom_field_product?: number;
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
  [key: string]: any;
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
export interface CustomValueData {
  id_custom_fields_value: number,
  id_custom_field_product: number,
  id_product: number,
  custom_field_value: string,
}
export interface DataMenuOptions {
  fields: boolean,
  alerts: boolean,
  massive: boolean,
  users: boolean,
  profile: boolean,
  preferences: boolean
}
export interface DataCreateStockOptions {
  mainData: boolean,
  secondaryData: boolean,
  alerts: boolean,
  customFields: boolean
}

export interface ChildProps {
  open:  boolean
  handleClose: (newData: boolean) => void
}