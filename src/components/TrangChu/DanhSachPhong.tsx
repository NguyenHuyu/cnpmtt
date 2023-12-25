'use client'
import React, { use, useEffect, useState } from 'react'
import { useGetRoomsQuery, useGetRoomRentalsQuery } from '@/redux/exportModule'
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
import Formquanlydichvu from '../PhieuThue/Formquanlydichvu'
import Formthanhtoan1phieuthue from '../PhieuThue/Formthanhtoan1phieuthue'

const DanhSachPhong = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [dsPhongDangThue, setDsPhongDangThue]: any = useState(null)
  const [typeFilter, setTypeFilter] = useState('tatca')
  const [infoRoomRentals, setInfoRoomRentals]: any = useState(null)
  const [typeModal, setTypeModal]: any = useState(null)
  const { data: dataRooms, isFetching: isFetchingDataRooms } = useGetRoomsQuery(
    { dataQuery: '' }
  )
  const { data: dataRoomRentals, isFetching: isFetchingdataRoomRentals } =
    useGetRoomRentalsQuery({ dataQuery: '' })

  const [idRoom, setIdRoom]: any = useState(undefined)
  const [inputSearch, setInputSearch] = useState('')
  const [data, setData]: any = useState(undefined)
  useEffect(() => {
    if (dataRoomRentals) {
      // loc ra ds phong dang thue
      const dsPhongDangThue = dataRoomRentals.filter((data: any) => {
        return data.trangthai.includes('Đang thuê')
      })
      setDsPhongDangThue(dsPhongDangThue)
    }
  }, [dataRoomRentals])
  //
  useEffect(() => {
    if (dsPhongDangThue && dataRooms) {
      //them tinh trang vao ds phong
      const filterData = dataRooms.map((dataRoom: any) => {
        const { ...copyData } = dataRoom
        const isPhongDangThue = dsPhongDangThue.filter(
          (dataPhongDangThue: any) => {
            return dataRoom.id == dataPhongDangThue.maphong
          }
        )
        if (isPhongDangThue.length > 0) {
          copyData.tinhtrang = 'Đang thuê'
          copyData.maphieuthue = isPhongDangThue[0].id
          copyData.infoRoomRentals = { ...isPhongDangThue[0] }
          return copyData
        } else {
          copyData.tinhtrang = 'Còn trống'
          return copyData
        }
      })
      setData(filterData)
    }
  }, [dsPhongDangThue, dataRooms])
  return (
    <div className='relative '>
      <div className='flex gap-[60px] justify-center  items-center pr-[100px]'>
        {/* <button
          onClick={() => {
            // setInfoRoomRentals(undefined)
            // onOpen()
          }}
          className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Thanh toán nhiều phiếu thuê
        </button> */}
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
            <option value={'Còn trống'}>Phòng còn trống</option>
            <option value={'Đang thuê'}>Phòng đang thuê</option>
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
                Loại phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Đơn giá
              </th>
              <th scope='col' className='px-6 py-3'>
                Tình trạng
              </th>
              <th scope='col' className='px-6 py-3'>
                Tùy chọn
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item: any) => {
                {
                  if (typeFilter == 'tatca')
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
                        <td className='px-6 py-4'>
                          <DetailsLoaiPhong
                            id={item.maloaiphong}
                            field='tenloaiphong'
                          />
                        </td>
                        <td className='px-6 py-4'>
                          <DetailsLoaiPhong id={item.maloaiphong} field='gia' />
                        </td>
                        <td
                          className={
                            item.tinhtrang == 'Còn trống'
                              ? 'px-6 py-4 text-green-500'
                              : 'px-6 py-4 text-red-400'
                          }
                        >
                          {item.tinhtrang}
                        </td>
                        <td className='px-6 py-4'>
                          {item.tinhtrang == 'Đang thuê' && (
                            <>
                              <span
                                className=' cursor-pointer'
                                onClick={() => {
                                  setInfoRoomRentals(item.infoRoomRentals)
                                  setTypeModal('Quan ly dich vu')
                                  onOpen()
                                }}
                              >
                                Quản lý dịch vụ |
                              </span>
                              <span className=' cursor-pointer' onClick={()=>{
                                setInfoRoomRentals(item.infoRoomRentals)
                                setTypeModal('thanhtoan1phieuthue')
                                onOpen()
                              }}> Thanh toán phiếu thuê này</span>
                            </>
                          )}
                        </td>
                      </tr>
                    )
                  else if (item.tinhtrang == typeFilter)
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
                        <td className='px-6 py-4'>
                          <DetailsLoaiPhong
                            id={item.maloaiphong}
                            field='tenloaiphong'
                          />
                        </td>
                        <td className='px-6 py-4'>
                          <DetailsLoaiPhong id={item.maloaiphong} field='gia' />
                        </td>
                        <td
                          className={
                            item.tinhtrang == 'Còn trống'
                              ? 'px-6 py-4 text-green-500'
                              : 'px-6 py-4 text-red-400'
                          }
                        >
                          {item.tinhtrang}
                        </td>
                        {item.tinhtrang == 'Đang thuê' && (
                          <>
                            <span
                              className=' cursor-pointer'
                              onClick={() => {
                                setInfoRoomRentals(item.infoRoomRentals)
                                setTypeModal('Quan ly dich vu')
                                onOpen()
                              }}
                            >
                              Quản lý dịch vụ | 
                            </span>
                            <span> Thanh toán phiếu thuê này</span>
                          </>
                        )}
                      </tr>
                    )
                }
              })}
          </tbody>
        </table>
      )}
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
              {typeModal == 'Quan ly dich vu' && 'quan ly dv'}
              {typeModal == 'thanhtoan1phieuthue' && 'thanh toan 1 phieu'}
              {typeModal == 'thanhtoannhieuphieuthue' && 'thanh toan nhieu phieu'}
              </ModalHeader>
              <ModalBody>
              {typeModal == 'Quan ly dich vu' && (
                  <Formquanlydichvu infoRoomRentals={infoRoomRentals} />
                )}
                 {typeModal == 'thanhtoan1phieuthue' && (
                  <Formthanhtoan1phieuthue infoRoomRentals={infoRoomRentals} />
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

export default DanhSachPhong
