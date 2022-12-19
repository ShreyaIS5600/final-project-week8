import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "./admin.service";

export function SelectTeams(props) {
  const defaultData = { teamId: 0, teamName: "-" };

  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [teamOne, setTeamOne] = useState(defaultData);
  const [teamTwo, setTeamTwo] = useState(defaultData);

  let nav = useNavigate();
  useEffect(() => {
    adminService.fetchAllTeamService().then((resp) => {
      setTeamList(resp.data);
    });
  }, []);

  const postData = () => {
    if (teamOne.teamId === 0) {
      setErrorMsg("Select Team 1");
    } else if (teamTwo.teamId === 0) {
      setErrorMsg("Select Team 2");
    } else if (teamOne.teamId === teamTwo.teamId) {
      setErrorMsg("Team 2 cannot be same with Team 1");
    } else {
      setErrorMsg("");
      let data = {
        teamOne,
        teamTwo,
      };
      setLoading(true);
      sessionStorage.setItem("admin.teams.data", JSON.stringify(data));
      nav("/admin/addMatchData");
    }
  };

  return (
    <div className="row">
      <h1 className="mb-4">Add Match</h1>
      <div className="col-md-8">
        <h5 className="text-danger">{errorMsg}</h5>
        <div className="row mb-3">
          <label className="col-md-3 text-md-end">Team 1:</label>
          <div className="col-md-8">
            <select
              className="form-control"
              onChange={(e) => setTeamOne(JSON.parse(e.target.value))}
            >
              <option value={JSON.stringify(defaultData)}>-</option>
              {teamList.map((m) => {
                return (
                  <option
                    key={m.id}
                    value={JSON.stringify({ teamId: m.id, teamName: m.name })}
                  >
                    {m.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 text-md-end">Team 2:</label>
          <div className="col-md-8">
            <select
              className="form-control"
              onChange={(e) => setTeamTwo(JSON.parse(e.target.value))}
            >
              <option value={JSON.stringify(defaultData)}>-</option>
              {teamList.map((m) => {
                return (
                  <option
                    key={m.id}
                    value={JSON.stringify({ teamId: m.id, teamName: m.name })}
                  >
                    {m.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-11">
            <div className="float-end">
              {loading === true ? (
                <div>
                  <i className="fa fa-sync fa-spin me-1"></i>Please wait...
                </div>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={postData}
                  type="button"
                >
                  <i className="fa fa-save"></i> Post Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
