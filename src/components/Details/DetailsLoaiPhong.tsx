'use client'
import React from 'react'
import { useGettypeRoomQuery } from '@/redux/exportModule'
const DetailsLoaiPhong = ({ id, field }: any) => {
  const { data } = useGettypeRoomQuery(id, { skip: !id })
  return (
    <span>
      {data && field == 'tenloaiphong' && data.tenloaiphong}
      {data && field == 'dientich' && data.dientich}
      {data && field == 'gia' && data.gia}
    </span>
  )
}

export default DetailsLoaiPhong
