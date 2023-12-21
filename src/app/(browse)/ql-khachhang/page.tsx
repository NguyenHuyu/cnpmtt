'use client'
import React from 'react'
import TableKhachHang from '@/components/KhachHang/TableKhachHang'
const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Khách Hàng</h1>
      <div className='h-[30px]' />
      <TableKhachHang />
    </>
  )
}

export default Page
