'use client'
import { User } from 'next-auth';
import { FC, useEffect, useState } from 'react';
import UserItem from 'useritem';
export interface UserProfileProps {
  user: User
}
const UserProfile: FC<UserProfileProps> = (props) => {

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const { user } = props
  const {name, email, image} = user as any
  return <UserItem
       title={name}
       description={email}
       avatarUrl={image}
       width={ width} 
       onClick={(e:any) => console.log("User item clicked!", e)}
     />
}

export default UserProfile;