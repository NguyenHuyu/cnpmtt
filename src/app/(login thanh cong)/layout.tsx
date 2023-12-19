import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import { redirect } from 'next/navigation'
import Aside from '@/components/Aside'
import type { Metadata } from 'next'


export default async function Browse_Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')
  return (
    <div className='flex'>
      <div>
        <Aside />
      </div>
      <div className='flex-1 px-[30px] py-[15px] '>{children}</div>
    </div>
  )
}
