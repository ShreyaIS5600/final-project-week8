import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppHeader } from "../app.header";
import audienceService from "./audience.service";

export function TeamDetails(props) {
  const { teamName } = useParams();
  const [teamData, setTeamData] = useState({});

  useEffect(() => {
    audienceService.getTeamDetails(teamName).then((resp) => {
      setTeamData(resp.data);
    });
  }, [teamName]);

  return (
    <div>
      <AppHeader />
      <div className="container">
        <h3>Team Details</h3>
        <div className="row">
          <div className="col-md-8">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td width={185}>Team ID</td>
                  <td>{teamData.id}</td>
                </tr>
                <tr>
                  <td>Team Name</td>
                  <td>{teamData.name}</td>
                </tr>
                <tr>
                  <td>Match Played</td>
                  <td>{teamData.matchPlayed}</td>
                </tr>
                <tr>
                  <td>Match Won</td>
                  <td>{teamData.matchWon}</td>
                </tr>
                <tr>
                  <td>Match Loss</td>
                  <td>{teamData.matchLost}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
