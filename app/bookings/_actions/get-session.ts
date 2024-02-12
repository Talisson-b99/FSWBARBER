'use server'

import { authOptions } from '@/app/_lib/auth'
import { getServerSession } from 'next-auth'

export const getSession = async () => {
  return await getServerSession(authOptions)
}
