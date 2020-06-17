import React, { Component } from "react";
import axios from "axios";
import getComment from "../../Action/getComment";
import { connect } from "react-redux";

export default class ViewComments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("viewComment props", this.props);
    return (
      <div>
        {this.props.comment === null || this.props.comment === [] ? (
          <div>No comments for now</div>
        ) : (
          <div>
            {this.props.comment.map(x => (
              <div className="card m-1">
                <div className="card-body">{x}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
