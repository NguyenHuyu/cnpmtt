import React, { useEffect, useState } from 'react'
import { useGetServiceDetailsQuery,useDeleteServiceDetailMutation } from '@/redux/exportModule'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import Formthemchitietdichvu from './Formthemchitietdichvu'
import DetailsDichVu from '../Details/DetailsDichVu'
import DetailChiTietDichVu from '../Details/DetailsChiTietDichVu'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/lib/notifications'
const Formquanlydichvu = ({ infoRoomRentals }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [typeModal, setTypeModal]: any = useState(null)
  const [typefilter, setTypefilter] = useState('tatca')
  const [idChitietdichvu,setIdChitietdichvu]:any=useState(null)
  const [xoachitietdichvu]=useDeleteServiceDetailMutation()
  const [dataServiceDetailsTheoPhong, setDataServiceDetailsTheoPhong]: any =
    useState(null)
  const { data: dataServiceDetails } = useGetServiceDetailsQuery({
    dataQuery: ''
  })

  useEffect(() => {
    if (dataServiceDetails) {
      const filterData = dataServiceDetails.filter((item: any) => {
        return item.maphieuthue == infoRoomRentals.id
      })
      setDataServiceDetailsTheoPhong(filterData)
    }
  }, [dataServiceDetails])
  
  const handleDel = async (id: any) => {
    await xoachitietdichvu(id)
      .unwrap()
      .then(() => {
        showSuccessNotification('Xóa thành công')
      })
      .catch((error: any) => {
        showErrorNotification(`Lỗi: ${error.status}`)
      })
  }
  return (
    <>
      <button
        onClick={() => {
          setTypeModal('themchitietdichvu')
          onOpen()
        }}
        className='text-white h-[40px] w-[200px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Thêm dịch vụ, sản phẩm
      </button>
      <div className='h-[30px]' />
      <h2 className='font-[500]'>Danh sách dịch vụ, sản phẩm đã mua</h2>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Số thứ tự
            </th>
            <th scope='col' className='px-6 py-3'>
              Tên dịch vụ | sản phẩm
            </th>
            <th scope='col' className='px-6 py-3'>
              Số lượng
            </th>
            <th scope='col' className='px-6 py-3'>
              Đơn giá
            </th>
            <th scope='col' className='px-6 py-3'>
              Tùy chọn
            </th>
          </tr>
        </thead>

        <tbody>
          {dataServiceDetailsTheoPhong &&
            dataServiceDetailsTheoPhong.map((item: any, index: any) => {
              return (
                <tr
                  key={item.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>
                    <DetailsDichVu id={item.madichvu} field='tendichvu' />
                  </td>
                  <td className='px-6 py-4'>{item.soluong}</td>
                  <td className='px-6 py-4'>
                    <DetailsDichVu id={item.madichvu} field='gia' />
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className=' cursor-pointer'
                      onClick={() => {
                        setIdChitietdichvu(item.id)
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
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {typeModal == 'themchitietdichvu' && 'Thêm dịch vụ/sản phẩm'}
              </ModalHeader>
              <ModalBody>
                <Formthemchitietdichvu infoRoomRentals={infoRoomRentals} idChitietdichvu={idChitietdichvu} />
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
    </>
  )
}

export default Formquanlydichvu
