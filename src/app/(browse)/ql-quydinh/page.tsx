'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TablePhuThu from '@/components/Phong/TablePhuThu'

const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Quy Định Phụ Thu</h1>

      <div className='h-[30px]' />
      <TablePhuThu />
    </>
  )
}

export default Page
