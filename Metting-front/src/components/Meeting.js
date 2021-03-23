import React, { useState, useEffect, useRef }  from 'react'
import MeetingService from '../services/MeetingService'
import { withStyles } from '@material-ui/core/styles';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = theme => ({
  table: {
    minWidth: 700,
  },
})

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const area = 'persons';
const apiUrl = 'http://localhost:8181/api';

const MyComponent = (props) => {    
  const [appState, setAppState] = useState();
  
  const { promiseInProgress } = usePromiseTracker({ area });
  const [ persons, setPersons ] = useState(null);

  useEffect(() => {
    trackPromise(axios.get(apiUrl), area).then(({ data }) => {
      setPersons(data);
    });
  }, [setAppState]);

  console.log({promiseInProgress});
  console.log({persons});

  return (
    <div className="app">
        {promiseInProgress
          ? <div>Подождите, данные загружаются!</div>
          : <div>
              <TableContainer component={Paper}>
      <Table className="app1" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Время</StyledTableCell>
            <StyledTableCell align="center">Тема</StyledTableCell>
            <StyledTableCell align="center">Подразделение</StyledTableCell>
            <StyledTableCell align="center">Ответственный</StyledTableCell>
            <StyledTableCell align="center">{promiseInProgress}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {this.state..map((meet) => (
            <StyledTableRow key={meet.id}>
              <StyledTableCell component="th" scope="row">{meet.dateTime}</StyledTableCell>
              <StyledTableCell align="center">{meet.subject}</StyledTableCell>
              <StyledTableCell align="center">{meet.meetSubdivision}</StyledTableCell>
              <StyledTableCell align="center">{meet.carbs}</StyledTableCell>
              <StyledTableCell align="center">{meet.protein}</StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
          </div> }
    </div>
  );
}

class MeetingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    };
  }

  getMeetingsData(){
    MeetingService.getMeetings().then((response) => {
        this.setState({ meetings: response.data});
      });
  }
  componentDidMount() {
   // this.getMeetingsData();
  }

  render() {

    const useFirstRender = () => {
      const ref = useRef(true);
      const firstRender = ref.current;
      ref.current = false;
      return firstRender;
    };

    const { classes } = this.props;
    //console.log(this.state.meetings);
    return (

      11
      // <MyComponent></MyComponent>
    
    );

  }
}

export default withStyles(useStyles) (MeetingComponent)