import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectNotifications, clearNotifications } from '../../store/postSlice'
import { MdErrorOutline } from 'react-icons/md'
import { FaRegCheckCircle } from 'react-icons/fa'

import './Notifications.css'

const TIME_TO_REMOVE_NOTIFICATION = 3000

const Notifications = () => {
    const notifications = useSelector(selectNotifications)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notifications.length === 0) {
            return
        }
        setTimeout(() => {
            dispatch(clearNotifications())
        }, TIME_TO_REMOVE_NOTIFICATION)
    }, [notifications])

    return (
        <div className="notifications-container">
            {notifications.map(
                (notification: { message: string; type: string }, index) => {
                    return (
                        <div
                            key={index}
                            className={`notification ${notification.type}`}
                        >
                            <span>{notification.message}</span>
                            <div>
                                {notification.type === 'error' && (
                                    <MdErrorOutline />
                                )}
                                {notification.type === 'success' && (
                                    <FaRegCheckCircle />
                                )}
                            </div>
                        </div>
                    )
                },
            )}
        </div>
    )
}

export default Notifications
