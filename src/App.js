import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';


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
    return (
      <div className="App">
        {
          customers.map (data =>{
            return (
              <Customer 
                key={data.id}
                id={data.id}
                image={data.image}
                name={data.name}
                birthday={data.birthday}
                gender={data.gender}
                job={data.job}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;
