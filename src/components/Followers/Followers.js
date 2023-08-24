import { useQuery } from "@apollo/client";
import React, { useState, useContext } from 'react'
import FollowerDetails from './FollowerDetails/FollowerDetails'
import FollowersModal from './FollowersModal/FollowersModal.js'
import Countdown from './Countdown/Countdown.js'
import './Followers.css'
import * as gql from '../../queries/queries'
import UserContext from "../UserProfile/UserContext";

const Followers = () => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWING_INFO(value))
  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(value))
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(value))
  const { data } = useQuery(gql.GET_FOLLOWER_INFO(value))

  const [clicked, setClicked] = useState(false);
  const [users, setCurrentUsers] = useState([]);

  const toggleModal = (usersData) => {
    setClicked(clicked => !clicked)
    setCurrentUsers(usersData)
  }

  const renderFollowers = () => {
    if (data) {
      return (
        <div className='follow-container'>{
          data.usersFollowers.map((follower, index) => {
            return <div key={index}>
              <FollowerDetails id={follower.id} />
            </div>
          })  
        }</div>
      )
    }
  }

  const renderFollowing = () => {
    return ( 
    <div className='follow-container'>{  
    GetFollowingInfo.data.userFollowing.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.id} />
      </div>
    })
    }
    </div>
    )
  }

  const renderFluxFollowers = () => {
    if (GetFluxFollowers.data) {
      return (
        <div className='follow-container'>{
          GetFluxFollowers.data.usersFluxFollowers.map((follower, index) => {
            return <div key={index}>
              <FollowerDetails id={follower.id} />
            </div>
          })  
        }</div>
      )
    }
  }

  const renderFluxFollowing = () => {
    return (
      <div className='follow-container'>
        {GetFluxFollowing.data.userFluxFollowing.map((follower, index) => {
          return <div key={index}>
            <FollowerDetails id={follower.id} />
          </div>
        })}
      </div>
    )
  }

  return (
    <section className="followers-containers">
      <div className='metrics-container'>
        <h2>Fixed</h2>
        <div className='fixed-container'>
          <div>
            <h3>Followers</h3>
            <div className='list-container'>{!!data && renderFollowers()}</div>
          </div>
          <div>
            <h3>Following</h3>
            <div className='list-container'>{!!GetFollowingInfo.data && renderFollowing()}</div>
          </div>
        </div>
        <div>
          <h2>Flux</h2>
          <div className='flux-container'>
            <div>
              <h3>Followers</h3>
              <div className='list-container'>{!!GetFluxFollowers.data && renderFluxFollowers()}</div>
            </div>
            <div>
              <h3>Following</h3>
              <div className='list-container'>{!!GetFluxFollowing.data && renderFluxFollowing()}</div>
            </div>
          </div>
        </div>
      </div>
      <Countdown />
    </section>
  )
}

export default Followers
