import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      category: "",
      loading: true,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsDragon`;
  }

  
  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(data);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      category: parsedData.category,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }

  fetchMoreData = async() => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page + 1});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(data);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      category: parsedData.category
    })
  };

  handlePrevClick = async() => {
    console.log("prev");
    this.setState({page: this.state.page - 1});
    this.updateNews(); 
  }

  handleNextClick = async() => {
    console.log("next");
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }

   capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render(){
    return (
      <>
      <h1 className="text-center">NewsDragon - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
      {this.state.loading && <Spinner/>} 
      {this.state.articles && (
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading && this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title: ""}
                      description={element.description ? element.description: ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}     
                      source={element.source.name}            
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
        
    );
  }
}

export default News;