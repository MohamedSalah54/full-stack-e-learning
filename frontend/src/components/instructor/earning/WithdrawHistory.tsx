"use client";

import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowParams, GridRowClassNameParams, GridPaginationModel } from "@mui/x-data-grid";
import { records } from "@/constants";


const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Pending":
      return "#FD8E1F";
    case "Canceled":
      return "red";
    default:
      return "black";
  }
};

const WithdrawHistoryMUI: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "method", headerName: "Method", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: getStatusColor(params.value as string), fontWeight: selectedRowId === params.id ? "bold" : "normal" }}>
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <div className="w-[760px] h-[420px] flex flex-col border border-[#C5CAD3] rounded-lg">
      {/* Title */}
      <h2 className="text-gray-800 font-semibold text-lg px-5 py-3">Withdraw History</h2>

      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          rows={records}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowClick={(params: GridRowParams) => setSelectedRowId(params.id as number)}
          getRowClassName={(params: GridRowClassNameParams) =>
            params.id === selectedRowId ? "font-bold" : ""
          }
          sx={{
            "& .MuiDataGrid-cell": { cursor: "pointer" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#F5F7FA" },
          }}
        />
      </div>
    </div>
  );
};

export default WithdrawHistoryMUI;
