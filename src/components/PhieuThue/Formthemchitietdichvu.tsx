'use client'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useGetServicesQuery,
  useAddServiceDetailMutation,
  useUpdateServiceDetailMutation,
  useGetServiceDetailQuery
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
import { useSession } from 'next-auth/react'

interface IFormInput {
  id?: number
  madichvu: number
  maphieuthue: number
  soluong: number
}

const Formthemchitietdichvu = ({ infoRoomRentals, idChitietdichvu }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const { data: dataServiceDetail } = useGetServiceDetailQuery(idChitietdichvu, {
    skip: !idChitietdichvu
  })
  const { data: dataServices, isFetching: isFetchingdataServices } =
    useGetServicesQuery({ dataQuery: '' })
  const [AddServiceDetail]: any = useAddServiceDetailMutation()
  const [UpdateServiceDetail]: any = useUpdateServiceDetailMutation()

  useEffect(() => {
    if (dataServiceDetail) {
      Object.entries(dataServiceDetail as any).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataServiceDetail, setValue])
  const onSubmit = async (data: IFormInput) => {
    const { id, ...formData } = data
    formData.maphieuthue = Number(infoRoomRentals.id)
    formData.madichvu = Number(formData.madichvu)
    formData.soluong = Number(formData.soluong)
    if (id) {
      await UpdateServiceDetail({
        body: formData,
        id
      })
        .unwrap()
        .then(() => {
          showSuccessNotification('Sửa thành công!')
        })
        .catch((error: any) => {
          showErrorNotification(error.data?.message)
        })
    } else {
      await AddServiceDetail(formData)
        .unwrap()
        .then(() => {
          showSuccessNotification('Thêm thành công')
          reset()
        })
        .catch((error: any) => {
          showErrorNotification(error.data?.message)
        })
    }
  }
  return (
    <form
      className='max-w-[500px] mx-auto flex gap-[50px] items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='mb-5'>
        <label
          htmlFor='tenloaiphong'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Tên dịch vụ
        </label>
        {dataServices && (
          <select
            {...register('madichvu')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            defaultValue={dataServices[0].id}
          >
            {dataServices.map((data: any) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.madichvu}
                </option>
              )
            })}
          </select>
        )}
      </div>
      <div className='mb-5'>
        <label
          htmlFor='dientich'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Số lượng
        </label>
        <input
          type='number'
          id='dientich'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('soluong', { required: true })}
        />
      </div>
      <button
        type='submit'
        className='text-white h-[50px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Thêm
      </button>
    </form>
  )
}

export default Formthemchitietdichvu
