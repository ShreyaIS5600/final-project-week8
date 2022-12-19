import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../app.header";
import AdminService from "./admin.service";

export function AdminLogin(props) {
  let navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loginPerform = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = { emailAddress, password };

    AdminService.loginService(data)
      .then((resp) => {
        navigate("/admin");
        window.location.reload();
        localStorage.setItem("admin.data", JSON.stringify(resp.data));
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        if (e) setErrorMsg(e.response.data.message);
      });
  };

  return (
    <div>
      <AppHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form autoComplete="off" onSubmit={loginPerform}>
              <p>&nbsp;</p>
              <h1 className="h3 mb-3 fw-normal">Admin Sign In</h1>
              <h5 className="text-danger">{errorMsg}</h5>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                  autoFocus
                  onChange={(e) => setEmailAddress(e.target.value)}
                  type="email"
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {loading === true ? (
                <div>
                  <i className="fa fa-sync fa-spin me-1"></i>Please wait...
                </div>
              ) : (
                <button
                  className="w-100 btn btn-lg btn-success"
                  onClick={loginPerform}
                  type="submit"
                >
                  <i className="fa fa-sign-in me-1"></i>Sign in
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
