import React from "react";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <div className="h-full">
      <div>
        <p className="text-2xl">{heading}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border border-gray-300 text-left"
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="even:bg-gray-100"
                  style={{ height: `${rowHeight}px` }}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {/* Check if column has renderCell function */}
                      {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
