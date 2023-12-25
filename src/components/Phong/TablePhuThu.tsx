'use client'
import React, { useEffect, useState } from 'react'
import {
  useGetRegulationsQuery,
  useDeleteRoomMutation
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
import Formquydinh from './Formquydinh'
import { Spinner } from '@nextui-org/react'
import DetailsLoaiPhong from '../Details/DetailsLoaiPhong'

const TablePhuThu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: dataRegulations, isFetching: isFetchingDataRegulations } =
    useGetRegulationsQuery({ dataQuery: '' })
  const [idPhuThu, setidPhuThu]: any = useState(undefined)

  //

  return (
    <div className='relative '>
      <button
        onClick={() => {
          setidPhuThu(undefined)
          onOpen()
        }}
        className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Tạo quy định phụ thu mới
      </button>
      {/* table */}
      {isFetchingDataRegulations ? (
        <div className='w-[100px] mx-auto mt-[100px]'>
          {' '}
          <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Mã
              </th>
              <th scope='col' className='px-6 py-3'>
                Tỷ lệ phụ thu (%)
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Tùy chọn
              </th>
            </tr>
          </thead>

          <tbody>
            {dataRegulations &&
              dataRegulations.map((item: any) => {
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

                    <td className='px-6 py-4'>{item.phantramphuthu}</td>
                    <td className='px-6 py-4'>
                      {item.dahuy == false ? 'Đang áp dụng' : 'Đã hủy'}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className=' cursor-pointer'
                        onClick={() => {
                          setidPhuThu(item.id)
                          onOpen()
                        }}
                      >
                        sửa
                      </span>{' '}
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
                Form quy định
              </ModalHeader>
              <ModalBody>
                <Formquydinh id={idPhuThu} />
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

export default TablePhuThu
