import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Barbershop } from '@prisma/client'
import { Star } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

type BarbershoItemProps = {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershoItemProps) => {
  return (
    <Link href={`/details/${barbershop.id}`}>
      <Card className="min-w-full max-w-full rounded-2xl">
        <CardContent className="relative p-1">
          <div className=" absolute left-2 top-2 z-10">
            <Badge className="flex items-center gap-1 bg-[#221c3d]/70">
              <Star size={10} fill="#8162FF" color="#8162FF" />
              <p className="text-xs font-bold">5.0</p>
            </Badge>
          </div>
          <div className="relative h-[159px] w-full">
            <Image
              src={barbershop.imageUrl}
              height={0}
              width={0}
              sizes="100vw"
              fill
              className="mb-2  rounded-2xl"
              style={{
                objectFit: 'cover',
              }}
              alt={barbershop.name}
            />
          </div>
          <div className="px-2">
            <h2 className="overflow-hidden text-ellipsis text-nowrap  font-bold">
              {barbershop.name}
            </h2>
            <p className="mb-3 mt-1 overflow-hidden text-ellipsis text-nowrap text-xs  text-gray-25">
              {barbershop.address}
            </p>
            <Button
              className=" mb-2 w-full text-sm font-bold"
              variant="secondary"
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BarbershopItem
