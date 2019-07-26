import axios from 'axios';

import {
  GET_POSTS,
  SAVE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_ERRORS_POSTS,
  POSTS_LOADING
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  await dispatch(loadingPosts());

  await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS_POSTS,
        payload: err.response.data
      });
    });
};

// Save post
export const savePost = (posts, post) => dispatch => {
  if (post.title && post.body !== '') {
    // insert post in array position 0
    posts.unshift(post);

    // sum id for each post inside array
    posts = posts.map(post => post, { ...post, id: post.id + 1 });

    dispatch({
      type: SAVE_POST,
      payload: posts
    });
  } else {
    dispatch({
      type: GET_ERRORS_POSTS,
      payload: 'Debe completar los campos'
    });
  }
};

// Edit Post
export const editPost = (posts, postSelected) => dispatch => {
  if (
    postSelected.id !== '' &&
    postSelected.title !== '' &&
    postSelected !== ''
  ) {
    // insert object in index posts
    posts[postSelected.id - 1] = postSelected;

    dispatch({
      type: EDIT_POST,
      payload: posts
    });
  } else {
    dispatch({
      type: GET_ERRORS_POSTS,
      payload: posts
    });
  }
};

// Delete post
export const deletePost = (posts, idSelected) => dispatch => {
  if (idSelected >= 0) {
    // remove post by id
    posts = posts.filter(post => post.id !== idSelected);

    dispatch({
      type: DELETE_POST,
      payload: posts
    });
  } else {
    dispatch({
      type: GET_ERRORS_POSTS,
      payload: 'Error al realizar la operación'
    });
  }
};

// Loading posts
export const loadingPosts = () => {
  return {
    type: POSTS_LOADING
  };
};
