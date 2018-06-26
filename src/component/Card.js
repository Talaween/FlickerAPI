import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {

    return (
        <div className="Card">
  		<img src={this.props.imgPath} alt={this.props.imgTitle}  />
            <div className="container">
              <a href={this.props.imgSource}><h4 className="sameLine">{this.props.imgTitle}</h4></a>
              <p className="sameLine"> &nbsp; by <a href={'https://www.flickr.com/people/' + this.props.authorId }>{this.props.authorName}</a></p>
              <p dangerouslySetInnerHTML={{__html:'Description: ' + this.props.imgDescrption}}></p>
              <p>Tags: {this.props.tags}</p>
           </div>
 	    </div>
       
        );
    }
}
export default Card;