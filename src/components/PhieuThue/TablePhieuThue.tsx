'use client'
import React, { useEffect, useState } from 'react'
import {
  useGetRoomRentalsQuery,
  useDeleteRoomRentalMutation
} from '@/redux/exportModule'
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
import Formtaophieuthue from './Formtaophieuthue'
import { Spinner } from '@nextui-org/react'
import DetailsPhong from '../Details/DetailsPhong'
import DetailsKhachHang from '../Details/DetailsKhachHang'
import DetailsNhanVien from '../Details/DetailsNhanVien'

const TablePhieuThue = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: dataRoomRentals, isFetching: isFetchingdataRoomRentals } =
    useGetRoomRentalsQuery({ dataQuery: '' })
  const [deleteRoom] = useDeleteRoomRentalMutation()
  const [idRoomRentals, setidRoomRentals]: any = useState(undefined)
  const [inputSearch, setInputSearch] = useState('')
  const [data, setData]: any = useState(undefined)
  useEffect(() => {
    if (inputSearch != '') {
      const filterData = dataRoomRentals.filter((data: any) => {
        return data.tenphong.includes(inputSearch)
      })
      setData(filterData)
    } else {
      setData(dataRoomRentals)
    }
  }, [inputSearch, dataRoomRentals])
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
        <button
          onClick={() => {
            setidRoomRentals(undefined)
            onOpen()
          }}
          className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Tạo phiếu thuê
        </button>
        {/* search */}
        <div className='w-[700px]'>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
            Tìm
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
        </div>
      </div>
      {/* table */}
      {isFetchingdataRoomRentals ? (
        <div className='w-[100px] mx-auto mt-[100px]'>
          {' '}
          <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Mã phiếu thuê
              </th>
              <th scope='col' className='px-6 py-3'>
                Phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên khách hàng
              </th>
              <th scope='col' className='px-6 py-3'>
                Số người ở
              </th>
              <th scope='col' className='px-6 py-3'>
                Nhân viên lập phiếu
              </th>
              <th scope='col' className='px-6 py-3'>
                Thời gian bắt đầu thuê
              </th>
              <th scope='col' className='px-6 py-3'>
                Thời gian trả phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Ghi chú
              </th>
              <th scope='col' className='px-6 py-3'>
                Tùy chọn
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item: any) => {
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
                      <DetailsPhong id={item.maphong} field='tenphong' />
                    </td>
                    <td className='px-6 py-4'>
                      {' '}
                      <DetailsKhachHang
                        id={item.makhachhang}
                        field='tenkhachhang'
                      />
                    </td>
                    <td className='px-6 py-4'>{item.songuoi}</td>
                    <td className='px-6 py-4'>
                      {' '}
                      <DetailsNhanVien id={item.manhanvien} field='ho' />{' '}
                      <DetailsNhanVien id={item.manhanvien} field='ten' />
                    </td>
                    <td className='px-6 py-4'>{item.ngaybatdauo}</td>
                    <td className='px-6 py-4'>{item.ngaytraphong}</td>
                    <td className='px-6 py-4'>{item.trangthai}</td>
                    <td className='px-6 py-4'>{item.ghichu}</td>
                    <td className='px-6 py-4'>
                      <span
                        className=' cursor-pointer'
                        onClick={() => {
                          setidRoomRentals(item.id)
                          onOpen()
                        }}
                      >
                        sửa
                      </span>{' '}
                      |{' '}
                      <span
                        className=' cursor-pointer'
                        onClick={() => {
                          handleDel(item.id)
                        }}
                      >
                        xóa
                      </span>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
      <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Form phiếu thuê phòng
              </ModalHeader>
              <ModalBody>
                <Formtaophieuthue id={idRoomRentals} />
              </ModalBody>
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

export default TablePhieuThue
