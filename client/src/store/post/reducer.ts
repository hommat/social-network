import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED
} from "./constants";
import { PostsById } from "./models";
import * as actions from "./actions";

type PostAction = ActionType<typeof actions>;
type PostState = Readonly<{
  byId: PostsById;
  allIds: string[];
  status: {
    fetchingPosts: boolean;
    gettingPost: boolean;
    deletingPost: boolean;
    addingPost: boolean;
    updatingPost: boolean;
    canFetchMore: boolean;
  };
}>;

const initState: PostState = {
  byId: {},
  allIds: [],
  status: {
    fetchingPosts: false,
    gettingPost: false,
    deletingPost: false,
    addingPost: false,
    updatingPost: false,
    canFetchMore: true
  }
};

export default combineReducers<PostState, PostAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
      case DELETE_POST_SUCCESS:
      case ADD_POST_SUCCESS:
      case UPDATE_POST_SUCCESS:
        return action.payload.newById;
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
        return [...action.payload.ids];
      case DELETE_POST_SUCCESS:
        return [...state].filter(id => id !== action.payload.id);
      case ADD_POST_SUCCESS:
        return [action.payload.id, ...state];
      case UPDATE_POST_SUCCESS:
      default:
        return state;
    }
  },
  status: (state = initState.status, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return { ...state, fetchingPosts: true };
      case FETCH_POSTS_SUCCESS:
        return {
          ...state,
          fetchingPosts: false,
          canFetchMore: action.payload.canFetchMore
        };
      case FETCH_POSTS_FAILED:
        return { ...state, fetchingPosts: false };
      case DELETE_POST:
        return { ...state, deletingPost: true };
      case DELETE_POST_SUCCESS:
      case DELETE_POST_FAILED:
        return { ...state, deletingPost: false };
      case ADD_POST:
        return { ...state, addingPost: true };
      case ADD_POST_SUCCESS:
      case ADD_POST_FAILED:
        return { ...state, addingPost: false };
      case UPDATE_POST:
        return { ...state, updatingPost: true };
      case UPDATE_POST_SUCCESS:
      case UPDATE_POST_FAILED:
        return { ...state, updatingPost: false };
      default:
        return state;
    }
  }
});
