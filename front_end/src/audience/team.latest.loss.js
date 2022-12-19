import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppHeader } from "../app.header";
import audienceService from "./audience.service";

export function TeamLatestLoss(props) {
  const { teamName } = useParams();
  const [teamData, setTeamData] = useState({
    winningTeam: {},
    tossDecision: {},
    tossWinner: {},
  });
  const [againstTeam, setAgainstTeam] = useState("");

  useEffect(() => {
    audienceService.getTeamLatestLoss(teamName).then((resp) => {
      setTeamData(resp.data);
      setTeamData(resp.data);
      if (resp.data.team1.name === teamName) {
        setAgainstTeam(resp.data.team2.name);
      } else {
        setAgainstTeam(resp.data.team1.name);
      }
    });
  }, [teamName]);

  return (
    <div>
      <AppHeader />
      <div className="container">
        <h3>
          <span className="text-danger">{teamName}</span> Lates Loss
        </h3>
        {teamData.id===undefined?<div><p className="text-danger">No Lossing Record Found!</p></div>:<div></div>}
        {teamData.id && (
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td width={185}>Match Date</td>
                  <td>{teamData.date}</td>
                </tr>
                <tr>
                  <td>Match Agains: </td>
                  <td>{againstTeam}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{teamData.city}</td>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>{teamData.venue}</td>
                </tr>
                <tr>
                  <td>Toss Decision</td>
                  <td>{teamData.tossDecision.name}</td>
                </tr>
                <tr>
                  <td>Toss Winner</td>
                  <td>{teamData.tossWinner.name}</td>
                </tr>
                <tr>
                  <td>Match Won By</td>
                  <td>
                    <span className="text-danger">
                      {teamData.winningTeam.name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Margin Method</td>
                  <td>{teamData.marginMethod}</td>
                </tr>
                <tr>
                  <td>Unpire 1</td>
                  <td>{teamData.umpire1}</td>
                </tr>
                <tr>
                  <td>Umpire 2</td>
                  <td>{teamData.umpire2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
