'use client'
import React from 'react'
import { useGetRoomQuery } from '@/redux/exportModule'
import DetailsLoaiPhong from './DetailsLoaiPhong'
const DetailsPhong = ({ id, field }: any) => {
  const { data } = useGetRoomQuery(id, { skip: !id })
  return (
    <span>
      {data && field == 'tenphong' && data.tenphong}
      {data && field == 'songuoi' && data.songuoi}
      {data && field == 'trangthai' && data.trangthai}
      {data && field == 'gia' && (
        <DetailsLoaiPhong id={data.maloaiphong} field='gia' />
      )}
    </span>
  )
}

export default DetailsPhong
