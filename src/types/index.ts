type UserPost = {
  id: number
  title: string
  userId: number
  body: string
}

type NotificationType =  'success' | 'error'


type Notification = {
  message: string,
  type: NotificationType
}
export { UserPost, Notification, NotificationType }
