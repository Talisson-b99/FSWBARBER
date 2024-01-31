'use client'

import React from 'react'
import { SheetHeader, SheetTitle } from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  CalendarDays,
  CircleUserRound,
  Home,
  LogIn,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const SideMenu = () => {
  const { status, data } = useSession()

  const handleLogoutClick = async () => {
    await signOut()
  }

  const handleLoginClick = async () => {
    await signIn('google')
  }

  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <>
          <div className="flex items-center gap-3 px-5 py-6">
            <Avatar>
              <AvatarImage className="h-10 w-10" src={data.user.image!} />
              <AvatarFallback>
                {data.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-bold">{data.user?.name}</h2>
            <Button
              onClick={handleLogoutClick}
              size="icon"
              variant="outline"
              className="ml-auto"
            >
              <LogOut size={20} />
            </Button>
          </div>
          <div className="px-5">
            <Link href="/">
              <Button
                variant="outline"
                className="mb-3 flex h-9 w-full items-center justify-start  gap-2"
              >
                <Home strokeWidth={1} size={16} />
                Início
              </Button>
            </Link>

            <Button
              variant="outline"
              className="flex h-9 w-full items-center justify-start gap-2"
            >
              <CalendarDays strokeWidth={1} size={16} />
              Agendamentos
            </Button>
          </div>
        </>
      ) : (
        <div className="px-5">
          <div className="flex items-center gap-2 py-6">
            <CircleUserRound
              strokeWidth={2}
              className="h-10 w-10 text-secondary"
            />
            <h2>Olá.Faça seu login!</h2>
          </div>

          <Button
            onClick={handleLoginClick}
            variant="secondary"
            className="flex h-9 w-full items-center justify-start gap-2"
          >
            <LogIn strokeWidth={1} size={16} />
            Fazer Login
          </Button>

          <Button
            variant="outline"
            className="mb-3 mt-6 flex h-9 w-full items-center justify-start gap-2"
          >
            <Home strokeWidth={1} size={16} />
            Início
          </Button>
        </div>
      )}
    </>
  )
}

export default SideMenu
