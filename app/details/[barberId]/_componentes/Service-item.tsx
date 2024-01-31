'use client'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { TabsContent } from '@/app/_components/ui/tabs'
import { Service } from '@prisma/client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

type ServiceItemProps = {
  service: Service
  isAuthenticated?: string | null
}

function formatPrice(price: any) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn('google')
    }
  }
  return (
    <TabsContent value="services">
      <Card className="mx-5 mb-3 rounded-[8px]">
        <CardContent className="p-3">
          <div className="w-ful flex gap-3">
            <div className="relative max-h-28 min-h-28 min-w-28 max-w-28">
              <Image
                src={service.imageUrl}
                alt={service.name}
                sizes="100vw"
                fill
                className="rounded-[8px] object-cover"
                width={0}
                height={0}
              />
            </div>
            <div className="flex w-full flex-col">
              <div>
                <h2 className="text-sm font-bold">{service.name}</h2>
                <p className="mt-1 text-sm text-gray-25">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-1 items-end">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-bold text-primary">
                    {formatPrice(service.price!)}
                  </span>
                  <Button
                    onClick={handleBookingClick}
                    variant="secondary"
                    className="text-sm font-bold"
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
export default ServiceItem
