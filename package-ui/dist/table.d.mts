import * as React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
}
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
}
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
}
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;

export { Table, TableBody, type TableBodyProps, TableCell, type TableCellProps, TableHead, type TableHeadProps, TableHeader, type TableHeaderProps, type TableProps, TableRow, type TableRowProps };
