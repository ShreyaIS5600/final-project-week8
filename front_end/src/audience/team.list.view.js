import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "../app.header";
import audienceService from "./audience.service";

export function TeamListView(props) {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    audienceService.fetchAllTeamService().then((resp) => {
      setTeamList(resp.data);
    });
  }, []);

  return (
    <div>
      <AppHeader />
      <div className="container">
        <h4>Team List</h4>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <td width={45}>
                  <b>S/N</b>
                </td>
                <td>
                  <b>Team Name</b>
                </td>
                <td>
                  <b>Details</b>
                </td>
                <td>
                  <b>Statistics</b>
                </td>
                <td>
                  <b>Latest Match</b>
                </td>
                <td>
                  <b>Latest Match Win</b>
                </td>
                <td>
                  <b>Lates Match Loss</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {teamList.map((m, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{m.name}</td>
                    <td>
                      <Link to={"/teamDetail/" + m.name}>Details</Link>
                    </td>
                    <td>
                      <Link to={"/teamStatistics/" + m.name}>Statistics</Link>
                    </td>
                    <td>
                      <Link to={"/teamLatestMatch/" + m.name}>Latest Match</Link>
                    </td>

                    <td>
                      <Link to={"/teamLatestWin/" + m.name}>Latest Win</Link>
                    </td>
                    <td>
                      <Link to={"/teamLatestLoss/" + m.name}>Latest Loss</Link>
                    </td>
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
