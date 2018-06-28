import React, { Component } from 'react';
import './PhotoGrid.css';
import Card from './Card.js';

class PhotoGrid extends Component {
  render() {

    //if the photogrid recieves an empty array
    if(this.props.items.length === 0){
      if(this.props.searchTerm != "")
        return (<div className="noResult"><br/>Your search for '{this.props.searchTerm}' returned no results</div>);
      else
        return (<div className="noResult"><br/>please wait while we are connecting to Flickr API</div>);

      
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