'use client'
import React from 'react'
import { useGetServiceTypeQuery } from '@/redux/exportModule'
const DetailsLoaiDichVu = ({ id, field }: any) => {
  const { data } = useGetServiceTypeQuery(id, { skip: !id })
  return <span>{data && field == 'tenloaidichvu' && data.tenloaidichvu}</span>
}

export default DetailsLoaiDichVu
