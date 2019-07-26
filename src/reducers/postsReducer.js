import {
  GET_POSTS,
  SAVE_POST,
  EDIT_POST,
  GET_ERRORS_POSTS,
  DELETE_POST,
  POSTS_LOADING
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false,
  alert: {
    title: '',
    color: '',
    message: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SAVE_POST: {
      return {
        ...state,
        posts: action.payload,
        alert: {
          title: 'Agregado',
          color: 'success',
          message: 'Post creado'
        }
      };
    }
    case EDIT_POST:
      return {
        ...state,
        posts: action.payload,
        alert: {
          title: 'Actualizado',
          color: 'info',
          message: 'Post actualizado'
        }
      };
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload,
        alert: {
          title: 'Eliminado',
          color: 'warning',
          message: 'Post eliminado'
        }
      };
    case GET_ERRORS_POSTS:
      return {
        ...state,
        alert: {
          title: 'Ups algo paso..',
          color: 'danger',
          message: action.payload
        },
        loading: false
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
