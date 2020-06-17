import React, { Component } from "react";
import { connect } from "react-redux";
import getData from "../Action/getData";
import getView from "../Action/getView";
import ResultList from "../Component/ResultList.jsx";
import ResultThumbnail from "../Component/ResultThumbnail.jsx";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import Video from "../Component/video.jsx";

class Main extends Component {
  constructor() {
    super();
    this.toggle = () => {
      if (this.props.view === "list") {
        this.props.getView("thumbnail");
      } else {
        this.props.getView("list");
      }
    };
  }
  render() {
    console.log("Main props", this.props);
    return (
      <div>
        <Switch>
          <Route
            exact={true}
            path="/video/:id"
            render={({ match }) => {
              return <Video id={match.params.id} />;
            }}
          />
          <Route
            exact={true}
            path="/"
            render={() => {
              return (
                <div>
                  {this.props.result === null || this.props.result === [] ? (
                    <div />
                  ) : (
                    <React.Fragment>
                      <div>
                        {this.props.view === "list" ? (
                          <button
                            onClick={this.toggle.bind(this)}
                            className="btn btn-primary"
                          >
                            list
                          </button>
                        ) : (
                          <button
                            onClick={this.toggle.bind(this)}
                            className="btn btn-primary"
                          >
                            thumbnails
                          </button>
                        )}
                      </div>
                      <div>
                        {this.props.view === "list" ? (
                          <ResultList />
                        ) : (
                          <ResultThumbnail />
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = storeObjects => {
  return {
    result: storeObjects.result,
    view: storeObjects.view,
    //For demo purpose
    inDB: storeObjects.inDB,
    like: storeObjects.like,
    dislike: storeObjects.dislike,
    liked: storeObjects.liked,
    disliked: storeObjects.disliked
  };
};

const mapDispatchToProps = dispatchEvent => {
  return {
    getData: data => {
      dispatchEvent(getData(data));
    },
    getView: data => {
      dispatchEvent(getView(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
