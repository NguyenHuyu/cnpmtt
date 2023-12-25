import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
import { useSession } from 'next-auth/react'
import {
  useGetstaffQuery,
  useGetCustomerQuery,
  useGetRoomQuery,
  useGettypeRoomQuery,
  useGetServiceDetailsQuery,
  useGetRegulationsQuery,
  useGetServicesQuery,
  useAddBillMutation,
  useUpdateRoomRentalMutation
} from '@/redux/exportModule'
import DetailsPhong from '../Details/DetailsPhong'
import DetailsDichVu from '../Details/DetailsDichVu'
import { truncate } from 'fs'
interface IFormInput {
  id?: number
  manhanvien: number
  maphieuthue: number
  hinhthucthanhtoan: string
  ghichu: string
  makhachhang: number
  songaythue: string
  tonggiatien: string
  dathanhtoan: boolean
}
const Formthanhtoan1phieuthue = ({ infoRoomRentals }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>()
  const [thoigiantraphong, setThoigiantraphong]: any = useState(null)
  const [sogio, setSogio]: any = useState(null)
  const [phuthu, setPhuthu]: any = useState(null)
  const [cotinhphuthu, setCotinhphuthu]: any = useState(false)
  const [thanhtienphong, setThanhtienphong]: any = useState(null)
  const [danhsachdichvu, setDanhsachdichvu]: any = useState(null)
  const [ghepdatadichvu, setGhepdatadichvu]: any = useState([])
  const [addBill] = useAddBillMutation()
  const [updateRoomRental] = useUpdateRoomRentalMutation()
  //tong tien dichvu+ phong
  const [tongtien, setTongtien]: any = useState(0)
  const { data: dataRegulations, isFetching: isFetchingDataRegulations } =
    useGetRegulationsQuery({ dataQuery: '' })
  const { data: dataServicess, isFetching: isFetchingDataServicess } =
    useGetServicesQuery({ dataQuery: '' })
  const { data: dataServiceDetails, isFetching: isFetchingDataServiceDetails } =
    useGetServiceDetailsQuery({ dataQuery: '' })
  const { data: session, status }: any = useSession()
  const { data: dataStaff } = useGetstaffQuery(
    session?.token?.username && session?.token?.username,
    { skip: !session?.token?.username }
  )
  const { data: dataCustomer } = useGetCustomerQuery(
    infoRoomRentals && infoRoomRentals.makhachhang,
    { skip: !infoRoomRentals.makhachhang }
  )
  const { data: dataRoom } = useGetRoomQuery(
    infoRoomRentals && infoRoomRentals?.maphong,
    {
      skip: !infoRoomRentals?.maphong
    }
  )
  const { data: dataTypeRoom } = useGettypeRoomQuery(
    dataRoom && dataRoom?.maloaiphong,
    {
      skip: !dataRoom?.maloaiphong
    }
  )
  //danh sach dich vu cua phieu thue
  useEffect(() => {
    if (dataServiceDetails && infoRoomRentals) {
      const filter = dataServiceDetails.filter(
        (data: any) => data.maphieuthue == infoRoomRentals.id
      )
      setDanhsachdichvu(filter)
    }
  }, [dataServiceDetails, infoRoomRentals])
  //
  // ghep details dich vu vao dich vu
  useEffect(() => {
    if (danhsachdichvu && danhsachdichvu.length > 0 && dataServicess) {
      const map = danhsachdichvu.map((data: any) => {
        const copydata = { ...data }
        const flag = dataServicess.find(
          (data2: any) => data.madichvu == data2.id
        )
        if (flag) {
          copydata.infoDichvu = { ...flag }
          return copydata
        }
      })
      setGhepdatadichvu(map)
    }
  }, [danhsachdichvu, dataServicess])

  //   tinh phu thu
  useEffect(() => {
    if (dataRegulations) {
      const filter = dataRegulations.filter((data: any) => data.dahuy == false)
      if (filter.length > 0) {
        setPhuthu(filter[0].phantramphuthu)
      }
    }
  }, [dataRegulations])
  useEffect(() => {
    if (dataRoom && infoRoomRentals) {
      if (infoRoomRentals.songuoi - dataRoom.songuoi > 0) {
        setCotinhphuthu(true)
      }
    }
  }, [dataRoom, infoRoomRentals])

  //   tinh tien dich vu
  useEffect(() => {
    if (ghepdatadichvu) {
      const sum = ghepdatadichvu.reduce(
        (accumulator: any, currentValue: any) => {
          return (
            accumulator + currentValue.soluong * currentValue.infoDichvu.gia
          )
        },
        0
      )
      const tongtien = sum + thanhtienphong
      setTongtien(tongtien)
    }
  }, [ghepdatadichvu, thanhtienphong])

  useEffect(() => {
    if (thoigiantraphong) {
      const dateNgayo: Date = new Date(infoRoomRentals.ngaybatdauo)
      const dateNgaytraphong: Date = new Date(thoigiantraphong)
      const timeDifference = Math.abs(
        dateNgaytraphong.getTime() - dateNgayo.getTime()
      )
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))
      //   const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60)
      setSogio(hoursDifference)
    }
  }, [infoRoomRentals.ngaybatdauo, thoigiantraphong])
  //   tinh thanh tien
  useEffect(() => {
    if (cotinhphuthu && dataTypeRoom && phuthu) {
      const thanhtienphong = (sogio / 24) * dataTypeRoom.gia
      const thanhtienphong1 = (thanhtienphong * phuthu) / 100
      const thanhtienphong3 = thanhtienphong + thanhtienphong1
      setThanhtienphong(thanhtienphong3)
    } else if (!cotinhphuthu && dataTypeRoom) {
      const thanhtienphong = (sogio / 24) * dataTypeRoom.gia
      setThanhtienphong(thanhtienphong)
    }
  }, [cotinhphuthu, dataTypeRoom, phuthu, sogio])
  const onSubmit = async (data: IFormInput) => {
    const { id, ...formData } = data
    formData.manhanvien = Number(dataStaff.id)
    formData.maphieuthue = Number(infoRoomRentals.id)
    formData.makhachhang = Number(dataCustomer.id)
    formData.songaythue = String((sogio / 24).toFixed(2))
    formData.tonggiatien = String(tongtien)
    formData.dathanhtoan = true
    const ngaytraphong: Date = new Date(thoigiantraphong)
    // if (id) {
    //   await updateRoomRental({
    //     body: formData,
    //     id
    //   })
    //     .unwrap()
    //     .then(() => {
    //       showSuccessNotification('Sửa thành công!')
    //     })
    //     .catch((error: any) => {
    //       showErrorNotification(error.data?.message)
    //     })
    // } else {
    await addBill(formData)
      .unwrap()
      .then(async () => {
        await updateRoomRental({
          id: infoRoomRentals.id,
          body: {
            ngaytraphong: ngaytraphong,
            trangthai: 'Đã trả phòng - Đã thanh toán'
          }
        })
          .unwrap()
          .then(() => {
            showSuccessNotification('Thanh toán thành công')
            reset()
          })
      })
      .catch((error: any) => {
        showErrorNotification(error.data?.message)
      })
    //}
  }

  return (
    <form className='max-w-[1000px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
      {dataStaff && (
        <div className='mb-5'>
          <label
            htmlFor='gia'
            className='block mb-2 text-[15px] font-medium text-gray-900 dark:text-white'
          >
            Nhân viên lập hóa đơn: {dataStaff.ho} {dataStaff.ten}
          </label>
        </div>
      )}
      <div className='flex gap-[50px]'>
        <section id='1'>
          <div className='mb-5'>
            <label
              htmlFor='dientich'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Tên khách hàng
            </label>
            {dataCustomer && (
              <select
                {...register('makhachhang')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option key={dataCustomer.id} value={dataCustomer.id}>
                  {dataCustomer.tenkhachhang} | Cmnd:{dataCustomer.cmnd} | Loại
                  khách:
                  {dataCustomer.quocgia == 'Việt Nam'
                    ? 'Trong nước'
                    : 'Nước ngoài'}{' '}
                  ({dataCustomer.quocgia})
                </option>
              </select>
            )}
          </div>
          <div className='mb-5'>
            <label
              htmlFor='dientich'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Hình thức thanh toán
            </label>

            <select
              {...register('hinhthucthanhtoan')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value={'Tiền mặt'}>Tiền mặt</option>
              <option value={'Chuyển khoản'}>Chuyển khoản</option>
            </select>
          </div>
        </section>
        {/* ss 2 */}
        <section id='2'>
          <div className='mb-5'>
            <label
              htmlFor='gia'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Thời gian trả phòng
            </label>
            <input
              type='datetime-local'
              id='gia'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={(e) => {
                setThoigiantraphong(e.target.value)
              }}
            />
          </div>
          <div className='mb-5'>
            <label
              htmlFor='gia'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Ghi chú
            </label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('ghichu')}
            />
          </div>
          {/*
           */}
          {/* <div className='mb-5'>
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
          </div> */}
        </section>
      </div>
      <h2 className='block text-center font-[600]'>Bảng Tính</h2>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Tên phòng
            </th>
            <th scope='col' className='px-6 py-3'>
              Giá (/ngày)
            </th>
            <th scope='col' className='px-6 py-3'>
              Số ngày thuê
            </th>
            <th scope='col' className='px-6 py-3'>
              Số người ở
            </th>
            <th scope='col' className='px-6 py-3'>
              Số người quy định
            </th>
            <th scope='col' className='px-6 py-3'>
              Phụ thu (%)
            </th>
            <th scope='col' className='px-6 py-3'>
              Thành tiền
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            key={infoRoomRentals.id}
            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
          >
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              <DetailsPhong id={infoRoomRentals.maphong} field='tenphong' />
            </th>
            <td className='px-6 py-4'> {dataTypeRoom && dataTypeRoom.gia}</td>
            <td className='px-6 py-4'>{(sogio / 24).toFixed(2)}</td>
            {/* so nguoi o*/}
            <td className='px-6 py-4'>{infoRoomRentals.songuoi}</td>
            {/* so nguoi quy dinh */}
            <td className='px-6 py-4'>{dataRoom && dataRoom.songuoi}</td>
            {/* phu thu */}
            <td className='px-6 py-4'>{phuthu && cotinhphuthu ? phuthu : 0}</td>
            <td className='px-6 py-4'>
              {thanhtienphong && thanhtienphong.toFixed(2)}
            </td>
          </tr>
        </tbody>
        {/* dich vu */}
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Tên dịch vụ
            </th>
            <th scope='col' className='px-6 py-3'>
              Đơn giá
            </th>
            <th scope='col' className='px-6 py-3'>
              Số lượng
            </th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'>
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          {ghepdatadichvu &&
            ghepdatadichvu.map((data: any) => {
              return (
                <tr
                  key={infoRoomRentals.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    <DetailsDichVu id={data.madichvu} field='tendichvu' />
                  </th>
                  <td className='px-6 py-4'>
                    {' '}
                    <DetailsDichVu id={data.madichvu} field='gia' />
                  </td>
                  <td className='px-6 py-4'> {data.soluong}</td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'>
                    {data.soluong * data.infoDichvu.gia}
                  </td>
                </tr>
              )
            })}
        </tbody>
        {/*  */}
        {/* tong tien */}
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'>
              Tổng tiền
            </th>
          </tr>
        </thead>
        <tbody>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4'>{tongtien.toFixed(0)}</td>
        </tbody>
      </table>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Thanh toán
      </button>
    </form>
  )
}

export default Formthanhtoan1phieuthue
