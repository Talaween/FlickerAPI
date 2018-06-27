import React, { Component } from 'react';
import './Header.css';
import react from '../img/react.svg';

class Header extends Component {
  render() {

    return (

        <div class="header">
            <img src={react} alt="React logo" /><a href="#default" class="logo"> React App to cosume Flicker API</a>
            <div class="header-right">
                <a class="active" href="http://awad.talaween.net">About Developer</a>
            </div>
        </div>
       
        );
    }
}
export default Header;