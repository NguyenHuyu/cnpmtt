'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TableBaoCao from '@/components/BaoCao/TableBaoCao'

const Page = () => {
  return (
    <>
      <h1 className='pt-[20px] text-center  '>
        Quản Lý Doanh Thu Theo Loại Phòng
      </h1>

      <div className='h-[30px]' />
      <TableBaoCao />
    </>
  )
}

export default Page
