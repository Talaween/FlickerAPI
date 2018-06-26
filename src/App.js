import React, { Component } from 'react';
import PhotoGrid from './PhotoGrid.js';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?format=json`,{ 
      headers: {
      'Access-Control-Allow-Origin': '*'}
      }).then(res => {
        var new_data = res.data.split("jsonFlickrFeed(");
        new_data = new_data[1].substring(0, new_data[1].length - 1);
        var jsonData = JSON.parse(new_data);
        const posts = jsonData.items;
        this.beautifyJSONData(posts);
        this.setState({ 
            data: posts
          });
        }).catch( (error) => {
        console.log("the following error has occured:" + error);
      });
  }
  
  /****
   * This function is just to extract proper author name and remove image from escription
   * 
   */
  beautifyJSONData(data){
    
    //fixed author names
    data.map((item) => {

      var newItem = Object.assign(item); 

      newItem.author = newItem.author.split('.com ')[1];
      newItem.author =  newItem.author.substring(2,  newItem.author.length - 2);

      //remove img from description to avoid displaying photo twice
      newItem.description = newItem.description.split("<img")[0];

      return newItem;

    })
  }

  render() {
    //send data only if it is ready
    if(this.state.data.length > 0){
       return (
        <PhotoGrid items={this.state.data} maxCols={4} />
      );
    }
    else{
      return (
        <div />
      );
    }
   
  }
}

export default App;
