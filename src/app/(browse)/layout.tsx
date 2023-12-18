import { getServerSession } from 'next-auth'
import Container from './_components/containner'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { authOptions } from '@/lib/authOption'
import { redirect } from 'next/navigation'

export default async function Browse_Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  )
}
