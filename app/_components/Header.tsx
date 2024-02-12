'use client'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { CalendarDays, CircleUserRound, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './Side-menu'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { data } = useSession()
  const router = useRouter()
  const handleLogintClick = async () => {
    await signIn('google')
  }

  const handleLogoutClick = async () => {
    await signOut()
    router.refresh()
  }
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between xl:px-32">
          <Link href={'/ '}>
            <Image
              src="/logo.png"
              alt="fsw barber"
              width={105}
              height={20}
              className="h-5"
            />
          </Link>
          <div className=" hidden items-center gap-6 xl:flex">
            <div className="flex items-center gap-2">
              <CalendarDays strokeWidth={2} size={16} />
              <Link href="/bookings">
                <h3 className="text-sm font-bold">Agendamentos</h3>
              </Link>
            </div>

            <div>
              <Dialog>
                <DialogTrigger asChild>
                  {data?.user ? (
                    <div className="flex cursor-pointer items-center gap-2">
                      <Avatar>
                        <AvatarImage src={data?.user.image!} />
                        <AvatarFallback>
                          {data.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold">{data.user.name}</span>
                    </div>
                  ) : (
                    <Button className="flex items-center gap-2 text-sm font-bold">
                      {' '}
                      <CircleUserRound strokeWidth={2} size={16} />
                      Perfil
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent className="w-80 rounded-[16px] border-0 p-5">
                  {data?.user ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="font-bold">Sair</DialogTitle>
                        <DialogDescription className=" pb-5 pt-2 text-gray-25">
                          Deseja sair da plataforma?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center gap-2.5">
                        <DialogClose asChild>
                          <Button className="w-full" variant="secondary">
                            Cancelar
                          </Button>
                        </DialogClose>
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={handleLogoutClick}
                        >
                          Sair
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Faça login na platoforma</DialogTitle>
                        <DialogDescription className="pb-5 pt-2">
                          Conecte-se usando sua conta do Google.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mx-auto ">
                        <Button
                          variant={'outline'}
                          className="flex w-28 items-center gap-2"
                          onClick={handleLogintClick}
                        >
                          Google
                        </Button>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="xl:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent className="p-0 ">
                <SideMenu />
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
