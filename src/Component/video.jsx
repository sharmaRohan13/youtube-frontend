import React, { Component } from "react";
import axios from "axios";
import getDB from "../Action/getDB";
import { connect } from "react-redux";
import getLike from "../Action/getLike";
import getLiked from "../Action/getLiked";
import getDislike from "../Action/getDislike";
import getDisliked from "../Action/getDisliked";
import getComment from "../Action/getComment";
import Comments from "../Component/Comments/comment.jsx";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComment: false
    };
    this.showComment = () => {
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
                    data.push(x.snippet.topLevelComment.snippet.textOriginal);
                  });
                  this.props.getComment(data);
                });
            }
          }
          this.setState({ showComment: !this.state.showComment });
        });
    };
    this.clicked = obj => {
      console.log("helllooooooo");
      axios
        .patch(`http://localhost:4200/videoDetail/${this.props.id}`, obj)
        .then(() => {
          if (obj.liked == true) {
            this.props.getLiked(true);
          } else {
            this.props.getDisliked(true);
          }
        });
    };
  }
  render() {
    console.log("Video props", this.props);
    //1st rendering
    if (this.props.inDB === null) {
      axios
        .get(`http://localhost:4200/videoDetail/${this.props.id}`)
        //Search in DB
        .then(res => {
          //Not found in DB
          if (res.data === null) {
            axios
              .get(
                `https://www.googleapis.com/youtube/v3/videos?id=${
                  this.props.id
                }&key=<API_KEY>&part=statistics`
              )
              //get data from Youtube API
              .then(result => {
                var stats = result.data.items[0].statistics;
                let data = {
                  like: stats.likeCount,
                  dislike: stats.dislikeCount,
                  liked: false,
                  disliked: false
                };
                //Post data to DB
                axios
                  .post(
                    `http://localhost:4200/videoDetail/${this.props.id}`,
                    data
                  )
                  .then(d => {
                    //If posted Successfully then get data from DB
                    axios
                      .get(`http://localhost:4200/videoDetail/${this.props.id}`)
                      .then(res => {
                        this.props.getDB(true);
                        this.props.getLike(res.data.like);
                        this.props.getDislike(res.data.dislike);
                        this.props.getLiked(res.data.liked);
                        this.props.getDisliked(res.data.disliked);
                      })
                      .catch(e => {
                        e => {
                          console.log(e);
                        };
                      });
                  })
                  .catch(e => {
                    console.log(e);
                  });
              });
          }
          //Found in DB
          else {
            this.props.getDB(true);
            this.props.getLike(res.data.like);
            this.props.getDislike(res.data.dislike);
            this.props.getLiked(res.data.liked);
            this.props.getDisliked(res.data.disliked);
          }
        });
    }
    return (
      <React.Fragment>
        <div>
          <iframe
            width="700"
            height="393"
            src={`https://www.youtube.com/embed/${this.props.id}`}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <br />
        <button
          className="btn btn-primary m-2"
          disabled={this.props.liked || this.props.disliked}
          onClick={() => {
            this.clicked({ liked: true, disliked: false });
          }}
        >
          Like {this.props.like + (this.props.liked ? 1 : 0)}
        </button>
        <button
          className="btn btn-danger m-2"
          disabled={this.props.liked || this.props.disliked}
          onClick={() => {
            this.clicked({ liked: false, disliked: true });
          }}
        >
          Dislike {this.props.dislike + (this.props.disliked ? 1 : 0)}
        </button>
        <br />
        <button
          onClick={() => {
            this.showComment();
          }}
        >
          Comments
        </button>
        <br />
        <br />
        <div>
          {this.state.showComment ? <Comments {...this.props} /> : <div />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = storeObjects => {
  return {
    // result: storeObjects.result,
    // view: storeObjects.view,
    inDB: storeObjects.inDB,
    like: storeObjects.like,
    dislike: storeObjects.dislike,
    liked: storeObjects.liked,
    disliked: storeObjects.disliked,
    showComment: storeObjects.showComment,
    comment: storeObjects.comment
  };
};

const mapDispatchToProps = dispatchEvent => {
  return {
    getDB: data => {
      dispatchEvent(getDB(data));
    },
    getLike: data => {
      dispatchEvent(getLike(data));
    },
    getDislike: data => {
      dispatchEvent(getDislike(data));
    },
    getLiked: data => {
      dispatchEvent(getLiked(data));
    },
    getDisliked: data => {
      dispatchEvent(getDisliked(data));
    },
    getComment: data => {
      dispatchEvent(getComment(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
