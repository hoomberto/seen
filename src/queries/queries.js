import {
    gql
  } from "@apollo/client";


//Probably not going to work, first attempt at queries
export const GET_USER_INFO = (id) => gql`
query GetUserInfo {
  user(id: ${id}) {
    id
    userName
    firstName
    lastName
    email
    phoneNumber
    birthday
    posts{
      id
      content
      createdAt
    }
    followers{
      friendId
    }
  }
}
`;

export const GET_USER_FLUX_FOLLOWING = (id) => gql`
query userFluxFollowing {
  userFluxFollowing(id: ${id}){
  	id
    userName
    firstName
    lastName
	}
}
`

export const GET_USER_FLUX_FOLLOWERS = (id) => gql`
query usersFluxFollowers {
  usersFluxFollowers(id: ${id}){
    id
    userName
    firstName
    lastName
	}
}
`

export const GET_USER_NAME = gql`
query GetUserName($id: ID!) {
  user(id: $id) {
    userName
    firstName
    lastName
  }
}
`;

// Get Followers
export const GET_FOLLOWER_INFO = (id) => gql`
query GetFollowerInfo {
  usersFollowers(id: ${id}) {
    id
    userName
    firstName
    lastName
	}
}
`;

// Get Following
export const GET_FOLLOWING_INFO = (id) => gql`
query GetFollowingInfo {
  userFollowing(id: ${id}) {
    id
    userName
    firstName
    lastName
	}
}
`;


export const GET_USER_POSTS = (id) => gql`
query GET_USER_POSTS {
  user(id:${id}) {
    posts {
      id
      content
      createdAt
    }
  }
}
`;

export const GET_POST_LIKES = (id) =>  gql`
query postLikes {
  postLikes(id: ${id}){
    id
    userName
    firstName
    lastName
  }
}
`

export const GET_LIKED_POSTS = (id) => gql`
query usersLikedPosts {
 usersLikedPosts(id: ${id}){
   id
 }
}
`


export const GET_TOP_FLUX = gql`
query GetTopFlux {
  topFlux {
    userId
    user {
      firstName
      lastName
    }
    count
  }
}
`;

export const GET_POSTS_FROM_FOLLOWING = (id) => gql`
  query GetPostsFromFollowing {
   getPostFromFixedFollowing(id: ${id}){
    userId
    user {
      firstName
      lastName
      userName
    }
    id
    content
    createdAt
    likeCount
   }
   getPostFromFluxFollowing(id: ${id}){
     userId
     user {
       firstName
       lastName
       userName
     }
     id
     content
     createdAt
     likeCount
   }
  }
`

//TESTed this query it works!
export const GET_ALL_USERS = gql`
query GetAllUsers {
  users {
    id
    userName
    firstName
    lastName
  }
}
`
//Tested this query it also works!
export const GET_ALL_USER_INFO = gql`
query {
	users {
    id
    userName
    firstName
    lastName
    email
    phoneNumber
    birthday
    posts{
      content
			}
  }
}
`

// Start mutation queries here
export const CREATE_NEW_USER = gql`
mutation createUser($userName: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $birthday: String!) {
  createUser(input: {
    userName: $userName,
    firstName: $firstName,
    lastName: $lastName,
    phoneNumber: $phoneNumber,
    email: $email,
    birthday: $birthday
  }) {
    user {
      id
    }
  }
}
`

export const UPDATE_USER = gql`
mutation updateUser($userId: ID!, $userName: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $birthday: String!) {
  updateUser(input: {
    userId: $userId,
    userName: $userName,
    firstName: $firstName,
    lastName: $lastName,
    phoneNumber: $phoneNumber,
    email: $email,
    birthday: $birthday
  }) {
    user {
      id
      userName
      firstName
      lastName
      phoneNumber
      email
      birthday
	}
 }
}
`

export const CREATE_FOLLOWER = gql`
mutation createFollower($userId: ID!, $friendId: ID!){
  createFollower(input: {
    userId: $userId
    friendId: $friendId
  }) {
    followerInfo {
      id
      userName
      firstName
      lastName
      email
      phoneNumber
      birthday
    }
    userInfo {
      id
      userName
      firstName
      lastName
      email
      phoneNumber
      birthday
		}
    errors
    followerId
  }
}
`

export const DELETE_FOLLOWER = gql`
mutation deleteFollower($userId: ID!, $followerId: ID!){
  deleteFollower(input: {
    userId: $userId,
    followerId: $followerId
  }) {
    message
  }
}
`

export const CREATE_POST = gql`
mutation createPost($content: String!, $userId: ID!){
  createPost(input: {
    content: $content
    userId: $userId
  }) {
    post {
      content
      id
    }
    user {
      posts {
        content
      }
		}
  }
}
`

export const DELETE_POST = gql`
mutation deletePost($postId: ID!){
  deletePost(input: {postId: $postId}) {
    message
    user {
      id
      userName
      firstName
      lastName
      email
      phoneNumber
      birthday
		}
  }
}
`




export const CREATE_LIKE = gql`
mutation createLike($userId: ID!, $postId: ID!){
  createLike(input: {
    userId: $userId
    postId: $postId
  }) {
    like {
      id
    }
    user {
      id
    }
    post {
      id
      content
    }
  }
}
`


export const DELETE_LIKE = gql`
mutation deleteLike($userId: ID!, $postId: ID!){
  deleteLike(input: {userId: $userId, postId: $postId}) {
    message
  }
}
`
