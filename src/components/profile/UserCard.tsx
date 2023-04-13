import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { User } from '@prisma/client'
import EventsList from '@/components/eventspage/EventsList';
import moment from 'moment'

type Props = {
  user: User
}

export default function UserCard({ user }: Props) {
  return (
    <div
      style={{ boxShadow: '0px 10px 16px 3px black' }}
      className="w-full h-full flex flex-col py-5 bg-ueventSecondary rounded-2xl gap-2 justify-center justify-items-center items-center"
    >
      <div className="text-ueventText flex flex-col w-full p-5 md:flex-row gap-5 justify-center items-start md:justify-between">
        <div className="flex flex-row gap-8 w-full">
          <Image
            src={user.image as string}
            className="rounded-full"
            width="120"
            height="120"
            alt="avatar"
          />
          <div className="flex flex-col w-full gap-2">
            <span className="text-2xl">{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
            <span className="text-xs text-gray-500">Registered {moment(user?.createdAt).fromNow()}</span>
          </div>
        </div>
        <button className="p-2 text-ueventContrast w-full md:w-1/4">Connect Chronos</button>
      </div>
      <span className="text-xl text-ueventText">Latest Events</span>
      {/* @ts-ignore */}
      <EventsList className='w-full' removeMenu={true} events={user?.tickets.map((ticket) => ticket.event)} />
    </div>
  )
}
