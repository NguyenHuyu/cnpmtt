'use client'
import React from 'react'
import { useGetCustomerQuery } from '@/redux/exportModule'
const DetailsKhachHang = ({ id, field }: any) => {
  const { data } = useGetCustomerQuery(id, { skip: !id })
  return (
    <span>
      {data && field == 'tenkhachhang' && data.tenkhachhang}
      {data && field == 'cmnd' && data.cmnd}
      {data && field == 'sdt' && data.sdt}
    </span>
  )
}

export default DetailsKhachHang
