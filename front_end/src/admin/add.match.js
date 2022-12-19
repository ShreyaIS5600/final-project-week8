import AdminService from "./admin.service";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AddMatchData(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [teamsData, setTeamsData] = useState({ teamOne: {}, teamTwo: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function back() {
    navigate("/admin/selectMatchTeams");
  }

  useEffect(() => {
    let teamdataRef = sessionStorage.getItem("admin.teams.data");
    if (teamdataRef) {
      teamdataRef = JSON.parse(teamdataRef);
      setTeamsData(teamdataRef);
    } else {
      back();
    }
  }, []);

  const postData = (data) => {
    setLoading(true);
    data["team1Id"] = teamsData.teamOne.teamId;
    data["team2Id"] = teamsData.teamTwo.teamId;

    AdminService.addMatchService(data)
      .then((resp) => {
        toast.success(resp.data.message, {
          hideProgressBar: true,
          theme: "colored",
        });
        sessionStorage.removeItem("admin.teams.data");
        back();
      })
      .catch((e) => {
        toast.error(e.response.data);
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(postData)}>
        <h3 className="mb-5">Add Match</h3>
        <div className="row">
          <div className="col-md-12">
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Match:</label>
                  <div className="col-md-8">
                    <label className="form-control">
                      {teamsData.teamOne.teamName}{" "}
                      &nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;{" "}
                      {teamsData.teamTwo.teamName}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Date:</label>
                  <div className="col-md-8">
                    <input
                      type="date"
                      placeholder="Match Date"
                      className="form-control"
                      {...register("date", { required: true })}
                    />
                    {errors.date && (
                      <small className="text-danger">Select Match Date</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">City:</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <small className="text-danger">Enter City</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Venue:</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Match Venue"
                      className="form-control"
                      {...register("venue", { required: true })}
                    />
                    {errors.venue && (
                      <small className="text-danger">Enter Match Venue</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Toss Decision:</label>
                  <div className="col-md-8">
                    <select
                      className="form-control"
                      {...register("tossDecision", { min: 1 })}
                    >
                      <option value={0}>-</option>
                      <option value={teamsData.teamOne.teamId}>
                        {teamsData.teamOne.teamName}
                      </option>
                      <option value={teamsData.teamTwo.teamId}>
                        {teamsData.teamTwo.teamName}
                      </option>
                    </select>
                    {errors.tossDecision && (
                      <small className="text-danger">
                        Select Toss Decision
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Toss Winner:</label>
                  <div className="col-md-8">
                    <select
                      className="form-control"
                      {...register("tossWinner", { min: 1 })}
                    >
                      <option value={0}>-</option>
                      <option value={teamsData.teamOne.teamId}>
                        {teamsData.teamOne.teamName}
                      </option>
                      <option value={teamsData.teamTwo.teamId}>
                        {teamsData.teamTwo.teamName}
                      </option>
                    </select>
                    {errors.tossWinner && (
                      <small className="text-danger">Select Toss Winning</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Winning Team:</label>
                  <div className="col-md-8">
                    <select
                      className="form-control"
                      {...register("winningTeamId", { min: 1 })}
                    >
                      <option value={0}>-</option>
                      <option value={teamsData.teamOne.teamId}>
                        {teamsData.teamOne.teamName}
                      </option>
                      <option value={teamsData.teamTwo.teamId}>
                        {teamsData.teamTwo.teamName}
                      </option>
                    </select>
                    {errors.winningTeamId && (
                      <small className="text-danger">Select Winning Team</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Margin Method:</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Margin Method"
                      className="form-control"
                      {...register("marginMethod", { required: true })}
                    />
                    {errors.marginMethod && (
                      <small className="text-danger">Enter Margin Method</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Umpire One:</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Match Umpire One"
                      className="form-control"
                      {...register("umpire1", { required: true })}
                    />
                    {errors.umpire1 && (
                      <small className="text-danger">Enter Umpire One</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label className="col-md-3 text-md-end">Umpire Two:</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Match Umpire Two"
                      className="form-control"
                      {...register("umpire2", { required: true })}
                    />
                    {errors.umpire2 && (
                      <small className="text-danger">Enter Umpire Two</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="float-end me-5">
                  {loading === true ? (
                    <div>
                      <i className="fa fa-sync fa-spin me-1"></i>Please wait...
                    </div>
                  ) : (
                    <button className="btn btn-success" type="submit">
                      <i className="fa fa-save"></i> Post Data
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <p>&nbsp;</p>
    </div>
  );
}
