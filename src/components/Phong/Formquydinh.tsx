'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useAddRegulationMutation,
  useUpdateRegulationMutation,
  useGetRegulationQuery
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
interface IFormInput {
  id?: number
  phantramphuthu: string
  dahuy: any
}
const Formquydinh = ({ id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [addRegulation] = useAddRegulationMutation()
  const [updateRegulation] = useUpdateRegulationMutation()
  const { data: dataquydinh } = useGetRegulationQuery(id, { skip: !id })
  useEffect(() => {
    if (dataquydinh) {
      Object.entries(dataquydinh as any).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataquydinh, setValue])

  const onSubmit = async (data: IFormInput) => {
    const { id, ...formData } = data
    formData.dahuy = formData.dahuy == 'false' ? false : true
    console.log('data', formData)
    if (id) {
      await updateRegulation({
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
      await addRegulation(formData)
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
          Phan tram phu thu
        </label>
        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('phantramphuthu', { required: true })}
        />
      </div>
      <div className={id ? 'mb-5 block' : 'mb-5 hidden'}>
        <label
          htmlFor='tenloaiphong'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Trang Thai
        </label>
        <select
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('dahuy', { required: true })}
          defaultValue={'false'}
        >
          <option value={'false'}>Sử dụng</option>
          <option value={'true'}>Hủy</option>
        </select>
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

export default Formquydinh
