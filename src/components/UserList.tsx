// components/UserList.tsx
'use client'
import UserCard from './UserCard'
import { useEffect, useState } from 'react'
import { getUsers } from '@/actions/getUsers'
import { useInView } from 'react-intersection-observer'

type UserListProps = {
  initialUsers: User[]
}

const NUMBER_OF_USERS_TO_FETCH = 10

export default function UserList({ initialUsers }: UserListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const { ref, inView } = useInView()

  const loadMoreUsers = async () => {
    const apiUsers = await getUsers(offset, NUMBER_OF_USERS_TO_FETCH)
    setUsers(users => [...users, ...apiUsers])
    setOffset(offset => offset + NUMBER_OF_USERS_TO_FETCH)
  }

  useEffect(() => {
    if (inView) {
      loadMoreUsers()
    }
  }, [inView, loadMoreUsers])

  return (
    <div className='flex flex-col gap-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <div ref={ref}>
        Loading...
      </div>
      {/* <button onClick={loadMoreUsers}>Load more</button> */}
    </div>
  )
}
