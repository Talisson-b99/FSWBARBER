import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs'
import { db } from '@/app/_lib/prisma'
import { MapPin, Star } from 'lucide-react'
import Image from 'next/image'

async function getBarberDetails(barberId: string) {
  const barber = await db.barbershop.findUnique({
    where: {
      id: barberId,
    },
  })
  return barber
}

const BarberDetails = async ({ params }: { params: { barberId: string } }) => {
  const barber = await getBarberDetails(params.barberId)

  if (!barber) return null
  return (
    <div>
      <Card className="pb-3">
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
            <p className="text-gray-25 flex items-center gap-2 text-xs">
              <Star size={16} fill="#8162FF" color="#8162FF" />
              5,0 (889 avaliações)
            </p>
          </div>
        </CardContent>
      </Card>
      <Tabs className="mb-10 mt-6 px-5">
        <TabsList className="gap-2.5 bg-transparent">
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
        {/* <TabsContent value="infos">

        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export default BarberDetails
