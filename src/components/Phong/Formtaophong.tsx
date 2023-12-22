'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useAddRoomMutation,
  useGetRoomQuery,
  useUpdateRoomMutation,
  useGettypeRoomsQuery
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
interface IFormInput {
  id?: number
  tenphong: string
  maloaiphong: number
  songuoi: string
  trangthai: string
}
const Formtaoloaiphong = ({ id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [addRoom] = useAddRoomMutation()
  const [updateRoom] = useUpdateRoomMutation()
  const { data: dataRoom } = useGetRoomQuery(id, { skip: !id })
  const { data: dataTypeRooms } = useGettypeRoomsQuery({ dataQuery: '' })
  useEffect(() => {
    if (dataRoom) {
      Object.entries(dataRoom as any).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataRoom, setValue])

  const onSubmit = async (data: IFormInput) => {
    const { id, ...formData } = data
    formData.maloaiphong = Number(data.maloaiphong)
    console.log('data', formData)
    if (id) {
      await updateRoom({
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
      await addRoom(formData)
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
          Tên phòng
        </label>
        <input
          type='tenloaiphong'
          id='tenloaiphong'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('tenphong', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='dientich'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Loại phòng
        </label>
        {dataTypeRooms && (
          <select
            {...register('maloaiphong')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {dataTypeRooms.map((data: any) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.tenloaiphong}
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
          Số người
        </label>
        <input
          type='gia'
          id='gia'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('songuoi', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='gia'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Trạng thái
        </label>
        <select
          {...register('trangthai')}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value={'Hoàn thành'}>Hoàn thành</option>
          <option value={'Đang sửa chữa'}>Đang sửa chữa</option>
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

export default Formtaoloaiphong
