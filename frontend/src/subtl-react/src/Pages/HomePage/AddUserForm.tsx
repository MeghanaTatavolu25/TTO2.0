import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { getRegisterResponse } from "../../utils/APIUtils.ts";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const InputSpan = {
  width: "100%",
  position: "relative" as "relative",
  marginBottom: "8px",
};
const buttonstyle = {
  margin: "5px",
  backgroundColor: "#000",
  color: "white",
};
const InputRightIcon = {
  position: "absolute" as "absolute",
  zIndex: 1,
  top: "15px",
  right: "10px",
  cursor: "pointer",
};

export function AddUserForm() {
  const [clicked, setclicked] = useState(false);
  const [companyid, setcompanyid] = useState<string>(
    sessionStorage.getItem("company_id") as string
  );
  const [name, setname] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setemail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (!companyid) {
      setcompanyid(sessionStorage.getItem("company_id") as string);
    }
  }, []);

  function toDisableOrNot() {
    if (clicked) {
      if (email && password && name && lastName && companyid) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  return (
    <span
      style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
    >
      {clicked && (
        <>
          <span style={InputSpan}>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                setname(e.target.value);
              }}
              label="First Name"
              variant="filled"
            />
          </span>
          <span style={InputSpan}>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label="Last Name"
              variant="filled"
            />
          </span>
          <span style={InputSpan}>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              label="Email"
              variant="filled"
            />
          </span>
          <span style={InputSpan}>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={passwordVisible ? "string" : "password"}
              label="Password"
              variant="filled"
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={InputRightIcon}
            >
              {passwordVisible ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined />
              )}
            </span>
          </span>
        </>
      )}
      <Button
        disabled={toDisableOrNot()}
        style={clicked ? buttonstyle : {}}
        onClick={() => {
          if (!clicked) {
            setclicked(true);
          } else {
            if (email && password && name && companyid && lastName) {
              getRegisterResponse(email, password, name, companyid, lastName)
                .then((res: any) => {
                  if (res["status"] === 201) {
                    alert("Use successfully Registered!");
                    setname(null);
                    setLastName(null);
                    setPassword(null);
                    setemail(null);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  if (typeof err.response.data.detail === "string") {
                    alert(err.response.data.detail);
                  } else {
                    alert(err.response.data.detail[0].msg);
                  }
                });
            }
          }
        }}
        variant={clicked ? "contained" : "outlined"}
      >
        Add User
      </Button>
      {clicked && (
        <Button
          style={buttonstyle}
          onClick={(e) => {
            e.stopPropagation();
            setclicked(false);
          }}
          variant={"contained"}
        >
          Back
        </Button>
      )}
    </span>
  );
}
