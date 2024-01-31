"use client"
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { CalendarDays, CircleUserRound, Home, LogIn, LogOut, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'

const Header = () => {
  const {status, data} = useSession()

const handleLogoutClick = async () => {
  await signOut()
}

const handleLoginClick = async () => {
  await signIn("google")
}

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="fsw barber"
          width={105}
          height={20}
          className="h-5"
        />
        <Sheet>
          <SheetTrigger>
            <Button size="icon" variant="ghost">
                <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className='p-0'>
            <SheetHeader className='text-left border-b border-solid border-secondary p-5'>
              <SheetTitle>
                Menu
              </SheetTitle>
            </SheetHeader>

            {data?.user ? (
             <>
                 <div className="flex items-center gap-3 px-5 py-6">
                <Avatar>
                  <AvatarImage className='w-10 h-10' src={data.user.image!}/>
                  <AvatarFallback>{data.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className='font-bold'>{data.user?.name}</h2>
                <Button onClick={handleLogoutClick} size="icon" variant="outline" className='ml-auto'>
                    <LogOut size={20}/>
                </Button>
              </div>
               <div className='px-5'>
               <Link href='/'>
                <Button variant="outline" className='gap-2 items-center h-9 w-full flex justify-start  mb-3'>
                  <Home strokeWidth={1} size={16}/>
                    Início
                  </Button>
               </Link>
 
                 <Button variant="outline" className='h-9 w-full flex justify-start gap-2 items-center'>
                   <CalendarDays strokeWidth={1} size={16}/>
                   Agendamentos
                 </Button>
               </div>
             </>
            ): (
              <div className='px-5'>
              <div className='flex gap-2 items-center py-6'>
              <CircleUserRound strokeWidth={2} className='text-secondary w-10 h-10'/>
              <h2>Olá.Faça seu login!</h2>
            </div>

            <Button onClick={handleLoginClick} variant="secondary" className='h-9 w-full flex gap-2 items-center justify-start'>
              <LogIn strokeWidth={1} size={16}/>
              Fazer Login
            </Button>

            <Button variant="outline" className='gap-2 items-center h-9 w-full flex justify-start mt-6 mb-3'>
            <Home strokeWidth={1} size={16}/>
              Início
            </Button>

            </div>
            )}

          </SheetContent>
        </Sheet> 
      </CardContent>
    </Card>
  )
}

export default Header
