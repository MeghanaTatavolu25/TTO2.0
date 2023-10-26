import { IconButton } from "@mui/material";
import { CaretCircleLeft, Folder, YoutubeLogo } from "phosphor-react";
import React, { useState } from "react";
import { getGroupData } from "../../utils/APIUtils.ts";
import { GroupItem } from "./@types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FileArrowUp,
  UserRectangle,
  File,
  List,
  SignOut,
  X,
} from "phosphor-react";

export default function Documents(props: {
  groups: {
    company_id: string;
    documents: number;
    id: string;
    name: string;
    pages: number;
  }[];
}) {
  const [currGroup, setcurrGroup] = useState<GroupItem[] | null>(null);
  const [showCircularProgress, setShowCircularProgress] =
    useState<boolean>(false);

  function GroupItemTable(props: { rows: GroupItem[] }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S. No</TableCell>
              <TableCell align="left">Document</TableCell>
              <TableCell align="center">Editor</TableCell>
              <TableCell align="center">File Size</TableCell>
              <TableCell align="center">Upload Status</TableCell>
              <TableCell align="center">Document Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">
                  <div
                    className="tableRowName"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row.document_type === "youtube" ? (
                      <YoutubeLogo
                        style={{ marginRight: "10px" }}
                        size={25}
                        weight="fill"
                      />
                    ) : (
                      <File
                        style={{ marginRight: "10px" }}
                        size={25}
                        weight="fill"
                      />
                    )}

                    {row.name}
                  </div>
                </TableCell>
                <TableCell align="center">{row.user_name}</TableCell>
                <TableCell align="center">{row.file_size}</TableCell>
                <TableCell align="center">{row.upload_status}</TableCell>
                <TableCell align="center">{row.document_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function GroupsTable(props: {
    rows: {
      company_id: string;
      documents: number;
      id: string;
      name: string;
      pages: number;
    }[];
  }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S. No</TableCell>
              <TableCell align="left">Group Name</TableCell>
              <TableCell align="center">Pages</TableCell>
              <TableCell align="center">Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell
                  onClick={() => {
                    setShowCircularProgress(true);
                    getGroupData(row.id).then((res) => {
                      setShowCircularProgress(false);
                      setcurrGroup(res);
                      console.log(res);
                    });
                  }}
                  style={{ cursor: "pointer" }}
                  align="left"
                >
                  <div
                    className="tableRowName"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Folder
                      style={{ marginRight: "10px" }}
                      size={25}
                      weight="fill"
                    />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell align="center">{row.pages}</TableCell>
                <TableCell align="center">{row.documents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
      }}
    >
      {currGroup && (
        <IconButton
          onClick={() => setcurrGroup(null)}
          style={{ position: "absolute", top: "6px", left: "6px" }}
        >
          <CaretCircleLeft size={32} />
        </IconButton>
      )}

      {showCircularProgress ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : !currGroup ? (
        <GroupsTable rows={props.groups} />
      ) : (
        <GroupItemTable rows={currGroup} />
      )}
    </div>
  );
}
