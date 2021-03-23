import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { userAPI } from "../api/userAPI";
import { Paper, Typography, Button, Checkbox, MenuItem, Table } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";


class EditMeeting extends Component {
  constructor() {
    super();
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.onChangeSubdivision = this.onChangeSubdivision.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.state = {
      meet: [],
      subdivisions: [],
      employees: [],

      isNew: false, 
    };
  }

  componentDidMount() {

    trackPromise(
      userAPI
        .fetchSelectedMeeting("/edit/" + this.props.match.params.meetId)
        .then((meet) => {
          this.setState({
            meet,
          });
        }), 

      userAPI
        .fetchAllEmployees(this.props.match.params.meetId)
        .then((employees) => {
          this.setState({
            employees,
          });
        }),

      userAPI
        .fetchAllSubdivisions()
        .then((subdivisions) => {
          this.setState({
            subdivisions,
          });
        })
    );
    
    if (this.props.match.params.meetId === undefined) {
      var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() +  ':' + today.getMinutes();

      var data = {
        subject:'',
        responsible: { n_id: 1 },
        meetSubdivision: { subname_id: 1 },
        dateTime: date,
      }
      this.setState({isNew: true, meet: data});

    }
  }
  onChangeDate = (e) => {
    
  }

  onChangeSubject = (e) => {
    const subject = e.target.value;
    
      this.setState(function(prevState) {
        return {
          meet: {
            ...prevState.meet,
            subject: subject
          }
        };
      });
    
  };

  onChangeResponsible = (e) => {
    var responsible = { n_id: e.target.value };

    this.setState(function(prevState) {
      return {
        meet: {
          ...prevState.meet,
          responsible: responsible
        }
      };
    });
  };

  onChangeSubdivision = (e) => {
    var meetSubdivision = { subname_id: e.target.value };

    this.setState(function(prevState) {
      return {
        meet: {
          ...prevState.meet,
          meetSubdivision: meetSubdivision
        }
      };
    });
  };

  handleChangeChk(e) {
    console.log(e.target.selectedValue);
    
    let empls = [...this.state.employees];
    let empl = {...empls[e.target.value-1]};
    empl.present = e.target.checked;
    empls[e.target.value-1] = empl;

    this.setState({employees: empls});
  };

  onSaveClicked = () => {
    userAPI.patchAllData(this.state.employees, 
                         this.state.meet.subject, 
                         this.state.meet.dateTime, 
                         this.state.meet.meetSubdivision.subname_id,
                         this.state.meet.responsible.n_id,
                         this.props.match.params.meetId);
    window.location.href='/'
  };

  onCancelClicked = () => {
    window.location.href='/'
  };

  render() {
    const { meet } = this.state;
    
    const listEmployeesCheckbox = this.state.employees.map(
      (employee) => (
          <tr key={employee.n_id}>
            <td><Checkbox key={employee.n_id} checked={employee.present} value={employee.n_id} onChange={this.handleChangeChk}/></td>
            <td>{employee.name}</td>  
            <td>{employee.age}</td>  
            <td>{employee.subdivision.sub_name}</td> 
          </tr>
      )
    )
  
    const listSubdivisions = this.state.subdivisions.map(
      (subdiv) => (
        <MenuItem 
          key={subdiv.subname_id} 
          value={subdiv.subname_id}>
          {subdiv.sub_name}
        </MenuItem>
      )
    )

    const listEmployees = this.state.employees.map(
      (employee) => (
        <MenuItem 
          key={employee.n_id} 
          value={employee.n_id}>
          {employee.name}
        </MenuItem>
      )
    )

  // if (this.state.meet.length !== 0) console.log(this.state.meet);
  // console.log(this.state.meet);
  // console.log(this.state.isNew);
   
  return (
    <form onSubmit={this.handleSubmit} id="myform">

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
            
            <TextField fullWidth onChange={this.onChangeSubject} autoFocus variant="outlined" size="small" value={ meet.length !== 0 ? meet.subject : ""}/>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="button" display="block" color="primary">
              Дата:
            </Typography>
          </td>
          <td>
            <TextField  
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              value={ meet.length !== 0 ? meet.dateTime : 1 }
              onChange={this.onChangeDate} variant="outlined" size="small" />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="button" display="block" color="primary">
              Подразделение:
            </Typography>
          </td>
          <td>
            <TextField select onChange={ this.onChangeSubdivision } value={ meet.length !== 0 ? meet.meetSubdivision.subname_id : 1 } variant="outlined" size="small">
              { listSubdivisions }
            </TextField>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="button" display="block" color="primary">
              Ответственный:
            </Typography>
          </td>
          <td>
            <TextField select onChange={ this.onChangeResponsible } value={ meet.length !== 0 ? meet.responsible.n_id : 1 } variant="outlined" size="small">
              { listEmployees }
            </TextField>
          </td>
        </tr>
        <td>
            <Typography variant="button" display="block" color="primary">
              Список участников:
            </Typography>
          </td>
        </thead>
      </table>
      </Paper>
      
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Подразделение</th>
          </tr>
        </thead>
        <tbody>{listEmployeesCheckbox}</tbody>
      
      </Table>
      
      <Paper>
        <Link to="/">
          <Button
            variant="contained"
            disableElevation
            fullWidth={true}
            color="primary"
            onClick={this.onSaveClicked}
          >
            Save
          </Button>
         </Link>
      </Paper>
      <Paper>
        <Button
          variant="outlined"
          disableElevation
          fullWidth={true}
          onClick={this.onCancelClicked}
        >
          Return
        </Button>
      </Paper>

    </form>
  );
};
}

export default EditMeeting;