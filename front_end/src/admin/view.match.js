import { useEffect, useState } from "react";
import adminService from "./admin.service";

export function ViewMatch(props) {
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    adminService.fetchAllMachesService().then((resp) => {
      setMatchList(resp.data);
    });
  }, []);

  return (
    <div>
      <h3 className="mb-3">View Match</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                <b>S/N</b>
              </td>
              <td>
                <b>Date</b>
              </td>
              <td>
                <b>Team One</b>
              </td>
              <td>
                <b>Team Two</b>
              </td>
              <td>
                <b>City</b>
              </td>
              <td>
                <b>Venue</b>
              </td>
              <td>
                <b>Toss Decision</b>
              </td>
              <td>
                <b>Toss Winner</b>
              </td>
              <td>
                <b>Winning Team</b>
              </td>
              <td>
                <b>Margin Method</b>
              </td>
              <td>
                <b>Umpire 1</b>
              </td>
              <td>
                <b>Umpire 2</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {matchList.map((m, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{m.date}</td>
                  <td>{m.team1.name}</td>
                  <td>{m.team2.name}</td>
                  <td>{m.city}</td>
                  <td>{m.venue}</td>
                  <td>{m.tossDecision.name}</td>
                  <td>{m.tossWinner.name}</td>
                  <td>{m.winningTeam.name}</td>
                  <td>{m.marginMethod}</td>
                  <td>{m.umpire1}</td>
                  <td>{m.umpire2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
