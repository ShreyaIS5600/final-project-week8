import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import adminService from "./admin.service";

export function AddTeams(props) {
  const [loading, setLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postTeam = (da) => {
    setLoading(true);

    let data = {
      name: da.teamName,
      matchPlayed: 0,
      matchWon: 0,
      matchLost: 0,
    };

    adminService
      .createTeamService(data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { theme: "colored" });
        formRef.current.reset();
        loadTeamData();
      })
      .catch((e) => {
        toast.error(e.response.data, { theme: "colored" });
      });
  };

  const loadTeamData = () => {
    adminService.fetchAllTeamService().then((resp) => {
      setTeamList(resp.data);
    });
  };

  useEffect(() => {
    loadTeamData();
  }, []);

  return (
    <div className="row">
      <h1 className="mb-4">Add Teams</h1>
      <div className="col-md-6">
        <form ref={formRef} onSubmit={handleSubmit(postTeam)}>
          <div className="row mb-3">
            <label className="col-md-3 text-md-end">Team Name:</label>
            <div className="col-md-8">
              <input
                type="text"
                {...register("teamName", { required: true, min: 4 })}
                className="form-control"
                placeholder="Team name"
              />
              {errors.teamName && (
                <small className="text-danger">Enter Valid Team Name</small>
              )}
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
                  <button className="btn btn-success" type="submit">
                    <i className="fa fa-save"></i> Post Data
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <td colSpan={2}>
                  <b>Team List</b>
                </td>
              </tr>
              <tr>
                <td width={55}>
                  <b>S/N</b>
                </td>
                <td>
                  <b>Team Name</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {teamList.map((m, i) => {
                return (
                  <tr key={m.id}>
                    <td>{i + 1}</td>
                    <td>{m.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
