'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TableTylesudung from '@/components/BaoCao/TableTylesudung'

const Page = () => {
  return (
    <>
      <h1 className='pt-[20px] text-center  '>
        Quản Lý Tỷ Lệ Sử Dụng Phòng
      </h1>

      <div className='h-[30px]' />
      <TableTylesudung />
    </>
  )
}

export default Page
