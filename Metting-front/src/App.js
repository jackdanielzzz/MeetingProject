import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { Switch, Route, Link } from "react-router-dom";
import { userAPI } from "./api/userAPI";
import { MeetingTable } from "./components";
import EditMeeting from "./components/EditMeeting";
import NotFoundPage from "./components/NotFoundPage";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography, Button, MenuItem } from "@material-ui/core";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      meetings: [],
      subdivisions: [],
      employees: [],

      subject: "",
      subdiv: "",
      subdivId: 0,
      respons: "",
      responsId: 0,
    };
  }

  componentDidMount() {
    this.setState({
      meetings: [],
    });

    trackPromise(
      userAPI.fetchAllMeetings().then((meetings) => {
        this.setState({
          meetings,
        });
      }),

      userAPI.fetchAllEmployees().then((employees) => {
        this.setState({
          employees,
        });
      }),

      userAPI.fetchAllSubdivisions().then((subdivisions) => {
        this.setState({
          subdivisions,
        });
      })
    );
  }

  onChangeResponsible = (e) => {
    this.setState({respons: this.state.employees[e.target.value-1].name, responsId: e.target.value});
  };

  onChangeSubdivision = (e) => {
    this.setState({subdiv: this.state.subdivisions[e.target.value-1].sub_name, subdivId:e.target.value});
  };

  onChangeSubject = (e) => {
    this.setState({subject: e.target.value});
  };

  onSearchClick = () => {
    trackPromise(
      userAPI.searchMeeting('/search?subject=' + this.state.subject + '&subdiv=' + this.state.subdiv + '&respons=' +this.state.respons )
      .then((meetings) => {
        this.setState({
          meetings,
        });
      })
    )
  };

  onResetClick = () => {
    window.location.href = "/";
  };

  render() {
    const listSubdivisions = this.state.subdivisions.map((subdiv) => (
      <MenuItem key={subdiv.subname_id} value={subdiv.subname_id}>
        {subdiv.sub_name}
      </MenuItem>
    ));

    const listEmployees = this.state.employees.map((employee) => (
      <MenuItem key={employee.n_id} value={employee.n_id}>
        {employee.name}
      </MenuItem>
    ));

    const searchArea = (
      <Paper>
        <table cellPadding="1">
          <thead>
            <tr>
              <td>
                <Typography variant="button" display="block" color="primary">
                  Тема:
                </Typography>
              </td>
              <td>
                <TextField
                  fullWidth
                  onChange={this.onChangeSubject}
                  autoFocus
                  variant="outlined"
                  size="small"
                  value={this.state.subject}
                />
              </td>
              <td>
                <Typography variant="button" display="block" color="primary">
                  Подразделение:
                </Typography>
              </td>
              <td>
                <TextField
                  select
                  onChange={this.onChangeSubdivision}
                  value={this.state.subdivId}
                  variant="outlined"
                  size="small"
                >
                  {listSubdivisions}
                </TextField>
              </td>
              <td>
                <Typography variant="button" display="block" color="primary">
                  Ответственный:
                </Typography>
              </td>
              <td>
                <TextField
                  select
                  onChange={this.onChangeResponsible}
                  value={this.state.responsId}
                  variant="outlined"
                  size="small"
                >
                  {listEmployees}
                </TextField>
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  onClick={this.onSearchClick}
                  variant="contained"
                  color="primary"
                >
                  Поиск
                </Button>
              </td>
              <td>
                <Button onClick={this.onResetClick} variant="contained">
                  Сброс
                </Button>
              </td>
            </tr>
          </thead>
        </table>
      </Paper>
    );

    return (
      <div>
        <Switch>
          <Route path="/edit/:meetId" component={EditMeeting} />
          <Route path="/new" component={EditMeeting} />
          {/* <Route path = "/zzz" component = { NewMeeting } /> */}
          <Route exact path="/">
            {searchArea}
            <MeetingTable meetList={this.state.meetings} />
            <Link to={"/new"}>
              <Button variant="contained" color="primary">
                New meeting
              </Button>
            </Link>
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
