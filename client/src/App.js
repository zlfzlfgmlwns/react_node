import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { TableHead, Table, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import CustomerAdd from './components/CustomerAdd';


const styles = theme => ({
  root: {
    width:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX:'auto'
  },
  table:{
    minWidth: 1080
  },
  progress:{
    margin:theme.spacing.unit * 2
  }
})

class App extends Component {

  state = {
    customers: "",
    completed:0
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res =>this.setState({customers:res}))
    .catch(err=> console.log(err))
  }

  callApi = async() =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () =>{
    const {completed} = this.state;

    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>생년월일</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>직업</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? 
                this.state.customers.map (data =>{return (<Customer key={data.id}id={data.id}image={data.image}name={data.name}birthday={data.birthday}gender={data.gender}job={data.job}/>)})
                : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>  
          </Table>
        </Paper>
        <CustomerAdd/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
