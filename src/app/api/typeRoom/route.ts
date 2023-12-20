import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request: Request) {
  const users = await prisma.loaiPhong.findMany()
  return NextResponse.json(users, { status: 200 })
}
