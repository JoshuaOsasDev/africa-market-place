import React from 'react'
import dropDownIcon from '../../../../public/dashboard-images/drop-down-icon.svg'
import Image from 'next/image'
import viewIcon from '../../../../public/dashboard-images/view-icon.svg'
import editIcon from '../../../../public/dashboard-images/edit-icon.svg'
import tomatoesImage from '../../../../public/dashboard-images/orders-page-images/tomatoes-image.png'
import greenPepperImage from '../../../../public/dashboard-images/orders-page-images/green-pepper-image.png'
import potatoesImage from '../../../../public/dashboard-images/orders-page-images/potatoes-image.png'

const OrdersTable = () => {
  return (
    <div className='overflow-x-auto'>
    <table className='min-w-full'>
        <thead className='  '>
          <tr className='h-[41px]  lg:h-14 text-[#333843] text-left bg-[#F9F9FC] font-medium text-[14px] leading-5'>
            <th className=' flex justify-between h-full w-[233px] p-3 lg:px-[22px] lg:py-[18px]'>Product <Image src={dropDownIcon} alt='drop-down-menu' className='hidden lg:block'/></th>
            <th className='w-[106px] p-3 lg:px-[22px] lg:py-[18px]'>Order ID</th>
            <th className='flex justify-between w-[131px] p-3 lg:px-[22px] lg:py-[18px]'>Date <Image src={dropDownIcon} alt='drop-down-menu' className='hidden lg:block'/></th>
            <th className='w-[167px] p-3 lg:px-[22px] lg:py-[18px]'>Customer</th>
            <th className='flex justify-between w-[121px] p-3 lg:px-[22px] lg:py-[18px]'>Total <Image src={dropDownIcon} alt='drop-down-menu' className='hidden lg:block'/></th>
            <th className='w-[121px] p-3 lg:px-[22px] lg:py-[18px]'>Payment</th>
            <th className='flex justify-between w-[145px] p-3 lg:px-[22px] lg:py-[18px]'>Status <Image src={dropDownIcon} alt='drop-down-menu' className='hidden lg:block'/></th>
            <th className='w-[92px] p-3 lg:px-[22px] lg:py-[18px]'>Action</th>
          </tr>
        </thead>

        <tbody>
            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={tomatoesImage} alt='tomatoes-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Fresh Tomatoes</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>1 min ago</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>John Bushmill</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>Johnb@gmail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$121.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Mastercard</td>
                <td className=' text-[#FBC02D] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className='bg-[#FFF9EA] px-3 py-1 rounded-[100px]'>Processing</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={greenPepperImage} alt='green-pepper-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Green Pepper</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>1 min ago</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Ilham Budi A</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>ilahmbudi@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$590.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Visa</td>
                <td className=' text-[#FBC02D] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className='bg-[#FFF9EA] px-3 py-1 rounded-[100px]'>Processing</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={potatoesImage} alt='potatoes-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Potatoes</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>5 hour ago</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Mohammad Karim</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>m_karim@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$125.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Transfer</td>
                <td className=' text-[#13B2E4] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#E8F8FD] px-3 py-1 rounded-[100px] text-center'>Shipped</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={greenPepperImage} alt='green-pepper-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Green Pepper</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>1 day ago</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Linda Blair</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>lindablair@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$348.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Paypal</td>
                <td className=' text-[#13B2E4] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#E8F8FD] px-3 py-1 rounded-[100px] text-center'>Shipped</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={tomatoesImage} alt='tomatoes-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Fresh Tomatoes</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>2 day ago</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Josh Adam</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>josh_adam@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$607.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Visa</td>
                <td className=' text-[#2E7D32] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#E7F4EE] px-3 py-1 rounded-[100px] text-center'>Delivered</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={potatoesImage} alt='potatoes-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Potatoes</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>5 Jan 2023</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Sin Tae</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>sin_tae@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$234.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Visa</td>
                <td className=' text-[#FF4733] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#FFE8E5] px-3 py-1 rounded-[100px] text-center'>Cancelled</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={greenPepperImage} alt='green-pepper-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Green Pepper</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>1 Jan 2023</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Rajesh Masvidal</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>rajesh_m@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$760.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Transfer</td>
                <td className=' text-[#13B2E4] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#E8F8FD] px-3 py-1 rounded-[100px] text-center'>Shipped</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>

            <tr className=' bg-[#FFFFFF] border-b border-[#F0F1F3]'>
                <td className='flex gap-2 items-center h-[80px] px-[22px] py-[18px]'>
                    <input type='checkbox' className='w-4 h-4 lg:w-5 lg:h-5' />
                    <Image src={tomatoesImage} alt='tomatoes-image' className='w-[30px] h-[30px] lg:w-10 lg:h-10'/>
                    <div>
                        <h1 className='text-[#333843] text-[14px] font-medium leading-5'>Fresh Tomatoes</h1>
                        <p className='text-[12px] text-[#667085] font-normal leading-[18px]'>+3 Other Products</p>
                    </div>
                </td>
                <td className='px-[22px] py-[18px] text-[12px] lg:text-[14px] font-semibold text-[#2E7D32] leading-5'>#302012</td>
                <td className='text-[14px] font-medium text-[#667085] leading-5 px-[22px] py-[18px]'>24 Dec 2022</td>
                <td className='px-[22px] py-[18px]'><h1 className='text-[14px] font-medium text-[#333843] leading-5'>Fajar Surya</h1> <span className='text-[12px] text-[#667085] font-normal leading-[18px]'>fsurya@mail.com</span></td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>$400.00</td>
                <td className='text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]'>Mastercard</td>
                <td className=' text-[#2E7D32] text-[14px] font-semibold leading-5 px-[22px] py-[18px]'><h1 className=' bg-[#E7F4EE] px-3 py-1 rounded-[100px] text-center'>Delivered</h1></td>
                <td className='flex gap-2 px-[18px] lg:px-[22px] py-[18px]'>
                    <Image src={viewIcon} alt='view-icon' className='cursor-pointer' />
                    <Image src={editIcon} alt='edit-icon' className='cursor-pointer' />
                </td>
            </tr>
        </tbody>
    </table>
    </div>
  )
}

export default OrdersTable