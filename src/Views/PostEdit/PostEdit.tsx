import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { fetchPostById, updatePost } from '../../store/postSlice'
import { useDispatch } from 'react-redux'

import './PostEdit.css'
import { UserPost } from '../../types'
import { FaSave } from 'react-icons/fa'
import ClButton from '../../components/ClButton/ClButton'
import ClInput from '../../components/ClInput/ClInput'

function PostEdit() {
    const { id } = useParams()

    const dispatch = useDispatch<AppDispatch>()

    const [initialUserId, setInitialUserId] = useState<number>(0)

    const [formData, setFormData] = useState<{
        title: string
        body: string
        userId: number
    }>({
        title: '',
        body: '',
        userId: 0,
    })

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(parseFloat(id)))
                .unwrap()
                .then((post: UserPost) => {
                    setInitialUserId(post.userId)
                    setFormData({
                        title: post.title,
                        body: post.body,
                        userId: post.userId,
                    })
                })
        }
    }, [])

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (!id) {
            return
        }

        const { title, body } = formData
        dispatch(
            updatePost({
                title,
                body,
                userId: initialUserId,
                id: parseFloat(id),
            }),
        )
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    return (
        <div className="edit">
            <h1>Editar Post</h1>
            <form onSubmit={handleSubmit} className="form-edit">
                <ClInput
                    name="title"
                    label="Titulo:"
                    value={formData.title}
                    onChange={handleChange}
                />
                <ClInput
                    name="body"
                    label="Body:"
                    value={formData.body}
                    onChange={handleChange}
                />

                <ClInput
                    name="userId"
                    label="User ID:"
                    value={formData.userId}
                    onChange={handleChange}
                    disabled
                />

                <ClButton type="submit">
                    <FaSave />
                    <span>Guardar</span>
                </ClButton>
            </form>
        </div>
    )
}

export default PostEdit
