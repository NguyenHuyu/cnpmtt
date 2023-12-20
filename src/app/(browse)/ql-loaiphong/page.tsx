'use client'
import React from 'react'
import TableLoaiPhong from '@/components/LoaiPhong/TableLoaiPhong'
const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Loại Phòng</h1>
      <div className='h-[30px]' />
      <TableLoaiPhong />
    </>
  )
}

export default Page
