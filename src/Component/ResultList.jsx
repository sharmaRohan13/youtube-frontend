import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavLink,
  Link,
  BrowserRouter,
  withRouter,
  Redirect
} from "react-router-dom";
import getDB from "../Action/getDB";
import getData from "../Action/getData";
import getView from "../Action/getView";

class ResultList extends Component {
  constructor() {
    super();
    this.setRedirect = id => {
      return () => {
        <Redirect to={`/video/${id}`} />;
      };
    };
  }
  render() {
    console.log("Result list props", this.props);
    return (
      <div>
        {this.props.result.length === 0 ? (
          <div />
        ) : (
          <div>
            {this.props.result.map(x => (
              <div className="card m-1" key={x.etag}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-4">
                      <a href={`video/${x.id.videoId}`} target="_blank">
                        <img
                          src={x.snippet.thumbnails.high.url}
                          width="96"
                          height="72"
                          alt={x.etag}
                        />
                      </a>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-8">
                      <a href={`video/${x.id.videoId}`} target="_blank">
                        <h6 style={{ fontFamily: "verdana", color: "black" }}>
                          {x.snippet.title}
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = storeObjects => {
  return {
    result: storeObjects.result,
    view: storeObjects.view,
    inDB: storeObjects.inDB
  };
};

const mapDispatchToProps = dispatchEvent => {
  return {
    getData: data => {
      dispatchEvent(getData(data));
    },
    getView: data => {
      dispatchEvent(getView(data));
    },
    getDB: data => {
      dispatchEvent(getDB(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultList);
