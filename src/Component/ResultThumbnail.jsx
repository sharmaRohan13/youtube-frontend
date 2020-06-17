import React, { Component } from "react";
import { connect } from "react-redux";

class ResultThumbnail extends Component {
  render() {
    console.log("Result thumbnails props", this.props);
    return (
      <div>
        {this.props.result.length === 0 ? (
          <div />
        ) : (
          <div className="row">
            {this.props.result.map(x => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                key={x.etag}
              >
                <div className="card m-1">
                  <div className="card-body">
                    <a href={`video/${x.id.videoId}`} target="_blank">
                      <img
                        src={x.snippet.thumbnails.high.url}
                        style={{ height: "100%", width: "100%" }}
                        alt={x.etag}
                      />
                      <br />
                      <h6 style={{ fontFamily: "verdana", color: "black" }}>
                        {x.snippet.title}
                      </h6>
                    </a>
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

const storeToProps = storeObject => {
  return {
    result: storeObject.result
  };
};

export default connect(storeToProps)(ResultThumbnail);
