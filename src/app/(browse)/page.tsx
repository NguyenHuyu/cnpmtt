'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import DanhSachPhong from '@/components/TrangChu/DanhSachPhong'
const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  return (
    <>
      <h1 className='text-center pt-[20px] '>Trang chủ</h1>
      <div className='h-[30px]'></div>
      <h1>Danh sách phòng</h1>
      <DanhSachPhong />
    </>
  )
}

export default page
