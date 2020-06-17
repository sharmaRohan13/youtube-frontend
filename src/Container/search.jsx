import React, { Component } from "react";
import { connect } from "react-redux";
import getData from "../Action/getData";
import getDB from "../Action/getDB";
import { debounce } from "lodash";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.changed = debounce(() => {
      let text = document.getElementById("search").value.trim();
      const YOUR_API_KEY = "<API_KEY>";
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${text}&type=video&key=${YOUR_API_KEY}`;
      axios.get(url).then(res => {
        this.props.getData(res.data.items);
      });
    }, 300);
  }
  render() {
    console.log("Search props", this.props);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              id="search"
              className="form-control"
              onChange={this.changed.bind(this)}
              placeholder="Enter text to search"
              autoFocus
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = storeObjects => {
  return {
    //view: storeObjects.view
  };
};

const mapDIspatchToProps = dispatchEvent => {
  return {
    getData: data => {
      dispatchEvent(getData(data));
    },
    getDB: data => {
      dispatchEvent(getDB(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDIspatchToProps
)(Search);
