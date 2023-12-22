'use client'
import React from 'react'
import { useGetstaffQuery } from '@/redux/exportModule'
const DetailsNhanVien = ({ id, field }: any) => {
  const { data } = useGetstaffQuery(id, { skip: !id })
  return (
    <span>
      {data && field == 'ho' && data.ho}
      {data && field == 'ten' && data.ten}
    
    </span>
  )
}

export default DetailsNhanVien
