import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const BookingItem = () => {
  return (
    <Card className="rounded-lg">
      <CardContent className="flex justify-between py-0 pl-3 pr-6">
        <div className="py-3">
          <Badge className="bg-violet-1000 text-xs font-bold text-primary ">
            Confirmado
          </Badge>
          <h2 className="mt-3 font-bold">Corte de Cabelo</h2>
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="flex h-6 w-6 items-center">
              <AvatarImage
                src="/barbearia.png"
                alt="barbearia"
                className="object-cover"
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-6">
          <p className="text-xs">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-xs">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
