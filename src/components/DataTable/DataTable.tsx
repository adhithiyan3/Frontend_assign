import { useState } from "react";

interface Column {
  key: string;
  title: string;
  dataIndex: string;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  selectable?: boolean;
  onRowSelect?: (rows: any[]) => void;
}

export function DataTable({ data, columns, selectable, onRowSelect }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col.dataIndex].toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleRow = (row: any) => {
    let updated;
    if (selected.includes(row)) {
      updated = selected.filter((r) => r !== row);
    } else {
      updated = [...selected, row];
    }
    setSelected(updated);
    if (onRowSelect) onRowSelect(updated);
  };

  return (
    <div className="space-y-4 overflow-x-auto"> {/* ✅ responsive scroll */}
     <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search..."
  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
             placeholder-gray-500 dark:placeholder-gray-300 
             focus:outline-none focus:ring-2 focus:ring-gray-700"
/>

      <table className="w-full min-w-max border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
          <tr>
            {selectable && <th className="p-3 text-left">Select</th>}
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-900"
              }
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-3 text-gray-900 dark:text-white">
                  {row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
