import React, { Component } from 'react';
import PhotoGrid from './component/PhotoGrid';
import axios from 'axios';
import Header from './component/Header';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataBeforeSearch:[],
      allowFetchData: true,
      searchTerm: ""
    };

     // This binding is necessary to make `this` work in the callback
     this.handleScroll = this.handleScroll.bind(this);
     this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    
    this.fetchData();
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
 fetchData(){

    if (this.state.allowFetchData == false)
      return;

     let flicker_url = 'https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?format=json&api_key=44cdf4b3834446930d6f62e2863294b4';
    //let flicker_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getPopular&api_key=44cdf4b3834446930d6f62e2863294b4&user_id=25199803@N07&format=json';
    
     axios.get(flicker_url,{ 
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type' : 'application/json'}
      }).then(res => {
       // console.log(res.data);
        var new_data = res.data.split("jsonFlickrFeed(");
        new_data = new_data[1].substring(0, new_data[1].length - 1);
        var jsonData = JSON.parse(new_data);
        const posts = jsonData.items;
        this.beautifyJSONData(posts);

        //copy the current array of data stored int he state object
        let newPosts = this.state.dataBeforeSearch.slice();

        //concatenate the new posts with the new copy of the data
        newPosts = newPosts.concat(posts);

        this.setState({ 
            data: newPosts,
            dataBeforeSearch: newPosts
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

  handleScroll(event){

    //WebKit uses body for keeping track of scrolling, whereas Firefox and IE use html
    let scrollTop = event.srcElement.body.scrollTop || event.srcElement.documentElement.scrollTop ;
    
    let scrollHeight = event.srcElement.body.scrollHeight || event.srcElement.documentElement.scrollHeight;

    let clientHeight =  event.srcElement.documentElement.clientHeight;

   // console.log("scroltop: " + scrollTop + ', scrollheight:' + scrollHeight + ', clientHeight:' + clientHeight);

    //detect when we reach the end of scrolling
    if(scrollHeight - scrollTop <= clientHeight){

      //if so fetch more data from flicker
      this.fetchData();
    }
        
  }

  handleSearch(searchTerm){

    //if search is reset, we go back to our data
    if((searchTerm == null) || (searchTerm == "")){

      let originalData = this.state.dataBeforeSearch.slice();

      this.setState({
        data:originalData,
        allowFetchData: true
      })

      return;
    }

    let temp_data = this.state.dataBeforeSearch;
   
    var searchResult = temp_data.filter((item) =>{

      console.log("searching for:" + searchTerm + " in:" + item.title);

      if((item.title.search(searchTerm) > -1) || (item.description.search(searchTerm) > -1) || (item.tags.search(searchTerm) > -1))
        return item;
    });

    //only update databeforeSearch if this is the first search we do
    //do not featch data while we are in search mode
    this.setState({
      data:searchResult,
      allowFetchData: false,
      searchTerm: searchTerm
    })
  }

  render() {
    //send data only if it is ready
   
       return (
        <div>
          <Header onSearchSubmit= {this.handleSearch} />
          <div className="defaultMargin">..</div>
          <PhotoGrid items={this.state.data} maxCols={4} onScroll={this.handleScroll} searchTerm={this.state.searchTerm} />
        </div>
      );
    
   
   
  }
}

export default App;
