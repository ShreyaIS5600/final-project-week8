import http from "../http.client";

const fetchAllTeamService = () => {
  return http.get("/fetchAllTeam");
};

const getTeamDetails = (param) => {
  return http.get(`/${param}`);
};

const getTeamStatistic = (param) => {
  return http.get(`/Statistics/${param}`);
};

const getTeamLatestMatch = (param) => {
  return http.get(`/Matches/Latest/${param}`);
};

const getTeamLatestWin = (param) => {
  return http.get(`/Matches/Latest/win/${param}`);
};

const getTeamLatestLoss = (param) => {
  return http.get(`/Matches/Latest/loss/${param}`);
};

const audienceService = {
  fetchAllTeamService,
  getTeamDetails,
  getTeamStatistic,
  getTeamLatestMatch,
  getTeamLatestWin,
  getTeamLatestLoss,
};

export default audienceService;
