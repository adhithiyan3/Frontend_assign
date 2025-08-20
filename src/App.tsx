import React, { useState } from "react";
import InputField from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";
import sampleData from "./utils/sampleData";

export default function App() {
  const [password, setPassword] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [dark, setDark] = useState(false);

  // 🔹 Export CSV function
  const exportToCSV = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : sampleData;

    const headers = Object.keys(rowsToExport[0]).join(",");
    const csvRows = rowsToExport.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
  };

  return (
    <div
      className={
        dark
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-gray-50 min-h-screen text-gray-900"
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1
            className={`text-3xl font-bold ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Component Playground
          </h1>

          {/* 🔹 Subtle Dark/Light Toggle */}
          <div
            onClick={() => setDark(!dark)}
            className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-all duration-500 shadow-md ${
              dark ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-lg transform duration-500 ${
                dark ? "translate-x-10" : "translate-x-0"
              }`}
            >
              {dark ? "🌙" : "☀️"}
            </div>
          </div>
        </header>

        {/* InputField Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold dark:text-white">
            InputField with Password Strength
          </h2>
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            showStrength
            showClear
            placeholder="Enter your password"
          />
        </section>

        {/* DataTable Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              DataTable with Search + Export
            </h2>
            {/* Export CSV Button */}
            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow"
            >
              Export CSV
            </button>
          </div>

          <DataTable
            data={sampleData}
            columns={[
              { key: "name", title: "Name", dataIndex: "name", sortable: true },
              { key: "email", title: "Email", dataIndex: "email", sortable: true },
              { key: "age", title: "Age", dataIndex: "age", sortable: true },
            ]}
            selectable
            onRowSelect={(rows) => setSelectedRows(rows)}
          />

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Selected rows: {selectedRows.length}
          </div>
        </section>
      </div>
    </div>
  );
}
