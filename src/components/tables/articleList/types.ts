export type Order = "asc" | "desc";

export interface Data {
  id: number;
  title: string;
  perex: string;
  author: string;
  comments: number;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
