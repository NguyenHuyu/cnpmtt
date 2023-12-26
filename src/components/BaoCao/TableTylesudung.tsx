'use client'
import React, { useEffect, useState } from 'react'
import { useGetRoomRentalsQuery, useGetRoomsQuery } from '@/redux/exportModule'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
import { Spinner } from '@nextui-org/react'
import DetailsLoaiPhong from '../Details/DetailsLoaiPhong'

const TableTylesudung = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [thang, setThang]: any = useState(1)
  const [nam, setNam]: any = useState(2023)
  const [dataPhieuthue, setDataPhieuthue]: any = useState(null)
  const { data: dataRooms, isFetching: isFetchingDataRooms } = useGetRoomsQuery(
    { dataQuery: '' }
  )
  const { data: dataRoomRentals, isFetching: isFetchingDataRoomRentals } =
    useGetRoomRentalsQuery({ dataQuery: '' })

  useEffect(() => {
    if (thang && nam && dataRooms && dataRoomRentals) {
      const map = dataRooms.map((data: any) => {
        const copydata = { ...data }
        const month = parseInt(thang) // Lấy tháng từ phần tử đầu tiên trong mảng
        const year = parseInt(nam) // Lấy năm từ phần tử thứ hai trong mảng

        // duyet qua tung bill de ktra xem bill co nam trong thang ko
        const phieuthuenamtrongthang = dataRoomRentals.filter((data2: any) => {
          const ngaythuephong = new Date(data2.ngaybatdauo)
          const ngaytraphong = new Date(data2.ngaytraphong)
          const monththuephongToCheck = ngaythuephong.getMonth() + 1 // Lấy giá trị tháng từ ngày cần kiểm tra (+1 vì tháng trong JavaScript được đánh số từ 0 đến 11)

          const yearthuephongToCheck = ngaythuephong.getFullYear()

          const monthtraphongToCheck = ngaytraphong.getMonth() + 1 // Lấy giá trị tháng từ ngày cần kiểm tra (+1 vì tháng trong JavaScript được đánh số từ 0 đến 11)
          const yeartraphongToCheck = ngaytraphong.getFullYear()
          const flagthuephong =
            monththuephongToCheck == month &&
            yearthuephongToCheck == year &&
            data2.trangthai == 'Đã trả phòng - Đã thanh toán'
              ? true
              : false
          const flagtraphong =
            monthtraphongToCheck == month &&
            yeartraphongToCheck == year &&
            data2.trangthai == 'Đã trả phòng - Đã thanh toán'
              ? true
              : false
          const flagtenloaiphong = data.id == data2.maphong ? true : false

          return flagtenloaiphong && (flagthuephong || flagtraphong)
        })

        // const sum =
        //   phieuthuenamtrongthang.length > 0
        //     ? phieuthuenamtrongthang.reduce(
        //         (accumulator: any, currentValue: any) => {
        //           return Number(accumulator) + Number(currentValue.tonggiatien)
        //         },
        //         0
        //       )
        //     : 0

        const sumngaythue =
          phieuthuenamtrongthang.length > 0
            ? phieuthuenamtrongthang.reduce(
                (accumulator: any, currentValue: any) => {
                  const startDate = new Date(currentValue.ngaybatdauo)
                  const endDate = new Date(currentValue.ngaytraphong)

                  // Tính khoảng thời gian (đơn vị mili giây)
                  const timeDiff = endDate.getTime() - startDate.getTime()

                  // Chuyển đổi khoảng thời gian thành ngày
                  const daysDiff = timeDiff / (1000 * 3600 * 24)
                  return Number(accumulator) + Number(daysDiff)
                },
                0
              )
            : 0

        // copydata.doanhthu = sum
        copydata.songaythue = sumngaythue

        return copydata
      })
      setDataPhieuthue(map)
    }
  }, [thang, nam])

  //
  function getNumberOfDaysInMonth(month: any, year: any) {
    // Tạo một đối tượng Date với ngày là 0 (ngày cuối cùng của tháng trước)
    const lastDayOfMonth = new Date(year, month, 0)

    // Trả về ngày cuối cùng của tháng
    return Number(lastDayOfMonth.getDate())
  }
  //
  //
  const arrthang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const currentYear = new Date().getFullYear()
  const arrYear = []
  // Lặp qua các năm từ 1900 đến năm hiện tại
  for (let year = 2000; year <= currentYear; year++) {
    arrYear.push(year)
  }
  arrYear.reverse()
  return (
    <div className='relative '>
      <div className='flex items-center gap-[30px] justify-center'>
        <div className='flex gap-[10px] justify-center items-center'>
          <h2>Tháng</h2>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => {
              setThang(e.target.value)
            }}
          >
            {arrthang.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='flex gap-[10px] justify-center items-center'>
          <h2>Năm</h2>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => {
              setNam(e.target.value)
            }}
          >
            {arrYear.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* table */}
      {isFetchingDataRooms ? (
        <div className='w-[100px] mx-auto mt-[100px]'>
          {' '}
          <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Tên phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Số ngày thuê
              </th>
              <th scope='col' className='px-6 py-3'>
                Tỷ lệ (%)
              </th>
            </tr>
          </thead>

          <tbody>
            {dataPhieuthue &&
              dataPhieuthue.map((item: any) => {
                return (
                  <tr
                    key={item.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {item.tenphong}
                    </th>
                    <td className='px-6 py-4'>{item.songaythue.toFixed(0)}</td>
                    <td className='px-6 py-4'>
                      {Number(item.songaythue).toFixed(0)} /
                        {getNumberOfDaysInMonth(thang, nam)}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TableTylesudung
