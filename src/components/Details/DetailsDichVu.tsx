'use client'
import React from 'react'
import { useGetServiceQuery } from '@/redux/exportModule'
const DetailsDichVu = ({ id, field }: any) => {
  const { data } = useGetServiceQuery(id, { skip: !id })
  return <span>{data && field == 'tendichvu' && data.madichvu}
  {data && field == 'gia' && data.gia}
  </span>
}

export default DetailsDichVu
