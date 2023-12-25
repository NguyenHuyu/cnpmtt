'use client'
import React from 'react'
import { useGetServiceDetailQuery } from '@/redux/exportModule'
const DetailChiTietDichVu = ({ id, field }: any) => {
  const { data } = useGetServiceDetailQuery(id, { skip: !id })
  return <span>{data && field == 'soluong' && data.soluong}
  {data && field == 'gia' && data.gia}
  </span>
}

export default DetailChiTietDichVu
