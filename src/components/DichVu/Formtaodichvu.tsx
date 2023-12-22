'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useAddServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useGetServiceTypesQuery
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'


interface IFormInput {
  id?: number
  madichvu: string
  maloaidichvu: number
  trangthai: string
  gia: string
}
const Formtaodichvu = ({ id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [addService] = useAddServiceMutation()
  const [updateService] = useUpdateServiceMutation()
  const { data: dataService } = useGetServiceQuery(id, { skip: !id })
  const { data: dataServiceTypes } = useGetServiceTypesQuery({ dataQuery: '' })
  console.log('dataService', dataService)

  useEffect(() => {
    if (dataService) {
      Object.entries(dataService as any).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataService, setValue])

  const onSubmit = async (data: any) => {
    const { id, ...formData } = data
    formData.maloaidichvu = Number(data.maloaidichvu)
    console.log(id)
    if (id) {
      await updateService({
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
      await addService(formData)
        .unwrap()
        .then(() => {
          showSuccessNotification('Thêm thành công')
          reset()
        })
        .catch((error: any) => {
          showErrorNotification(error.data?.message)
        })
      //}
    }
  }

  return (
    <form className='max-w-sm mx-auto' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-5'>
        <label
          htmlFor='tenloaiphong'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Tên dịch vụ
        </label>
        <input
          type='tenloaiphong'
          id='tenloaiphong'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('madichvu', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='dientich'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Loại dịch vụ
        </label>
        {dataServiceTypes && (
          <select
            {...register('maloaidichvu')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {dataServiceTypes.map((data: any) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.tenloaidichvu}
                </option>
              )
            })}
          </select>
        )}
      </div>
      <div className='mb-5'>
        <label
          htmlFor='gia'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Trạng thái
        </label>
        <select
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('trangthai', { required: true })}
        >
          <option value={'Hoàn thành'}>Hoàn thành</option>
          <option value={'Đã hủy'}>Đã Hủy</option>
        </select>
      </div>
      <div className='mb-5'>
        <label
          htmlFor='gia'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Giá
        </label>
        <input
          type='gia'
          id='gia'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('gia', { required: true })}
        />
      </div>

      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        {!id ? 'Tạo' : 'Sửa'}
      </button>
    </form>
  )
}

export default Formtaodichvu
