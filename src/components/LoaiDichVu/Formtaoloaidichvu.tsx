'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useAddServiceTypeMutation,
  useGetServiceTypeQuery,
  useUpdateServiceTypeMutation
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
interface IFormInput {
  id?: number
  tenloaidichvu: string
}
const Formtaoloaidichvu = ({ id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [addServiceType] = useAddServiceTypeMutation()
  const [updateServiceType] = useUpdateServiceTypeMutation()
  const { data: dataServiceType } = useGetServiceTypeQuery(id, { skip: !id })
  console.log('dataTypeRoom', dataServiceType)

  useEffect(() => {
    if (dataServiceType) {
      Object.entries(dataServiceType as any).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataServiceType, setValue])

  const onSubmit = async (data: any) => {
    const { id, ...formData } = data
    console.log(id)
    if (id) {
      await updateServiceType({
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
      await addServiceType(formData)
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
          Tên loại dịch vụ
        </label>
        <input
          type='tenloaiphong'
          id='tenloaiphong'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('tenloaidichvu', { required: true })}
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

export default Formtaoloaidichvu
