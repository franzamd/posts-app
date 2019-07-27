import React, { Component } from 'react';
import { Container, Image, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editPost, deletePost } from '../../actions/postsActions';
import PostItem from './PostItem';
import ModalView from './ModalView';
import Spinner from '../layout/Spinner';
import logo from '../layout/logo.svg';

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      posts: [],
      postSelected: {
        id: '',
        title: '',
        body: ''
      },
      alert: false,
      errors: '',
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: nextProps.posts.posts });
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  onEdit = index => {
    const postFound = this.state.posts.find(post => post.id === index);

    this.setState({
      postSelected: postFound
    });

    this.toggleModal();
  };

  saveChange = e => {
    e.preventDefault();

    this.props.editPost(this.state.posts, this.state.postSelected);

    this.toggleModal();
  };

  onDelete = id => {
    this.props.deletePost(this.state.posts, id);

    this.setState({ postSelected: { id: '', title: '', body: '' } });
  };

  onChangeText = e => {
    this.setState({
      postSelected: {
        ...this.state.postSelected,
        [e.target.name]: e.target.value
      }
    });
  };

  renderModal = () => {
    const { id, title, body } = this.state.postSelected;
    const { modal } = this.state;

    return (
      <ModalView
        id={id}
        title={title}
        body={body}
        modal={modal}
        toggleModal={this.toggleModal}
        saveChange={this.saveChange}
        onChangeText={this.onChangeText}
      />
    );
  };

  render() {
    const { loading } = this.props.posts;
    let { color, message, title } = this.props.posts.alert;

    return (
      <div className='m-5'>
        {this.props.alert && (
          <Alert variant={color} onClose={this.onCloseAlert} dismissible>
            <Alert.Heading>{title}</Alert.Heading>
            <p>{message}</p>
          </Alert>
        )}
        <div className='d-flex align-items-center justify-content-center p-3 my-3 text-white-50 bg-purple rounded bg-dark'>
          <Image className='mr-3' src={logo} width='48' height='48' />
          <div className='d-flex 1h-100 align-items-center'>
            <h6 className='mb-0 1h-100 text-info'>Listado de Posts</h6>
          </div>
        </div>
        <Container className='d-flex flex-wrap align-items-center justify-content-center'>
          {loading ? (
            <Spinner />
          ) : (
            this.state.posts.map(post => {
              return (
                <PostItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              );
            })
          )}
        </Container>
        {this.renderModal()}
      </div>
    );
  }
}

Posts.propTypes = {
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  {
    editPost,
    deletePost
  }
)(Posts);
