import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

import { savePost } from '../../actions/postsActions';
import ModalView from '../posts/ModalView';

class NavbarHeader extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      post: {
        userId: 0,
        id: 0,
        title: '',
        body: ''
      },
      modal: false
    };
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  saveChange = e => {
    e.preventDefault();

    this.props.savePost(this.props.posts.posts, this.state.post);

    this.setState({ post: { ...this.state.post, title: '', body: '' } });
    this.toggleModal();
  };

  onChangeText = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  };

  renderModal = () => {
    const { id, title, body } = this.state.post;
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
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand href='#home'>Posts-App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link onClick={this.toggleModal}>Formulario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {this.renderModal()}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  {
    savePost
  }
)(NavbarHeader);
