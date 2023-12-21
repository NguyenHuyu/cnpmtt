'use client'
import React from 'react'
import { useGettypeRoomsQuery } from '@/redux/createApi/typeRoom'

const TableLoaiPhong = () => {
  const { data } = useGettypeRoomsQuery({ dataQuery: '' })
  console.log('data', data)
  return (
    <div className='relative overflow-x-auto'>
      <div className='flex gap-[60px] justify-center  items-center pr-[100px]'>
        <button className='text-white h-[40px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Tạo loại phòng mới
        </button>
        {/* search */}
        <form className='w-[700px]'>
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
              type='search'
              id='default-search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Nhập tên phòng ...'
              required
            />
            <button
              type='submit'
              className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* table */}
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[30px]'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Tên loại phòng
            </th>
            <th scope='col' className='px-6 py-3'>
              Diện tích
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
          {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              Apple MacBook Pro 17
            </th>
            <td className='px-6 py-4'>Silver</td>
            <td className='px-6 py-4'>Laptop</td>
            <td className='px-6 py-4'>Xem chi tiết | sửa | Xóa</td>
          </tr> */}
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
                    <span className=' cursor-pointer'>Xem chi tiết</span> |{' '}
                    <span className=' cursor-pointer'>sửa</span> |{' '}
                    <span className=' cursor-pointer'>xóa</span>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TableLoaiPhong
