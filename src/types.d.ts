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

export interface MeasuresData {
  id: number;
  name: string;
  deleted: boolean;
};

export interface CategoriesData {
  id: number;
  name: string;
  sub_categories: array;
  deleted: boolean;
};

export interface Data {
  _id:number;
  id: number;
  id_client: number;
  product: string;
  amount: number | string;
  measure: string;
  category: string;
  sub_category: string;
  [key?: string]: any;
  custom_fields?: array;
  id_custom_field_product?: number;
  code?: string;
  price?: number | string;
  description?: string;
  url_image?: string;
  alert_amount?: number | string;
  alert_date?: Date;
  alert_on?: boolean;
}

export interface DataTable {
  data: Data[] 
  columns: ColumnData[]
  // openUpdateAmountStock: (id_prod: Number, name_prod: String, amount_prod: Number) => void
  // openUpdateAmountStock: (newData: ProductUpdateData) => void
  openUpdateAmountStock: (newData: Data) => void
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
  _id?:  any;
  id: number;
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  id_client?: number;
  deleted: boolean;
  okButtonShow: boolean;
  fieldRepeatedShow: boolean;
  pre_saved?: boolean;
  edited?: boolean;
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

export interface ProductUpdateData {
  id_prod: number;
  name_prod: string;
  amount_prod: number | string;
  measure_prod: string;
  alert_amount?: number;
}