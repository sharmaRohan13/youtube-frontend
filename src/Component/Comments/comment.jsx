import React, { Component } from "react";
import MakeComment from "./makeComment.jsx";
import ViewComments from "./viewComments.jsx";

class Comments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Comment props", this.props);
    return (
      <React.Fragment>
        <MakeComment {...this.props} />
        <br />
        <ViewComments {...this.props} />
      </React.Fragment>
    );
  }
}

export default Comments;
