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
      //   const table = document.createElement("table");
      //   for (const result of results) {
      //     const row = table.insertRow(-1);
      //     const cell = row.insertCell(-1);
      //     const [anchor, span] = this.makeResultParts(result);
      //     cell.appendChild(anchor);
      //     const cell2 = row.insertCell(-1);
      //     cell2.appendChild(span);
      //   }
      //   resultsDiv.appendChild(table);
    }
    return true;
  };
  makeResultParts = (result) => {
    const anchor = document.createElement("a");
    anchor.href = result["url"];
    anchor.target = "_blank";
    anchor.classList.add("gs_title");
    anchor.appendChild(document.createTextNode(result["visibleUrl"]));
    const span = document.createElement("span");
    span.innerHTML = " " + result["title"];
    span.setAttribute("onClick", "handleClick");
    return [anchor, span];
  };

  handleOnRederCallback = (a, b, c, d) => {
    debugger;
    var arr = document.getElementsByClassName("gsc-cursor-page");
    var toBeinsertedDiv = document.getElementById("pagination");
    if (toBeinsertedDiv) {
      toBeinsertedDiv.innerHTML = "";
      for (let i = 0; i < arr.length; i++) {
        toBeinsertedDiv.append(arr[i]);
      }
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
        rendered: this.handleOnRederCallback,
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className='gcse-searchresults-only'></div> */}
        <div className='gcse-search' data-queryparametername='search'></div>
        <div className='gcse-searchresults'>
          {this.state.searchResults &&
            this.state.searchResults.map((item, index) => {
              return (
                <div className='search-container d-inline' key={index}>
                  <div className='d-inline title'>
                    {" "}
                    {item.titleNoFormatting}{" "}
                  </div>
                  <div className='d-inline url'>
                    <a href={item.url} className='article-link'>
                      {item.visibleUrl}
                    </a>
                  </div>
                </div>
              );
            })}
          <div
            id='pagination'
            className='pagination'
            style={{ marginTop: "3rem" }}
          ></div>
        </div>
      </React.Fragment>
    );
  }
}

const handleClick = (evt) => {
  debugger;
  console.log("handled clicked!");
};

export default CustomGoogleSearch;
