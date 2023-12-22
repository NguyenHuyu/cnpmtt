'use client'
import React from 'react'
import { useGetRoomQuery } from '@/redux/exportModule'
const DetailsPhong = ({ id, field }: any) => {
  const { data } = useGetRoomQuery(id, { skip: !id })
  return (
    <span>
      {data && field == 'tenphong' && data.tenphong}
      {data && field == 'songuoi' && data.songuoi}
      {data && field == 'trangthai' && data.trangthai}
    </span>
  )
}

export default DetailsPhong
