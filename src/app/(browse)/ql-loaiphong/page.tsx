'use client'
import React from 'react'
import { useGettypeRoomsQuery } from '@/redux/createApi/typeRoom'
const Page = () => {
  const { data } = useGettypeRoomsQuery({ dataQuery: '' })
  console.log('data', data)
  return <div>ql loai phong</div>
}

export default Page
