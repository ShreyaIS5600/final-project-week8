import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppHeader } from "../app.header";
import audienceService from "./audience.service";

export function TeamStatistics(props) {
  const { teamName } = useParams();
  const [teamData, setTeamData] = useState({ matchWon: [], matchLost: [] });

  useEffect(() => {
    audienceService.getTeamStatistic(teamName).then((resp) => {
      setTeamData(resp.data);
    });
  }, [teamName]);

  return (
    <div>
      <AppHeader />
      <div className="container">
        <h3>
          <span className="text-info">{teamName}</span> Team Statistics
        </h3>
        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td colSpan={5}>
                      <b className="text-success">Mathes Won</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>S/N</b>
                    </td>
                    <td>
                      <b>Date</b>
                    </td>
                    <td>
                      <b>City</b>
                    </td>
                    <td>
                      <b>Opponent</b>
                    </td>
                    <td>
                      <b>Margin Method</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {teamData.matchWon.map((m, i) => {
                    return (
                      <tr key={i + 12}>
                        <td>{i + 1}</td>
                        <td>{m.date}</td>
                        <td>{m.city}</td>
                        <td>
                          {m.team1.name === teamName
                            ? m.team2.name
                            : m.team1.name}
                        </td>
                        <td>{m.marginMethod}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>
                      <b>
                        Total Match Won:&nbsp;{" "}
                        <span className="text-danger">
                          {teamData.matchWon.length}
                        </span>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <b>
                        Total Match Played:&nbsp;{" "}
                        <span className="text-danger">
                          {teamData.matchWon.length + teamData.matchLost.length}
                        </span>
                      </b>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td colSpan={5}>
                      <b className="text-danger">Mathes Lost</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>S/N</b>
                    </td>
                    <td>
                      <b>Date</b>
                    </td>
                    <td>
                      <b>City</b>
                    </td>
                    <td>
                      <b>Opponent</b>
                    </td>
                    <td>
                      <b>Margin Method</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {teamData.matchLost.map((m, i) => {
                    return (
                      <tr key={i + 12}>
                        <td>{i + 1}</td>
                        <td>{m.date}</td>
                        <td>{m.city}</td>
                        <td>
                          {m.team1.name === teamName
                            ? m.team2.name
                            : m.team1.name}
                        </td>
                        <td>{m.marginMethod}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>
                      <b>
                        Total Match Lost:&nbsp;{" "}
                        <span className="text-danger">
                          {teamData.matchLost.length}
                        </span>
                      </b>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
