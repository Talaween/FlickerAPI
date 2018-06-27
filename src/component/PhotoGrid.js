import React, { Component } from 'react';
import './PhotoGrid.css';
import Card from './Card.js';

class PhotoGrid extends Component {
  render() {

    //if the photogrid recieves an empty array
    if(this.props.items.length === 0){
      return <div>No data to show</div>
    }
    var gridElements = this.props.items.map((item, i) =>{

        return <Card authorName={item.author} 
            imgPath={item.media.m} imgTitle={item.title} 
            imgTags={item.tags} imgDescrption={item.description}
            authorId={item.author_id} imgSource={item.link} key={i} />
    });

    return (
    
        <div className="columns" onScroll={this.props.onScroll}>{gridElements}</div>
      );
    }
}

export default PhotoGrid;