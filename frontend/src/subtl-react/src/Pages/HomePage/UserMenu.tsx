import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import {
  FileArrowUp,
  UserRectangle,
  File,
  List,
  SignOut,
  X,
  Translate,
} from "phosphor-react";
import {
  getGroupData,
  getGroupsList,
  Logout,
  UploadDocument,
} from "../../utils/APIUtils.ts";
import { Popup } from "./Popup.tsx";
import Documents from "./Documents.tsx";
import { AddUserForm } from "./AddUserForm.tsx";
import { UploadFiles } from "./UploadFiles.tsx";
import LanguageSelector from "./LanguageSelector.tsx";

export default function UserMenu() {
  const [data, setData] = useState<any>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [selected, setSelected] = useState<
    "" | "user" | "file" | "info" | "lang"
  >("");
  const [groups, setGroups] = useState<
    {
      company_id: string;
      documents: number;
      id: string;
      name: string;
      pages: number;
    }[]
  >([]);

  useEffect(() => {
    let info = sessionStorage.getItem("user_info");
    if (info) {
      let temp = JSON.parse(info);
      setData(temp);
      Object.keys(sessionStorage).forEach((item) => {
        let store = sessionStorage.getItem(item);
        if (item === "user_info" && store) {
          let temp = JSON.parse(store);
          console.log(item, temp);
        } else {
          console.log(item, store);
        }
      });
    }
    getGroupsList(sessionStorage.getItem("access_token") as string).then(
      (res: any) => {
        console.log(res);
        setGroups(res);
      }
    );

    window.addEventListener("click", (e) => {
      if (
        (e.target as Element)?.nodeName !== "BODY" &&
        !document.getElementById("menuu")?.contains(e.target as Node)
      ) {
        setShowDocs(false);
        setSelected("");
        setHamburger(false);
      }
      // setShowDocs(false);
      // setSelected('')
    });
  }, []);

  return (
    <>
      {data && sessionStorage.getItem("company_name") && (
        <p className="topRightUserInfo">
          {`${data["email"]} | ${sessionStorage.getItem("company_name")}`}
        </p>
      )}
      <div
        id="menuu"
        className="IconMenu"
        style={{
          position: "absolute",
          bottom: "0px",
          margin: "20px",
          width: "18%",
          zoom: "80%",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            selected === "user"
              ? "userMenu overlayMenu"
              : selected === "lang"
              ? "langMenu overlayMenu"
              : "notUserMenu overlayMenu"
          }
          style={{
            background: "white",
            boxShadow: "rgb(0 0 0 / 9%) 0px 0px 10px 4px",
            padding: "10px",
            borderRadius: "6px",
            minHeight: "400px",
            display: selected !== "" && !showDocs ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {data && selected === "user" ? (
            <>
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontFamily: "montserrat",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    fontWeight: "600",
                    marginTop: "10px",
                  }}
                >
                  {data["first_name"] + " " + data["last_name"]}
                </span>
                {data["company_admin"] && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontFamily: "montserrat",
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                      fontWeight: "300",
                      marginTop: "10px",
                    }}
                  >
                    {"Admin ✅"}
                  </span>
                )}
                <span
                  style={{
                    fontSize: "16px",
                    fontFamily: "montserrat",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    fontWeight: "300",
                    marginTop: "20px",
                  }}
                >
                  {data["email"]}
                </span>
                {sessionStorage.getItem("company_name") && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontFamily: "montserrat",
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                      fontWeight: "300",
                      marginTop: "10px",
                    }}
                  >
                    {sessionStorage.getItem("company_name")}
                  </span>
                )}
              </div>

              {data["company_admin"] && <AddUserForm />}
              {/* <Button
                                style={{ marginTop: '10px' }}
                                onClick={() => {
                                    Logout().then((res) => {
                                        if (res) {
                                            window.sessionStorage.clear();
                                            sessionStorage.clear();
                                            window.open('/', '_self')
                                        }
                                    })
                                        .catch(err => {
                                            if (err) {
                                                alert('Sorry There was a Problem with Logging you out')
                                            }
                                        })
                                }}
                                variant="outlined" color="primary">
                                Logout
                            </Button> */}
            </>
          ) : selected === "file" ? (
            <UploadFiles groups={groups} />
          ) : selected === "lang" ? (
            <LanguageSelector />
          ) : null}
        </div>
        <span
          className="IconMenuIcons"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="menuIconsDiv"
            style={{ display: hamburger ? "flex" : "none" }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
              }}
            >
              <IconButton
                onClick={() => {
                  Logout()
                    .then((res) => {
                      if (res) {
                        window.sessionStorage.clear();
                        sessionStorage.clear();
                        window.open("/", "_self");
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        alert("Sorry There was a Problem with Logging you out");
                      }
                    });
                }}
              >
                <SignOut size={32} />
              </IconButton>
              <span style={{ textAlign: "center" }}>Logout</span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
              }}
            >
              <IconButton
                onClick={() =>
                  selected !== "user" ? setSelected("user") : setSelected("")
                }
              >
                {selected === "user" && !showDocs ? (
                  <UserRectangle size={32} weight="fill" color="#0076cb" />
                ) : (
                  <UserRectangle size={32} weight="fill" />
                )}
              </IconButton>
              <span style={{ textAlign: "center" }}>User</span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
              }}
            >
              <IconButton onClick={() => setShowDocs(true)}>
                {showDocs ? (
                  <File size={32} color="#0076cb" />
                ) : (
                  <File size={32} />
                )}
              </IconButton>
              <span style={{ textAlign: "center" }}>Files</span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
              }}
            >
              <IconButton
                onClick={() =>
                  selected !== "file" ? setSelected("file") : setSelected("")
                }
              >
                {selected === "file" && !showDocs ? (
                  <FileArrowUp size={32} color="#0076cb" />
                ) : (
                  <FileArrowUp size={32} />
                )}
              </IconButton>
              <span style={{ textAlign: "center" }}>Upload</span>
            </span>
            {/* Language Selector */}
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
              }}
            >
              <IconButton
                onClick={() =>
                  selected !== "lang" ? setSelected("lang") : setSelected("")
                }
              >
                {selected === "lang" && !showDocs ? (
                  <Translate size={32} color="#0076cb" />
                ) : (
                  <Translate size={32} />
                )}
              </IconButton>
              <span style={{ textAlign: "center" }}>Language</span>
            </span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setHamburger(!hamburger);
              setSelected("");
            }}
            style={{ display: "none" }}
            className="hamburgerIcon"
          >
            <IconButton>
              {!hamburger ? (
                <List size={32} weight="bold" />
              ) : (
                <X size={32} weight="bold" />
              )}
            </IconButton>
          </div>
        </span>
      </div>
      {showDocs && (
        <Popup
          updateShow={() => {
            setShowDocs(false);
          }}
        >
          <Documents groups={groups} />
        </Popup>
      )}
    </>
  );
}
