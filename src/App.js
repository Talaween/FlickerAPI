import React, { Component } from 'react';
import PhotoGrid from './component/PhotoGrid';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

     // This binding is necessary to make `this` work in the callback
     this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    
    this.fetchData();
    window.addEventListener('scroll', this.handleScroll);
  }
  

 fetchData(){

    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?format=json`,{ 
      headers: {
      'Access-Control-Allow-Origin': '*'}
      }).then(res => {
        var new_data = res.data.split("jsonFlickrFeed(");
        new_data = new_data[1].substring(0, new_data[1].length - 1);
        var jsonData = JSON.parse(new_data);
        const posts = jsonData.items;
        this.beautifyJSONData(posts);

        //copy the current array of data stored int he state object
        let newPosts = this.state.data.slice();

        //concatenate the new posts with the new copy of the data
        newPosts = newPosts.concat(posts);

        this.setState({ 
            data: newPosts
          });
        }).catch( (error) => {
        console.log("the following error has occured:" + error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  handleScroll(event){

    //WebKit uses body for keeping track of scrolling, whereas Firefox and IE use html
    let scrollTop = event.srcElement.body.scrollTop || event.srcElement.documentElement.scrollTop ;
    
    let scrollHeight = event.srcElement.body.scrollHeight || event.srcElement.documentElement.scrollHeight;

    let clientHeight =  event.srcElement.documentElement.clientHeight;

    //detect when we reach the end of scrolling
    if(scrollHeight - scrollTop === clientHeight){

      //if so fetch more data from flicker
      this.fetchData();
    }
        
  }

  render() {
    //send data only if it is ready
    if(this.state.data.length > 0){
       return (
        <PhotoGrid items={this.state.data} maxCols={4} onScroll={this.handleScroll} />
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
