import { useCallback } from "react";
import * as XLSX from "xlsx";

export type ExcelColumn<Row> = {
  /* Column header shown in Excel */
  header: string;
  /* Property name on the row object (e.g. "name", "status") */
  key?: keyof Row & string;
  /* Optional custom accessor if you want to compute a value */
  accessor?: (row: Row) => unknown;
  /** Column width in characters */
  width?: number;
};

type ExportOptions<Row> = {
  columns: ExcelColumn<Row>[];
  rows: Row[];
  fileName: string; // e.g. "projects.xlsx"
  sheetName?: string; // default: "Sheet1"
};

export function useExcelExport<Row>() {
  const exportToExcel = useCallback((options: ExportOptions<Row>) => {
    const { columns, rows, fileName, sheetName = "Sheet1" } = options;

    // 1) Header row
    const header = columns.map((c) => c.header);

    // 2) Data rows
    const data = rows.map((row) =>
      columns.map((col) => {
        if (col.accessor) return col.accessor(row);
        if (col.key) return (row as Record<string, unknown>)[col.key];
        return "";
      })
    );

    const worksheetData = [header, ...data];

    // 3) Build worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // 4) Column widths
    if (columns.some((c) => c.width)) {
      ws["!cols"] = columns.map((c) => ({ wch: c.width ?? 15 }));
    }

    // 5) Build workbook & download
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  }, []);

  return exportToExcel;
}
