import { UserPost } from "../types"

const API_URL = 'https://jsonplaceholder.typicode.com'

async function getPostList() {
    const response = await fetch(`${API_URL}/posts`)
    return await response.json()
}


function deletePost(id: number) { 
    return id
    // const response = await fetch(`${API_URL}/posts`, { method: 'DELETE'})
    // return await response.json()
}


async function getPostById (id: number, postList: UserPost[]) {
    if(postList.length === 0) {
        const currentPostList: UserPost[] = await getPostList()
        const postToEdit = currentPostList.find((post: UserPost) => post.id === id)
        return postToEdit
    }
    const postToEdit = postList.find(post => post.id === id)
    return postToEdit
}


async function updatePostById(postUpdated: UserPost) { 
    const response = await fetch(`${API_URL}/edit`, { method: 'UPDATE', body: JSON.stringify(postUpdated) })
    return await response.json()
}

export { getPostList, deletePost, getPostById, updatePostById }
