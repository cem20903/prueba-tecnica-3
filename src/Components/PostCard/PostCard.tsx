import React from 'react'

import './postCard.css'

import { deletePostbyId } from '../../store/postSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { UserPost } from '../../types'
import { useNavigate } from 'react-router-dom'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import ClButton from '../ClButton/ClButton'

type PostCardProps = {
    post: UserPost
}

function PostCard({ post: { id, title, userId, body } }: PostCardProps) {
    const dispatch = useDispatch<AppDispatch>()
    const history = useNavigate()

    function goToEdit(id: number) {
        history(`/edit/${id}`)
    }

    return (
        <div className="post">
            <div>
                <h2>Post del usuario {userId}</h2>
                <p>
                    <strong>Titulo:</strong> <span>{title}</span>
                </p>
                <p>
                    <strong>Body:</strong> <span>{body}</span>
                </p>
            </div>
            <div className="post__actions">
                <ClButton type="button" onClick={() => goToEdit(id)}>
                    <MdEdit className="post__button-icon" />
                    <span>Editar</span>
                </ClButton>
                <ClButton
                    type="button"
                    onClick={() => dispatch(deletePostbyId(id))}
                >
                    <MdDeleteForever className="post__button-icon" />
                    <span>Borrar</span>
                </ClButton>
            </div>
        </div>
    )
}

export default PostCard
