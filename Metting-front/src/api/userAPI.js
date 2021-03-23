import { fetchData, patchData } from "./fetch";

const url = "http://localhost:8181/api";

const fetchAllMeetings = () => fetchData(url);
const fetchSelectedMeeting = (meetId) => fetchData(url + meetId);
const searchMeeting = (searchString) => fetchData(url + searchString);
const fetchAllEmployees = (meetId) => fetchData(url + "/getemployees/" + meetId);
const fetchAllSubdivisions = () => fetchData(url + "/getsubdivs");
const patchAllData = (data, subj, date, subdiv, resp, origsubj) =>
  patchData(
    url +
      "/edit/patch?subj=" + subj +
      "&date=" + date +
      "&subdiv=" + subdiv +
      "&resp=" + resp +
      "&origsubj=" + origsubj,
    data
  );

export const userAPI = {
  fetchAllMeetings,
  fetchSelectedMeeting,
  fetchAllEmployees,
  fetchAllSubdivisions,
  patchAllData,
  searchMeeting,
};
