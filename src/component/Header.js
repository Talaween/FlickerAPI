import React, { Component } from 'react';
import './Header.css';
import react_logo from '../img/react_logo.svg';

class Header extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          searchFor: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
      }

      handleInputChange(event) {
        this.setState({searchFor: event.target.value});
      }
      
    handleSearchSubmit(event){

        event.preventDefault();
        var searchTerm = this.state.searchFor;
        this.props.onSearchSubmit(searchTerm); 
        
    }
  
    render() {

    var FontAwesome = require('react-fontawesome');

    return (

        <div className="header">
            <img src={react_logo} alt="React logo" /><a href="#default" className="logo"> React App to cosume Flicker API</a>
            <div className="header-right">
                <div className="search-container">
                    <form action="">
                        <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleInputChange} />
                        <button type="submit" onClick={this.handleSearchSubmit}><FontAwesome name='search' /></button>
                    </form>
                </div>
            </div>
        </div>
       
        );
    }
}
export default Header;