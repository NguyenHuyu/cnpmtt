'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TablePhong from '@/components/Phong/TablePhong'

const Page = () => {

  return (
    <>
      <h1 className='pt-[20px] text-center  '>Quản Lý Phòng</h1>

      <div className='h-[30px]' />
      <TablePhong />
    </>
  )
}

export default Page
