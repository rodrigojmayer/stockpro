export interface Data {
    id: number;
    product: string;
    amount: number;
    measure: string;
    category: string;
    sub_category: string;
    [key?: string]: any;
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

export interface DataMenuOptions {
    fields: boolean,
    alerts: boolean,
    massive: boolean,
    users: boolean,
    profile: boolean,
    preferences: boolean
}