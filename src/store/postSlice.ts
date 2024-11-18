import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPostList, deletePost, getPostById, updatePostById } from '../services/Posts'
import { UserPost, Notification, NotificationType } from '../types'

import { RootState } from './index'


type initialState = { postList: UserPost[]; notifications: Notification[], isLoading: boolean }

const initialState: initialState = {
  postList: [],
  notifications: [],
  isLoading: true
};


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await getPostList();
    return response;
  }
);

export const deletePostbyId = createAsyncThunk(
  'posts/deletePostById',
  async (id: number) => {
    const response = deletePost(id);
    return response;
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: number, { getState }) => {
    const store = getState() as RootState
    const response = getPostById(id, store.post.postList);
    return response;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postUpdated: UserPost) => {
    const response = updatePostById(postUpdated);
    return response;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = []
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postList = action.payload
        state.isLoading = false
      })
      .addCase(deletePostbyId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePostbyId.fulfilled, (state, action) => {
        const copyOfPostList = [...state.postList]
        const postListWithoutPostDeleted = copyOfPostList.filter(
            (post: { id: number }) => post.id !== action.payload,
        )
        state.postList = postListWithoutPostDeleted
        state.isLoading = false
        
        const message = {
          message: 'Post borrado con exito',
          type: 'success' as NotificationType
        }
        
        state.notifications.push(message)
      })
      .addCase(updatePost.rejected, (state) => {
        const message = {
          message: 'Error al editar el Post, intentelo de nuevo',
          type: 'error' as NotificationType
        }
        
        state.notifications.push(message)
      })

  },
});


export const { clearNotifications, addNotification } = postSlice.actions;



export const selectPostList = (state: RootState) => state.post.postList;
export const selectNotifications = (state: RootState) => state.post.notifications;
export const selectIsLoading = (state: RootState) => state.post.isLoading;

export default postSlice.reducer;
