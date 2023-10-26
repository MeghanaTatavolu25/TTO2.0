import axios, {
  AxiosHeaders,
  AxiosResponse,
  RawAxiosResponseHeaders,
} from "axios";
import { GroupItem } from "../Pages/HomePage/@types";

let auth_token = sessionStorage.getItem("access_token") as string;

let translateToken = localStorage.getItem("translateID");
let EnglishToEnglish = localStorage.getItem("englishToEnglishID");

export function getLoginResponse(username: string, password: string) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    fetch("https://app.subtl.ai/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        resolve(resp);
      });
  });
}

export function getRegisterResponse(
  email: string,
  password: string,
  name: string,
  companyID: string,
  lastName: string
) {
  const payload = {
    email: email,
    password: password,
    first_name: name,
    last_name: lastName,
    company_id: companyID,
    is_active: true,
    is_superuser: false,
    is_verified: false,
    company_admin: false,
    can_upload: true,
  };

  return new Promise((resolve, reject) => {
    var su_email = "super@subtl.ai";
    var su_pwd = "Subtl@1234";
    getLoginResponse(su_email, su_pwd).then((res: any) => {
      if (!res.detail) {
        //success
        let token = res.access_token;
        axios
          .post("https://app.subtl.ai/api/users/register", payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            resolve(resp);
          })
          .catch((rej) => reject(rej));
      }
    });
  });
}

export function getAllCompanies() {
  var su_email = "super@subtl.ai";
  var su_pwd = "Subtl@1234";
  const params = new URLSearchParams();
  params.append("username", su_email);
  params.append("password", su_pwd);
  getLoginResponse(su_email, su_pwd).then((res: any) => {
    if (!res.detail) {
      //success
      console.log(res);
      let token = res.access_token;
      fetch("https://app.subtl.ai/api/companies/all", {
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  });
}

export function getCompanyRegisterResponse(
  email: string,
  password: string,
  name: string,
  lastName: string,
  companyName: string
) {
  const payload = {
    name: companyName,
    first_name: name,
    last_name: lastName,
    email: email,
    password: password,
    company_admin: true,
    can_upload: true,
    employee_cap: 10,
    domain: "open_domain",
    threshold1: 0,
    threshold2: 0,
  };
  return new Promise((resolve, reject) => {
    axios.post("https://app.subtl.ai/api/companies/register", payload).then(
      (response) => {
        if (response.status == 201) {
          resolve(response);
        } else {
          reject(response);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function getUserDetails(token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((rej) => reject(rej));
  });
}

export function GoogleSSO(token: string) {
  return new Promise((resolve, reject) => {
    const sso_params = new URLSearchParams();
    sso_params.append("token", token);
    axios
      .post("https://app.subtl.ai/api/auth/sso/google", sso_params)
      .then((response) => {
        if (response.status == 200) {
          axios
            .get("https://app.subtl.ai/api/users/me", {
              headers: {
                Authorization: "Bearer " + response.data["access_token"],
              },
            })
            .then((res) => {
              resolve(res);
            });
        }
      });
  });
}

export function getCompanies(access_token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/companies", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((r) => {
        resolve([r.data.global_group, r.data.id, r.data.name]);
      });
  });
}

//acceess
export function sendMessage(
  query: string,
  company_group: string,
  access_token: string
) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://app.subtl.ai/api/transactions",
        {
          query_string: query,
          target_id: company_group,
        },
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          resolve(response.data.answers);
        }
      });
  });
}

//TEL

//ENG

export function translate(query: any, source: string, target: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://apimanager.iiithcanvas.com/aqqz/iiitilmt/1.0.0/onemt",
        {
          text: query,
          source_language: source,
          target_language: target,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + translateToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(async (err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          await axios
            .post(
              "https://sts.choreo.dev/oauth2/token",
              new URLSearchParams({
                grant_type: "client_credentials",
              }),
              {
                headers: {
                  Authorization:
                    "Basic X2Z6NlRpd0U3U0VqWXhDeU1idjlGVGVQU29RYTpscXk2RElCbkVqMmwyQU9pVWlIWUp1RnBYQ2dh",
                },
              }
            )
            .then((res) => {
              localStorage.setItem("translateID", res.data.access_token);
            })
            .then(() => {
              window.location.reload();
            });
        }
      });
  });
}

export function speechtotexteng(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://apimanager.iiithcanvas.com/aqqz/casr/1.0.0/upload.php/",
        {
          name: "Adithya Raj K",
          email: "kadithyaraj@gmail.com",
          affiliation: "IITM",
          stream: "CS",
          url: url,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + EnglishToEnglish,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.recognised_text);
        }
      })
      .catch(async (err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          await axios
            .post(
              "https://sts.choreo.dev/oauth2/token",
              new URLSearchParams({
                grant_type: "client_credentials",
              }),
              {
                headers: {
                  Authorization:
                    "Basic SUNFUmgyR1FaSExuRkxWdmZZVURuWGRrdGxBYTpjbFRYSXBVQ2kwSUVrVEpkSzdydGRmd1c3THNh",
                },
              }
            )
            .then((res) => {
              console.log(res, "res");
              localStorage.setItem("englishToEnglishID", res.data.access_token);
            });
          // .then(() => {
          //   window.location.reload();
          // });
        }
      });
  });
}

export function speechtotexttel(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://asr.iiit.ac.in/agastya/",
        {
          AudioURL: url,
          flag: true,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        console.log(err, "Error");
        reject(err);
      });
  });
}

export function getMeiliRecommendations(query: string, company_id: string) {
  return new Promise((resolve, reject) => {
    const payload = {
      q: query,
      filter: "company_id = " + company_id,
    };
    axios
      .post(
        "https://app.subtl.ai/meili" + "/indexes/transactions/search",
        payload,
        {
          headers: {
            "X-Meili-API-Key":
              "2915d2cbaa7472f3f7acdf6429354e6b4e1e2fd3a5a67f16260bb97196f87086",
          },
        }
      )
      .then((response) => {
        //console.log(response.data)

        let returns = response.data.hits.slice(0, 4);
        resolve(returns);
      });
  });
}

export function getPDF(id: string, auth_token: string) {
  return new Promise(
    (
      resolve: (value: {
        url: string;
        highlight: number;
        resp: RawAxiosResponseHeaders;
      }) => void,
      reject
    ) => {
      axios
        .get(
          "https://app.subtl.ai/api/transactions/answers/" +
            id +
            "/highlighted_file",
          {
            headers: {
              Authorization: "Bearer " + auth_token,
              "Access-Control-Allow-Origin": "*",
            },
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          console.log(response);
          let pageURL = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/pdf",
            })
          );
          // console.log(pageURL)
          resolve({
            url: pageURL,
            highlight: response.headers.highlights,
            resp: response.headers,
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

export function getPage(page: number, docID: string) {
  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise(
    (
      resolve: (val: {
        url: string;
        highlight: number;
        headers: RawAxiosResponseHeaders;
      }) => void,
      reject
    ) => {
      axios
        .get(
          "https://app.subtl.ai/api/documents/file/" +
            docID +
            "?page=" +
            page.toString(),
          {
            headers: {
              Authorization: "Bearer " + auth_token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          let pageURL = URL.createObjectURL(
            new Blob([res.data], {
              type: "application/pdf",
            })
          );
          resolve({
            url: pageURL,
            highlight: res.headers.highlights,
            headers: res.headers,
          });
        });
    }
  );
}

export function UploadDocument(
  auth_token: string,
  file: File,
  upload_group: string,
  doc_creation_date: string
) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("group_id", upload_group);
  formData.append("creation_date", doc_creation_date);
  return new Promise((resolve, reject) => {
    axios
      .post("https://app.subtl.ai/api/documents", formData, {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          //success
          console.log(response);
          ProcessDocument(upload_group, auth_token);
          resolve("success");
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 422) {
          alert("Sorry, can't process scanned document");
        } else {
          alert("error while uploading");
        }
      });
  });
}

export function ProcessDocument(groupID: string, auth_token: string) {
  axios
    .post(
      "https://app.subtl.ai/api/groups/process/" + groupID,
      {},
      { headers: { Authorization: "Bearer " + auth_token } }
    )
    .then((res) => {
      console.log(res.status);
    });
}

export function UploadVideo(
  VTT_file: File,
  Video_file: File,
  videogroupID: string,
  doc_creation_date: string,
  auth_token: string
) {
  let formData = new FormData();
  formData.append("file", VTT_file);
  formData.append("video", Video_file);
  formData.append("group_id", videogroupID);
  formData.append("creation_date", doc_creation_date);
  return new Promise((resolve, reject) => {
    axios
      .post("https://app.subtl.ai/api/documents/video", formData, {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve("success");
        } else {
          reject("err");
        }
      })
      .catch(() => {
        reject("err");
      });
  });
}

export function AddYoutubeVideo(
  url: string,
  auth_token: string,
  groupid: string,
  customTitle: string
) {
  return new Promise((resolve, reject) => {
    const payload = {
      url: url,
      name: customTitle,
      group_id: groupid,
      metadata: "",
      Timestamp: String(Date.now()),
    };
    // Upload youtube link
    axios
      .post("https://app.subtl.ai/api/documents/youtubeVideo", payload, {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res);
        } else {
          reject("err");
        }
      })
      .catch((err) => {
        reject("err");
      });
  });
}

export function AddWebsite(
  url: string,
  auth_token: string,
  groupid: string,
  customTitle: string
) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("filename", customTitle);
    params.append("url", url);
    params.append("group_id", groupid);
    params.append("creation_date", String(Date.now()));
    // Upload youtube link
    axios
      .post("https://app.subtl.ai/api/documents/website", params, {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res);
        } else {
          reject("err");
        }
      })
      .catch((err) => {
        reject("err");
      });
  });
}

export function getGroupsList(token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((rej) => reject(rej));
  });
}

export function getGroupData(group_id: string) {
  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise((resolve: (val: GroupItem[]) => void, reject) => {
    axios
      .get("https://app.subtl.ai/api/groups/" + group_id + "/docs", {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((response) => {
        resolve(response.data);
      });
  });
}

export function Logout() {
  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://app.subtl.ai/api/auth/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth_token,
            accept: "application/json",
          },
        }
      )
      .then(
        (response) => {
          if (response.status == 200) {
            resolve(true);
          }
        },
        (error) => {
          reject(true);
        }
      );
  });
}
