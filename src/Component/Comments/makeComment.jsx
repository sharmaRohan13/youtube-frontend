import React, { Component } from "react";

import axios from "axios";

class MakeComment extends Component {
  constructor(props) {
    super(props);
    this.clicked = () => {
      console.log("clicked");
      let comment = document.getElementById("makeComment").value;
      if (comment != null || comment != "") {
        axios
          .post(`http://localhost:4200/videoComments/${this.props.id}`, {
            comment
          })
          .then(res => {
            alert("comment saved");
            document.getElementById("makeComment").value = "";
            let data = [];
            axios
              .get(`http://localhost:4200/videoComments/${this.props.id}`)
              .then(res => {
                if (res.data.length >= 0) {
                  if (res.data != []) {
                    res.data.map(x => {
                      data.unshift(x.comment);
                    });
                  }
                  if (data.length < 15) {
                    let len = 15 - data.length;
                    axios
                      .get(
                        `https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&maxResults=${len}&videoId=${
                          this.props.id
                        }&key=<API_KEY>`
                      )
                      .then(res => {
                        res.data.items.map(x => {
                          data.push(
                            x.snippet.topLevelComment.snippet.textOriginal
                          );
                        });
                        this.props.getComment(data);
                      });
                  }
                }
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  }
  render() {
    console.log("makeComment props", this.props);
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-11">
            <input
              type="text"
              id="makeComment"
              className="form-control"
              placeholder="Enter text to comment"
              autoFocus
            />
          </div>
          <div className="col-1">
            <button
              onClick={() => {
                this.clicked();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MakeComment;
