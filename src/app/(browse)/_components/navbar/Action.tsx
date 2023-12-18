'use client'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/authOption'
import { Clapperboard } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Action = () => {
  const user: any = useSession()
  console.log('user', user)
  return (
    <div className='flex items-center justify-end gap-x-2 ml-4 lg:ml-0'>
      {user && (
        <Button size='sm' variant='primary' onClick={() => signOut()}>
          Logout
        </Button>
      )}
      {!!user && (
        <div className=' flex items-center gap-x-4'>
          <Button
            size='sm'
            variant='ghost'
            className='to-muted-foreground hover:text-primary'
            asChild
          >
            <span className='hidden lg:block'>
              {user.data?.user?.token?.username}
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Action
