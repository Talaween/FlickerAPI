import React, { Component } from 'react';
import './Header.css';
import react_logo from '../img/react_logo.svg';

class Header extends Component {
  render() {

    var FontAwesome = require('react-fontawesome');

    return (

        <div class="header">
            <img src={react_logo} alt="React logo" /><a href="#default" class="logo"> React App to cosume Flicker API</a>
            <div class="header-right">
                <div class="search-container">
                    <form action="">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><FontAwesome name='search' /></button>
                    </form>
                </div>
            </div>
        </div>
       
        );
    }
}
export default Header;