'use client'
import React, { useEffect, useState } from 'react'
import { useGettypeRoomsQuery } from '@/redux/createApi/room-type'
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
import Formtaoloaiphong from './Formtaoloaiphong'
import { useDeletetypeRoomMutation } from '@/redux/createApi/room-type'
import { Spinner } from '@nextui-org/react'

const TableLoaiPhong = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: dataTypeRooms, isFetching: isFetchingDataTypeRooms } =
    useGettypeRoomsQuery({ dataQuery: '' })
  const [deleteTypeRoom] = useDeletetypeRoomMutation()
  const [idTypeRoom, setIdTypeRoom]: any = useState(undefined)
  const [inputSearch, setInputSearch] = useState('')
  const [data, setData]: any = useState(undefined)
  useEffect(() => {
    if (inputSearch != '') {
      const filterData = dataTypeRooms.filter((data: any) => {
        return data.tenloaiphong == inputSearch
      })
      setData(filterData)
    } else {
      setData(dataTypeRooms)
    }
  }, [inputSearch, dataTypeRooms])
  //
  const handleDel = async (id: any) => {
    await deleteTypeRoom(id)
      .unwrap()
      .then(() => {
        showSuccessNotification('Xóa thành công')
      })
      .catch((error: any) => {
        showErrorNotification(error.data?.message)
      })
  }
  return (
    <div className='relative '>
      <div className='flex gap-[60px] justify-center  items-center pr-[100px]'>
        <button
          onClick={() => {
            setIdTypeRoom(undefined)
            onOpen()
          }}
          className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Tạo loại phòng mới
        </button>
        {/* search */}
        <div className='w-[700px]'>
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
              Search
            </button>
          </div>
        </div>
      </div>
      {/* table */}
      {isFetchingDataTypeRooms ? (
        <div className='w-[100px] mx-auto mt-[100px]'>
          {' '}
          <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Tên loại phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Diện tích (m vuông)
              </th>
              <th scope='col' className='px-6 py-3'>
                Giá
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
                      {item.tenloaiphong}
                    </th>
                    <td className='px-6 py-4'>{item.dientich}</td>
                    <td className='px-6 py-4'>{item.gia}</td>
                    <td className='px-6 py-4'>
                      <span
                        className=' cursor-pointer'
                        onClick={() => {
                          setIdTypeRoom(item.id)
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Form tạo loại phòng
              </ModalHeader>
              <ModalBody>
                <Formtaoloaiphong id={idTypeRoom} />
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

export default TableLoaiPhong
