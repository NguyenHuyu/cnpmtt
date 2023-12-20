import { db } from '@/lib/database'
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
export async function GET(request: Request) {
  const users = await db.loaiPhong.findMany()
  
  return NextResponse.json(users, { status: 200 })
}
