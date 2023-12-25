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
import { useRouter } from 'next/navigation'
import Formquanlydichvu from './Formquanlydichvu'

const TablePhieuThue = () => {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: dataRoomRentals, isFetching: isFetchingdataRoomRentals } =
    useGetRoomRentalsQuery({ dataQuery: '' })
  const [deleteRoom] = useDeleteRoomRentalMutation()
  const [infoRoomRentals, setInfoRoomRentals]: any = useState(undefined)
  const [typeFilter, setTypeFilter] = useState('tatca')
  const [data, setData]: any = useState(undefined)
  const [typeModal, setTypeModal]: any = useState(null)
  useEffect(() => {
    if (typeFilter != 'tatca') {
      const filterData = dataRoomRentals.filter((data: any) => {
        return data.trangthai.includes(typeFilter)
      })
      setData(filterData)
    } else {
      setData(dataRoomRentals)
    }
  }, [typeFilter, dataRoomRentals])
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
            setInfoRoomRentals(undefined)
            onOpen()
          }}
          className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Tạo phiếu thuê
        </button>
        {/* search */}
        <div className='flex gap-[10px] justify-center items-center'>
          <h2>Lọc theo trạng thái: </h2>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => {
              setTypeFilter(e.target.value)
            }}
          >
            <option value={'tatca'}>Tất cả</option>
            <option value={'Đang thuê'}>Đang thuê</option>
            <option value={'Đã trả phòng - Chưa thanh toán'}>
              Đã trả phòng - Chưa thanh toán
            </option>
            <option value={'Đã trả phòng - Đã thanh toán'}>
              Đã trả phòng - Đã thanh toán
            </option>
          </select>
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
                    <td className='px-6 py-4'>
                      {item.ngaytraphong == null
                        ? 'Chưa trả phòng'
                        : item.ngaytraphong}
                    </td>
                    <td className='px-6 py-4'>{item.trangthai}</td>
                    <td className='px-6 py-4'>{item.ghichu}</td>
                    <td className='px-6 py-4'>
                      {item.trangthai != 'Đã trả phòng - Đã thanh toán' && (
                        <>
                          <span
                            className=' cursor-pointer'
                            onClick={() => {
                              setInfoRoomRentals(item)
                              setTypeModal('Quan ly dich vu')
                              onOpen()
                            }}
                          >
                            Quản lý dịch vụ |{' '}
                          </span>
                          {/* {item.trangthai != 'Đã trả phòng - Đã thanh toán' && (
                            <span
                              className=' cursor-pointer'
                              // onClick={() => {
                              //    setInfoRoomRentals(item)
                              //    setTypeModal('Quan ly dich vu')
                              //    onOpen()
                              // }}
                            >
                              Thanh toán (tạo hóa đơn) |{' '}
                            </span>
                          )} */}
                          <span
                            className=' cursor-pointer'
                            onClick={() => {
                              setInfoRoomRentals(item)
                              setTypeModal('Sua')
                              onOpen()
                            }}
                          >
                            Sửa
                          </span>{' '}
                          |{' '}
                          <span
                            className=' cursor-pointer'
                            onClick={() => {
                              handleDel(item.id)
                            }}
                          >
                            Xóa
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
      <Modal
        size={typeModal == 'Sua' || undefined ? '3xl' : '5xl'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {typeModal == 'Sua' && 'Form phiếu thuê phòng'}
                {typeModal == 'Quan ly dich vu' && (
                  <span>
                    Quản lý dịch vụ phòng{' '}
                    <DetailsPhong
                      id={infoRoomRentals.maphong}
                      field='tenphong'
                    />{' '}
                  </span>
                )}
              </ModalHeader>
              <ModalBody>
                {typeModal == 'Sua' && (
                  <Formtaophieuthue id={infoRoomRentals?.id} />
                )}
                {typeModal == undefined && (
                  <Formtaophieuthue id={infoRoomRentals?.id} />
                )}
                {typeModal == 'Quan ly dich vu' && (
                  <Formquanlydichvu infoRoomRentals={infoRoomRentals} />
                )}
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
