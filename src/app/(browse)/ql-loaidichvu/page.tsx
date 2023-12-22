'use client'
import React from 'react'
import TableLoaiDichVu from '@/components/LoaiDichVu/TableLoaiDichVu'
const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Loại dịch vụ</h1>
      <div className='h-[30px]' />
      <TableLoaiDichVu />
    </>
  )
}

export default Page
