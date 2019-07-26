import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import { getPosts } from '../actions/postsActions';
import NavbarHeader from './layout/NavbarHeader';
import Posts from './posts/Posts';

class PostsApp extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      alert: false
    };
  }

  componentDidMount() {
    // call posts
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: nextProps.posts.posts });
    }

    if (nextProps.posts.alert !== null) {
      this.toggleAlert();
    }
  }

  toggleAlert = () => {
    this.setState({ alert: !this.state.alert });

    setTimeout(() => this.setState({ alert: false }), 4000);
  };

  onCloseAlert = () => {
    this.setState({ alert: false });
  };

  render() {
    const posts = this.props.posts.posts;

    return (
      <Fragment>
        <NavbarHeader posts={posts} />
        <Posts
          alert={this.state.alert}
          onCloseAlert={this.onCloseAlert}
          toggleAlert={this.toggleAlert}
        />
      </Fragment>
    );
  }
}

PostsApp.propTypes = {
  getPosts: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostsApp);
