import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      cats: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({cats: users}));
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  render(){
    const {cats, searchfield} = this.state
    const filteredRobots = cats.filter(cat => {
      return cat.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if (!cats.length){
      return <h1>Loading</h1>
    }else{
      return (
        <div className = 'tc'>
          <h1>CatFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    } 
  }
}

export default App;
