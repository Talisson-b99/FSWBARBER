import { db } from '@/app/_lib/prisma'

import { Card, CardContent } from '@/app/_components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/app/_components/ui/tabs'

import { MapPin, Star } from 'lucide-react'

import Image from 'next/image'

import InfoDetail from './_componentes/Info-detail'
import ServiceItem from './_componentes/Service-item'

async function getBarberDetails(barberId: string) {
  const barber = await db.barbershop.findUnique({
    where: {
      id: barberId,
    },
  })
  return barber
}

async function getServicesToBarber(barberId: string) {
  const services = await db.service.findMany({
    where: {
      barbershopId: barberId,
    },
  })
  return services
}

const BarberDetails = async ({ params }: { params: { barberId: string } }) => {
  const barber = await getBarberDetails(params.barberId)
  const services = await getServicesToBarber(params.barberId)

  if (!services) return null
  if (!barber) return null
  return (
    <div className="pb-12">
      <Card className="bg-transparent pb-3">
        <CardContent className="p-0">
          <div className="relative h-60 w-full">
            <Image
              src={barber?.imageUrl}
              width={0}
              height={0}
              fill
              sizes="100vh"
              style={{ objectFit: 'cover' }}
              alt={barber?.name}
            />
          </div>
          <div className="mt-3 px-5">
            <h2 className="text-xl font-bold">{barber.name}</h2>
            <p className="mb-2 mt-3 flex items-center gap-2 text-xs">
              <MapPin size={16} color="#8162FF" />
              {barber.address}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-25">
              <Star size={16} fill="#8162FF" color="#8162FF" />
              5,0 (889 avaliações)
            </p>
          </div>
        </CardContent>
      </Card>
      <Tabs className="mb-10 mt-6" defaultValue="services">
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
          {services.map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
        </div>
        <InfoDetail />
      </Tabs>
    </div>
  )
}

export default BarberDetails
