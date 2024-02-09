import { db } from '@/app/_lib/prisma'

import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs'

import { MapPin, Smartphone, Star } from 'lucide-react'

import Image from 'next/image'

import InfoDetail from './_componentes/Info-detail'
import ServiceItem from './_componentes/Service-item'

import InfoHeader from './_componentes/Info-header'
import { getServerSession } from 'next-auth'
import Search from '@/app/(home)/_components/Search'
import { authOptions } from '@/app/_lib/auth'
import Header from '@/app/_components/Header'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/app/_components/ui/table'

async function getBarberDetails(barberId: string) {
  const barber = await db.barbershop.findUnique({
    where: {
      id: barberId,
    },
    include: {
      services: true,
    },
  })
  return barber
}

const hours = [
  {
    day: 'Segunda',
    hours: 'Fechado',
  },
  {
    day: 'Terça-Feira',
    hours: '09:00 - 21:00',
  },
  {
    day: 'Quarta-Feira',
    hours: '09:00 - 21:00',
  },
  {
    day: 'Quinta-Feira',
    hours: '09:00 - 21:00',
  },
  {
    day: 'Sexta-Feira',
    hours: '09:00 - 21:00',
  },
  {
    day: 'Sábado',
    hours: '08:00 - 17:00',
  },
  {
    day: 'Domingo',
    hours: 'Fechado',
  },
]

const BarberDetails = async ({ params }: { params: { barberId: string } }) => {
  const barber = await getBarberDetails(params.barberId)
  const session = await getServerSession(authOptions)

  if (!barber) return null
  return (
    <div className=" flex-col xl:flex ">
      <div className="hidden xl:relative xl:flex xl:flex-col ">
        <Header />
        <div className="absolute left-[300px] top-[30%] z-10 min-w-[550px] ">
          <Search />
        </div>
      </div>
      <div className="relative pb-12 xl:grid xl:grid-cols-3 xl:gap-10 xl:px-32">
        <div className="absolute left-0 right-0 z-10 px-5 py-6 xl:hidden">
          <InfoHeader />
        </div>

        <Card className="bg-transparent pb-3 xl:col-span-2 xl:mt-10 xl:border-0 ">
          <CardContent className="p-0">
            <div className="relative h-60 w-full xl:h-[485px]  xl:rounded-[8px]">
              <Image
                src={barber?.imageUrl}
                width={0}
                height={0}
                fill
                sizes="100vh"
                style={{ objectFit: 'cover' }}
                className="xl:rounded-[8px]"
                alt={barber?.name}
              />
            </div>

            <div className="mt-3 w-full px-5 xl:mt-5 xl:flex xl:justify-between xl:px-0">
              <div>
                <h2 className="text-xl font-bold xl:text-2xl">{barber.name}</h2>
                <p className="mb-2 mt-3 flex items-center gap-2 text-xs">
                  <MapPin size={16} color="#8162FF" />
                  {barber.address}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-25 xl:flex-col xl:justify-center xl:rounded-[8px]  xl:bg-card xl:px-5 xl:py-2.5 xl:text-white">
                <p className="flex items-center gap-2 xl:text-xl">
                  <Star size={16} fill="#8162FF" color="#8162FF" />
                  5,0
                </p>
                <span>(889 avaliações)</span>
              </div>
            </div>
            <div className="hidden xl:mt-10 xl:flex xl:flex-col">
              <h3 className="mb-3 text-sm font-bold text-gray-25">Serviços</h3>
              <div className="grid grid-cols-2 gap-5">
                {barber.services.map((service) => (
                  <ServiceItem
                    isAuthenticated={session?.user?.name}
                    barbershop={barber}
                    service={service}
                    key={service.id}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className=" hidden xl:mt-10 xl:flex xl:h-fit xl:flex-col xl:rounded-[16px] xl:bg-card">
          <div className="relative my-5 h-[180px] w-full px-5">
            <Image
              src="/barber-shop.png"
              fill
              alt={barber.name}
              className=" object-cover px-5"
            />
            <div className="absolute bottom-4 left-0 w-full px-8">
              <Card className="w-full rounded-[8px]">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src={barber.imageUrl}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{barber.name}</h2>
                      <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-gray-25">
                        {barber.address}{' '}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="px-5">
            <h3 className="mb-2.5 text-sm font-bold">SOBRE NÓS</h3>
            <p className="text-sm text-gray-25">
              Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
              equipe de mestres barbeiros transforma cortes de cabelo e barbas
              em obras de arte. Em um ambiente acolhedor, promovemos confiança,
              estilo e uma comunidade unida.
            </p>
          </div>
          <div className="mx-5 mt-5 space-y-2.5 border-y border-solid border-secondary py-5">
            <div className="flex items-center">
              <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
              (11) 98204-5108
              <Button className="ml-auto h-9" variant="secondary">
                Copiar
              </Button>
            </div>
            <div className="flex items-center">
              <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
              (11) 98204-5108
              <Button className="ml-auto h-9" variant="secondary">
                Copiar
              </Button>
            </div>
          </div>
          <div className="mx-5 border-b border-solid border-secondary pb-5">
            <Table className="mt-[19px]">
              <TableBody>
                {hours.map((hour) => (
                  <TableRow className="border-0" key={hour.day}>
                    <TableCell className="px-0 text-sm text-gray-25">
                      {hour.day}
                    </TableCell>
                    <TableCell className="px-0 text-end text-sm">
                      {hour.hours}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mx-5 my-10 flex items-center justify-between">
            <p className="text-sm">Em parceria com</p>
            <Image
              src={'/logo.png'}
              width={130}
              height={22}
              alt="logo com escrita fsw barber"
            />
          </div>
        </div>
        <div className="mt-6 px-5 xl:hidden">
          <Search />
        </div>
        <Tabs className="mb-10 mt-6 xl:hidden" defaultValue="services">
          <TabsList className="gap-2.5 bg-transparent px-5">
            <TabsTrigger
              value="services"
              className="h-9 border border-solid border-[#26272B] text-sm font-bold text-white data-[state=active]:bg-primary"
            >
              Serviços
            </TabsTrigger>
            <TabsTrigger
              value="infos"
              className="h-9 border border-solid border-[#26272B] text-sm font-bold text-white data-[state=active]:bg-primary"
            >
              Informações
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="services">
              {barber.services.map((service) => (
                <ServiceItem
                  isAuthenticated={session?.user?.name}
                  barbershop={barber}
                  service={service}
                  key={service.id}
                />
              ))}
            </TabsContent>
          </div>
          <InfoDetail />
        </Tabs>
      </div>
    </div>
  )
}

export default BarberDetails
