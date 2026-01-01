import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { getTaxes } from "../api/taxes";
import { getCountries } from "../api/countries";

import EditModal from "./EditModal";

export default function TaxTable() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);

  // Fetch taxes + countries
  useEffect(() => {
    getTaxes().then(setData);
    getCountries().then(setCountries);
  }, []);

  // countryId -> country name map
  const countryMap = countries.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  // Figma-matched columns
  const columns = [
    {
      header: "Entity",
      accessorKey: "entity",
      cell: ({ getValue }) => (
        <span className="text-indigo-600 font-medium cursor-pointer">
          {getValue()}
        </span>
      ),
    },
    {
      header: "Gender",
      accessorKey: "gender",
      cell: ({ getValue }) => {
        const gender = getValue();
        return (
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              gender === "Male"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {gender}
          </span>
        );
      },
    },
    {
      header: "Request date",
      accessorKey: "requestDate",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
    header: "Country",
    cell: ({ row }) =>
        countryMap[row.original.countryId] ||
        row.original.country ||
        "-",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => setSelectedTax(row.original)}
          className="text-gray-500 hover:text-indigo-600"
        >
          ✏️
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-9 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center text-white bg-gray-600 py-4 rounded">
        Taxes
      </h1>

      {/* <div className="bg-white rounded shadow overflow-hidden"> */}
      <div className="bg-white rounded-xl shadow overflow-hidden max-w-6xl mx-auto">
        <table className="w-full table-auto border border-gray-200 text-gray-800">

          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    // className="p-3 border-b text-left text-gray-700 font-semibold"
                    className="px-6 py-4 border-b text-left text-gray-700 font-semibold"

                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 border-b text-gray-900"
                  >
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.getValue(),
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTax && (
        <EditModal
          tax={selectedTax}
          onClose={() => setSelectedTax(null)}
          onUpdate={(updated) =>
            setData((prev) =>
              prev.map((t) =>
                t.id === updated.id ? updated : t
              )
            )
          }
        />
      )}
    </div>
  );
}
