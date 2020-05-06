import React, { Component } from "react";
import { CX } from "./Config";

const GNAME = "danskMedierOnly";
class CustomGoogleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchString: "",
      mouseoverDivId: "",
      isDropdownVisible: false,
    };
    this.inputRef = React.createRef();
    this.buttonDivRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      /*eslint-disable no-undef*/
      const ele = google.search.cse.element.getElement(GNAME);
      if (ele) ele.execute(this.state.searchString);
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

      //const customNodeToInsert = createCustomNode(results);

      //   resultsDiv.appendChild(customNodeToInsert);
    }
    return true; //Google will not populate search results
  };
  // createCustomNode = (results) => {
  //   const table = document.createElement("table");
  //   for (const result of results) {
  //     const row = table.insertRow(-1);
  //     const cell = row.insertCell(-1);
  //     const [anchor, span] = this.makeResultParts(result);
  //     cell.appendChild(anchor);
  //     const cell2 = row.insertCell(-1);
  //     cell2.appendChild(span);
  //   }
  // };
  // makeResultParts = (result) => {
  //   const anchor = document.createElement("a");
  //   anchor.href = result["url"];
  //   anchor.target = "_blank";
  //   anchor.classList.add("gs_title");
  //   anchor.appendChild(document.createTextNode(result["visibleUrl"]));
  //   const span = document.createElement("span");
  //   span.innerHTML = " " + result["title"];
  //   span.setAttribute("onClick", "handleClick");
  //   return [anchor, span];
  // };

  handleOnRederCallback = (a, b, c, d, e, f) => {
    //let's insert a newly created node after gsc-result as it's first child
    // const newEle = document.createElement("div");
    // newEle.classList.add("my-custom-results");
    // const ref = document.querySelector("div.gsc-result");
    // if (ref) {
    //   ref.parentNode.insertBefore(newEle, ref.nextSibling);
    // }

    // const eleToBeCloned = document.querySelector(
    //   "div.my-dummy-results-placeholder"
    // );
    // const clone = eleToBeCloned.cloneNode(true);

    // clone.id = "cloneSearchResultParent";

    // const fragment = document.createDocumentFragment();
    // fragment.appendChild(clone);
    // document
    //   .querySelector("div.gsc-webResult.gsc-result")
    //   .appendChild(fragment);

    // const divEle = document.getElementById("cloneSearchResultParent");
    // if (divEle) {
    //   divEle.addEventListener("mouseenter", this.handleMouseEnterOnDiv, true);
    // }

    //hide ads
    const adBlock = document.querySelector(".gsc-adBlock");
    if (adBlock) {
      adBlock.style.display = "none";
    }

    const googleBranding = document.querySelector(
      ".gcsc-more-maybe-branding-root"
    );
    if (googleBranding) {
      googleBranding.style.display = "none";
    }
  };
  myWebStartingCallback = (gname, query) => {
    //here we can modify query with other parameters such as after: before: etc
    return query;
  };
  handleTitleClick = (e) => {
    console.warn("handleTitleClick, i am working!");
  };
  handleMouseEnter = (event) => {
    event.preventDefault();

    const currentBlockId = event.currentTarget.getAttribute("id");
    if (currentBlockId) {
      this.setState({
        isDropdownVisible: true,
        mouseoverDivId: currentBlockId,
      });
    }
  };
  handleMouseLeave = (event) => {
    this.setState({ isDropdownVisible: false });
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

    document.addEventListener("click", this.handleClickOnNewAddedList, false);
  }

  handleClickOnNewAddedList = (event) => {
    if (!event.target.closest("#cloneSearchResultParent")) return;
    const clickedItem = event.target;
    if (clickedItem.classList.contains("search-result--title")) {
      console.warn("new event listener works!");
    }
  };

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOnNewAddedList,
      false
    );
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
        <div id='customResult-dummy' className='my-dummy-results-placeholder'>
          {this.state.searchResults &&
            this.state.searchResults.map((item, index) => {
              return (
                <div
                  id={`listCard${index}`}
                  key={index}
                  className='list-card'
                  ref={this.buttonDivRef}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <div
                    className=' title search-result--title list-card--headline card-text'
                    onClick={(e) => this.handleTitleClick(e)}
                  >
                    {" "}
                    {item.titleNoFormatting}{" "}
                  </div>
                  <div className='url'>
                    <a href={item.url} className='article-link'>
                      {item.visibleUrl}
                    </a>
                  </div>
                  <div className='list-header--description card-text'>
                    {item.contentNoFormatting}
                  </div>
                  <div className='list-header--icon-link-placeholder d-flex justify-content-between'>
                    <div className='list-header--icon-link-placeholder__identifier-source d-inline-flex'>
                      <div className='list-header--time d-flex align-self-center small'>
                        I dag 10:58
                      </div>
                    </div>
                    <div className='d-inline-flex post-it-text-and-button'>
                      <div
                        className={`${
                          this.state.isDropdownVisible &&
                          this.state.mouseoverDivId === `listCard${index}`
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        <button
                          id='artId-bb91ef20'
                          className='btn btn-sm btn-primary dropdown-toggle list-card--save-link-gem-btn'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Gem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className='gcse-searchresults-only'
          data-defaulttorefinement='dansk-medier'
          data-gname='danskMedierOnly'
        ></div>
      </React.Fragment>
    );
  }
}

export default CustomGoogleSearch;
