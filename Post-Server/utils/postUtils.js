const axios = require("axios");
const mongoose = require("mongoose");

async function getPostsData(posts) {
  return await Promise.all(posts.map(post => fetchPostData(post)));
}

async function fetchPostData(post) {
  return await axios
    .get("http://" + process.env.DS_IP_ADDR + ":5000/api/users/" + post.userid)
    .then(resp => {
      return getCommentsData(post.comments)
        .then(comments => {
          return {
            _id: post._id,
            title: post.title,
            description: post.description,
            user: getUserData(resp, post.userid),
            comments: comments
          };
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log("fetchPostData: ", err);
    });
}

async function getCommentsData(comments) {
  return await Promise.all(comments.map(comment => fetchCommentData(comment)));
}

async function fetchCommentData(comment) {
  return await axios
    .get(
      "http://" + process.env.DS_IP_ADDR + ":5000/api/users/" + comment.userid
    )
    .then(resp => {
      return {
        comment: comment.comment,
        _id: comment._id,
        user: getUserData(resp, comment.userid)
      };
    })
    .catch(err => {
      console.log("fetchCommentData: ", err);
    });
}

function getUserData(resp, userid) {
  return {
    userid: userid,
    firstname: resp.data.data.firstname,
    lastname: resp.data.data.lastname,
    graphic: resp.data.data.graphic
  };
}

function getUpdatedPostData(req) {
  updatedPostData = {};
  req.body.title && (updatedPostData.title = req.body.title);
  req.body.description && (updatedPostData.description = req.body.description);
  return updatedPostData;
}

function getNewPostData(req, userid) {
  postData = { _id: mongoose.Types.ObjectId(), userid: userid };
  req.body.title && (postData.title = req.body.title);
  req.body.description && (postData.description = req.body.description);

  return postData;
}

module.exports = { getPostsData, getUpdatedPostData, getNewPostData };
