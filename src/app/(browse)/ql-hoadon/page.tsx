'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TableHoaDon from '@/components/HoaDon/TableHoaDon'

const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Hóa Đơn</h1>

      <div className='h-[30px]' />
      <TableHoaDon />
    </>
  )
}

export default Page
