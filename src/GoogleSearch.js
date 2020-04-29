import React, { Component } from "react";
import { CX } from "./Config";
class CustomGoogleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResults !== this.state.searchResults) {
    }
  }
  myResultsReadyCallback = (name, q, promos, results, resultsDiv) => {
    if (results) {
      console.log(results);
      this.setState({ searchResults: results });
    }
  };
  componentDidMount() {
    (function () {
      var cx = CX; //private cx code obtained from Google CSE control panel https://cse.google.com/cse/all
      var gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = true;
      gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
      var s = document.getElementsByTagName("script")[0];

      s.parentNode.insertBefore(gcse, s);
    })();

    window.__gcse || (window.__gcse = {});
    window.__gcse.searchCallbacks = {
      web: {
        ready: this.myResultsReadyCallback,
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className='gcse-searchresults-only'></div> */}
        <div className='gcse-search' data-queryparametername='search'></div>
        <div className='gcse-searchresults'> </div>
      </React.Fragment>
    );
  }
}

export default CustomGoogleSearch;
