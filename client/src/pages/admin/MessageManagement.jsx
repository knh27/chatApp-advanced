import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";

const MessageManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "attachments",
      headerName: "Attachments",
      headerClassName: "table-header",
      width: 150,
      renderCell: (params) =>
        params.row.attachments.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {params.row.attachments.map((i, index) => {
              const url = i.url;
              const file = fileFormat(url);

              return (
                <div key={index} className="flex flex-wrap gap-2">
                  <a
                    className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-lg "
                    href={url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {RenderAttachment(file, url)}
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          "No Attachment"
        ),
    },

    {
      field: "sender",
      headerName: "Sent By",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            className="w-12 h-12"
            alt={params.row.sender.name}
            src={params.row.sender.avatar}
          />
          <span>{params.row.sender.name}</span>
        </div>
      ),
    },
    {
      field: "content",
      headerName: "Content",
      headerClassName: "table-header",
      width: 400,
    },
    {
      field: "chat",
      headerName: "Chat",
      headerClassName: "table-header",
      width: 220,
    },
    {
      field: "groupChat",
      headerName: "Group Chat",
      headerClassName: "table-header",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Time",
      headerClassName: "table-header",
      width: 250,
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },

        attachments: i.attachments.map((att) => ({
          url: att.url,
        })),

        createdAt: moment(i.createdAt).format("MMMM Do YYYY , h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <div>
        <Table heading={"All Messages"} columns={columns} rows={rows} />
      </div>
    </AdminLayout>
  );
};

export default MessageManagement;
