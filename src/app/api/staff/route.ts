import { db } from '@/lib/database'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  if (query) {
    const data = await db.nhanVien.findUnique({
      where: {
        id: Number(query)
      }
    })
    return Response.json(data)
  } else {
    const users = await db.nhanVien.findMany()
    return Response.json(users)
  }
}

export async function POST(request: Request) {
  const data = await request.json()
  await db.nhanVien.create({
    data
  })

  return Response.json({
    message: 'OK',
    status: 201
  })
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')

  const data = await request.json()
  await db.nhanVien.update({
    where: {
      id: Number(query)
    },
    data
  })

  return Response.json({
    message: 'OK',
    status: 200
  })
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')

  await db.nhanVien.delete({
    where: {
      id: Number(query)
    }
  })

  return Response.json({
    message: 'OK',
    status: 200
  })
}
