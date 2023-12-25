'use client'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useAddRoomRentalMutation,
  useGetRoomRentalQuery,
  useUpdateRoomRentalMutation,
  useGettypeRoomsQuery,
  useGetstaffQuery,
  useGetRoomsQuery,
  useGetRoomRentalsQuery,
  useGetCustomersQuery
} from '@/redux/exportModule'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
import { useSession } from 'next-auth/react'

interface IFormInput {
  id?: number
  ghichu: string
  makhachhang: number
  maphong: number
  manhanvien: number
  ngaybatdauo: Date
  ngaytraphong: any
  songuoi: string
  trangthai: string
}
import DetailsPhong from '../Details/DetailsPhong'
const Formtaophieuthue = ({ id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [addRoomRental] = useAddRoomRentalMutation()
  const [updateRoomRental] = useUpdateRoomRentalMutation()
  const [dataPhongChuaThue, setDataPhongChuaThue]: any = useState(undefined)
  const { data: session, status }: any = useSession()
  const { data: dataRoomRental } = useGetRoomRentalQuery(id, { skip: !id })
  const { data: dataTypeRooms } = useGettypeRoomsQuery({ dataQuery: '' })
  const { data: dataRooms } = useGetRoomsQuery({ dataQuery: '' })
  const { data: dataRoomRentals } = useGetRoomRentalsQuery({ dataQuery: '' })
  const { data: dataCustomers } = useGetCustomersQuery({ dataQuery: '' })
  const { data: dataStaff } = useGetstaffQuery(
    session?.token?.username && session?.token?.username,
    { skip: !session?.token?.username }
  )

  useEffect(() => {
    if (dataRoomRental) {
      Object.entries(dataRoomRental as any).forEach(([key, value]) => {
        if (key == 'ngaybatdauo') {
          const time = new Date(value as any)
          const dateTimeLocalString = time.toISOString().slice(0, 16)
          setValue(key as any, dateTimeLocalString)
        } else {
          setValue(key as any, value)
        }
      })
    }
  }, [dataRoomRental, setValue])

  // loc ra phong chưa thuê
  useEffect(() => {
    if (dataRooms && dataRoomRentals) {
      // ds phong dang thue
      const filterdataRoomRentals = dataRoomRentals.filter(
        (item: any) => item.trangthai == 'Đang thuê'
      )
      // loc ra ds phong dang trống
      if (filterdataRoomRentals.length == 0) {
        setDataPhongChuaThue(dataRooms)
      } else {
        const filterdata = dataRooms.filter((item1: any) => {
          return !filterdataRoomRentals.find((item2: any) => {
            return item2.maphong == item1.id
          })
        })
        setDataPhongChuaThue(filterdata)
      }
    }
  }, [dataRooms, dataRoomRentals])

  const onSubmit = async (data: IFormInput) => {
    const { id, ...formData } = data
    formData.manhanvien = Number(dataStaff.id)
    // formData.ngaytraphong = ''
    formData.makhachhang = Number(data.makhachhang)
    formData.maphong = Number(data.maphong)
    const ngaybatdauo: Date = new Date(formData.ngaybatdauo)
    formData.ngaybatdauo = ngaybatdauo
    formData.trangthai = 'Đang thuê'
    if (id) {
      await updateRoomRental({
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
      await addRoomRental(formData)
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
    <form className='max-w-[1000px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
      {dataStaff && (
        <div className='mb-5'>
          <label
            htmlFor='gia'
            className='block mb-2 text-[15px] font-medium text-gray-900 dark:text-white'
          >
            Nhân viên lập phiếu: {dataStaff.ho} {dataStaff.ten}
          </label>
        </div>
      )}
      <div className='flex gap-[50px]'>
        <section id='1'>
          {/* nhan vien lap phieu
           */}
          <div className='mb-5'>
            <label
              htmlFor='tenloaiphong'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {!dataRoomRental ? 'Phòng còn trống' : 'Phòng'}
            </label>
            {dataPhongChuaThue && !dataRoomRental && (
              <select
                {...register('maphong')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue={dataPhongChuaThue[0].id}
              >
                {dataPhongChuaThue.map((data: any) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.tenphong}
                    </option>
                  )
                })}
              </select>
            )}
            {dataRoomRental && (
              <select
                {...register('maphong')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue={dataRoomRental.maphong}
              >
                <option value={dataRoomRental.maphong}>
                  <DetailsPhong id={dataRoomRental.maphong} field='tenphong' />
                </option>
              </select>
            )}
          </div>
          <div className='mb-5'>
            <label
              htmlFor='dientich'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Tên khách hàng
            </label>
            {dataCustomers && (
              <select
                {...register('makhachhang')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue={dataCustomers[0].id}
              >
                {dataCustomers.map((data: any) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.tenkhachhang} | Cmnd:{data.cmnd} | Loại khách:
                      {data.quocgia == 'Việt Nam'
                        ? 'Trong nước'
                        : 'Nước ngoài'}{' '}
                      ({data.quocgia})
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
              Số người ở
            </label>
            <input
              type='gia'
              id='gia'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('songuoi', { required: true })}
            />
          </div>
        </section>
        {/* section 2 */}
        <section id='2'>
          {/*
           */}
          <div className='mb-5'>
            <label
              htmlFor='gia'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Thời gian bắt đầu thuê
            </label>
            <input
              type='datetime-local'
              id='gia'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('ngaybatdauo', { required: true })}
            />
          </div>
          {/*
           */}
          {dataRoomRental && dataRoomRental.trangthai != 'Đang thuê' && (
            <div className='mb-5'>
              <label
                htmlFor='gia'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Thời gian trả phòng
              </label>
              <input
                type='datetime-local'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register('ngaytraphong', { required: true })}
              />
            </div>
          )}
          {/*
           */}
          <div className='mb-5'>
            <label
              htmlFor='gia'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Ghi chú
            </label>
            <input
              type='gia'
              id='gia'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('ghichu', { required: true })}
            />
          </div>

          {dataRoomRental && (
            <div className={!id ? 'hidden mb-5' : 'block mb-5'}>
              <label
                htmlFor='gia'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Trạng thái
              </label>
              <select
                {...register('trangthai')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue='Đang thuê'
              >
                <option value={dataRoomRental.trangthai}>
                  {dataRoomRental.trangthai}
                </option>
              </select>
            </div>
          )}
        </section>
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

export default Formtaophieuthue
