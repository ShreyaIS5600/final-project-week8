import http from "../http.client";

const loginService = (data) => {
  return http.post("/loginEvent", data);
};

const createTeamService = (da) => {
  return http.post("/createTeam", da);
};

const fetchAllTeamService = () => {
  return http.get("/fetchAllTeam");
};

const addMatchService = (data) => {
  return http.post("/addMatch", data);
};

const fetchAllMachesService = () => {
  return http.get("/fetchAllMatches");
};

const adminService = {
  loginService,
  createTeamService,
  fetchAllTeamService,
  addMatchService,
  fetchAllMachesService,
};

export default adminService;
