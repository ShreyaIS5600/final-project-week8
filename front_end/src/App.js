import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "fontawesome-4.7/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import { AdminBasePage } from "./admin/admin.base.page";
import { AdminLogin } from "./admin/admin.login";
import { TeamListView } from "./audience/team.list.view";
import { TeamDetails } from "./audience/team.details";
import { TeamStatistics } from "./audience/team.statistics";
import { TeamLatestMatch } from "./audience/team.lates.match";
import { TeamLatestWin } from "./audience/team.latest.win";
import { TeamLatestLoss } from "./audience/team.latest.loss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<TeamListView />} />
        <Route path="/teamDetail/:teamName" element={<TeamDetails />} />
        <Route path="/teamStatistics/:teamName" element={<TeamStatistics />} />
        <Route path="/teamLatestMatch/:teamName" element={<TeamLatestMatch />} />
        <Route path="/teamLatestWin/:teamName" element={<TeamLatestWin />} />
        <Route path="/teamLatestLoss/:teamName" element={<TeamLatestLoss />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminBasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
