'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TablePhong from '@/components/Phong/TablePhong'
import { useGetClassroomsQuery } from '@/redux/createApi/classroomApi'
const Page = () => {
  const { data } = useGetClassroomsQuery({ dataQuery: '' })
  console.log('data', data)
  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Phòng</h1>

      <div className='h-[30px]' />
      <TablePhong />
    </>
  )
}

export default Page
