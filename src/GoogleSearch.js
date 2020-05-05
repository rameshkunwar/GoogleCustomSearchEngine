import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CX } from "./Config";

const GNAME = "danskMedierOnly";
class CustomGoogleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], searchString: "", forceRender: false };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      // eslint-disable-next-line no-use-before-define
      // const googleObj = google.search.cse;
      // if (googleObj) {
      /*eslint-disable no-undef*/

      const ele = google.search.cse.element.getElement(GNAME);
      if (ele) ele.execute(this.state.searchString);
      //}
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ searchString: this.inputRef.current.value });
  };
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

  handleOnRederCallback = (a, b, c, d, e, f) => {
    //let's insert a newly created node after gsc-result as it's first child
    const newEle = document.createElement("div");
    newEle.classList.add("my-custom-results");
    const ref = document.querySelector("div.gsc-result");
    if (ref) {
      ref.parentNode.insertBefore(newEle, ref.nextSibling);
    }

    const eleToBeCloned = document.querySelector(
      "div.my-dummy-results-placeholder"
    );
    const clone = eleToBeCloned.cloneNode(true);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(clone);
    document
      .querySelector("div.gsc-webResult.gsc-result")
      .appendChild(fragment);

    const rootEle = document.getElementById("root");

    ReactDOM.hydrate(<CustomGoogleSearch />, rootEle);

    //this.setState({ forceRender: true });

    // var pageId = document.getElementById("pagination");
    // if (pageId) pageId.innerHTML = "";
    // var arr = document.getElementsByClassName("gsc-cursor-page");
    // var toBeinsertedDiv = document.getElementById("pagination");
    // if (toBeinsertedDiv) {
    //   toBeinsertedDiv.innerHTML = "";
    //   for (let i = 0; i < arr.length; i++) {
    //     toBeinsertedDiv.append(arr[i]);
    //   }
    // }
  };
  myWebStartingCallback = (gname, query) => {
    // const ele = google.search.cse.element.getElement(gname);
    // if (ele) {
    //   // ele.execute()
    // }
    return query;
  };
  handleTitleClick = (e) => {
    console.warn("handleTitleClick, i am working!");
  };

  componentDidMount() {
    (function () {
      var cx = CX; //private cx code obtained from Google CSE control panel https://cse.google.com/cse/all
      var gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = false;
      gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
      var s = document.getElementsByTagName("script")[0];

      s.parentNode.insertBefore(gcse, s);
    })();

    window.__gcse || (window.__gcse = {});
    window.__gcse.searchCallbacks = {
      web: {
        starting: this.myWebStartingCallback,
        ready: this.myResultsReadyCallback,
        rendered: this.handleOnRederCallback,
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className='gcse-searchresults-only'></div> */}
        {/* <div className='gcse-search' data-queryparametername='search'></div> */}
        <div className='input-field'>
          <input ref={this.inputRef} type='text' name='search' />
          <button
            className='btn btn-primary'
            onClick={(e) => this.handleSearch(e)}
          >
            search
          </button>
        </div>
        <div
          className='gcse-searchresults-only'
          data-defaulttorefinement='dansk-medier'
          data-gname='danskMedierOnly'
        >
          {/* <div
            id='pagination'
            className='pagination'
            style={{ marginTop: "3rem" }}
          ></div> */}
        </div>
        <div id='customResult-dummy' className='my-dummy-results-placeholder'>
          {this.state.searchResults &&
            this.state.searchResults.map((item, index) => {
              return (
                <div className='search-container d-inline' key={index}>
                  <div
                    className='d-inline title'
                    onClick={(e) => this.handleTitleClick(e)}
                  >
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
        </div>
      </React.Fragment>
    );
  }
}

export default CustomGoogleSearch;
