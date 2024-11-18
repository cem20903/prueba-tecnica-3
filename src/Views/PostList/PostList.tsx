import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchPosts, selectIsLoading } from '../../store/postSlice'
import { AppDispatch } from '../../store'
import PostCard from '../../components/PostCard/PostCard'

import { useSelector } from 'react-redux'
import { selectPostList } from '../../store/postSlice'

import './PostList.css'
import { UserPost } from '../../types'
import Loader from '../../components/Loader/Loader'

function PostList() {
    const postsList = useSelector(selectPostList)
    const isLoading = useSelector(selectIsLoading)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="postList">
            {postsList.map((post: UserPost, index) => {
                return <PostCard key={index} post={post} />
            })}
        </div>
    )
}

export default PostList
