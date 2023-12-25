'use client'
import React, { useEffect, useState } from 'react'
import { useGetBillsQuery, useDeleteRoomMutation } from '@/redux/exportModule'
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
import DetailsNhanVien from '../Details/DetailsNhanVien'
import DetailsKhachHang from '../Details/DetailsKhachHang'
const TableHoaDon = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: dataBills, isFetching: isFetchingDataBills } = useGetBillsQuery(
    { dataQuery: '' }
  )
  const [deleteRoom] = useDeleteRoomMutation()
  const [idRoom, setIdRoom]: any = useState(undefined)
  const [inputSearch, setInputSearch] = useState('')
  const [data, setData]: any = useState(undefined)
  //
  const handleDel = async (id: any) => {
    await deleteRoom(id)
      .unwrap()
      .then(() => {
        showSuccessNotification('Xóa thành công')
      })
      .catch((error: any) => {
        showErrorNotification(`Lỗi: ${error.status}`)
      })
  }
  return (
    <div className='relative '>
      <div className='flex gap-[60px] justify-center  items-center pr-[100px]'>
        {/* <button
          onClick={() => {
            setIdRoom(undefined)
            onOpen()
          }}
          className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Tạo phòng mới
        </button> */}
        {/* search */}
        {/* <div className='w-[700px]'>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              id='inputSearch'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Nhập tên phòng ...'
            />
            <button
              onClick={() => {
                const ele: any = document.querySelector('#inputSearch')
                setInputSearch(ele.value)
              }}
              className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Tìm
            </button>
          </div>
        </div> */}
      </div>
      {/* table */}
      {isFetchingDataBills ? (
        <div className='w-[100px] mx-auto mt-[100px]'>
          {' '}
          <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Mã hóa đơn
              </th>
              <th scope='col' className='px-6 py-3'>
                Nhân viên tạo
              </th>
              <th scope='col' className='px-6 py-3'>
                Mã phiếu thuê
              </th>
              <th scope='col' className='px-6 py-3'>
                Khách hàng
              </th>
              <th scope='col' className='px-6 py-3'>
                Hình thức thanh toán
              </th>
              <th scope='col' className='px-6 py-3'>
                Ghi chú
              </th>
              <th scope='col' className='px-6 py-3'>
                Số ngày thuê
              </th>
              <th scope='col' className='px-6 py-3'>
                Tổng giá tiền
              </th>
            </tr>
          </thead>

          <tbody>
            {dataBills &&
              dataBills.map((item: any) => {
                return (
                  <tr
                    key={item.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {item.id}
                    </th>
                    <td className='px-6 py-4'>
                      <DetailsNhanVien id={item.manhanvien} field='ho' />{' '}
                      <DetailsNhanVien id={item.manhanvien} field='ten' />
                    </td>
                    <td className='px-6 py-4'>{item.maphieuthue}</td>
                    <td className='px-6 py-4'>
                      <DetailsKhachHang
                        id={item.makhachhang}
                        field='tenkhachhang'
                      />
                    </td>
                    <td className='px-6 py-4'>{item.hinhthucthanhtoan}</td>
                    <td className='px-6 py-4'>{item.ghichu}</td>
                    <td className='px-6 py-4'>{item.songaythue}</td>
                    <td className='px-6 py-4'>{item.tonggiatien.toFixed(0)}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Form tạo phòng
              </ModalHeader>
              <ModalBody>{/* <Formtaophong id={idRoom} /> */}</ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
                {/* <Button color='primary' onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TableHoaDon