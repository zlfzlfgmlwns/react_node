import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { TableHead, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX:'auto'
  },
  table:{
    minWidth: 1080
  }
})
const customers = [{
  'id':1,
  'image': 'https://placeimg.com/64/64/1',
  'name' : '홍길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'

},
{
  'id':2,
  'image': 'https://placeimg.com/64/64/2',
  'name' : '유노키',
  'birthday' : '961222',
  'gender' : '여자',
  'job' : '대학생'

},
{
  'id':3,
  'image': 'https://placeimg.com/64/64/3',
  'name' : '오희준',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'

},
]
class App extends Component {
  render() {
    const {classes} = this.props;
    return (
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
            {customers.map (data =>{return (<Customer key={data.id}id={data.id}image={data.image}name={data.name}birthday={data.birthday}gender={data.gender}job={data.job}/>);})}
          </TableBody>  
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);