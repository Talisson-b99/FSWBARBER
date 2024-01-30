import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/app/_components/ui/table'
import { TabsContent } from '@/app/_components/ui/tabs'
import { Smartphone } from 'lucide-react'

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

const InfoDetail = () => {
  return (
    <TabsContent value="infos">
      <h3 className="text-gray-25 mt-6 px-5 text-xs font-bold uppercase">
        Sobre nós
      </h3>
      <Card className="border-0 border-b bg-transparent px-5">
        <CardContent className="px-0 pb-6 pt-3">
          <p className="text-sm">
            Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 border-b bg-transparent px-5">
        <CardContent className="flex flex-col gap-2.5 px-0 py-6">
          <div className="flex items-center">
            <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
            (11) 98204-5108
            <Button className="ml-auto h-9" variant="secondary">
              Copiar
            </Button>
          </div>
          <div className="flex items-center">
            <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
            (11) 98204-5233
            <Button className="ml-auto h-9" variant="secondary">
              Copiar
            </Button>
          </div>
        </CardContent>
      </Card>
      <Table className="mt-[19px]">
        <TableBody>
          {hours.map((hour) => (
            <TableRow className="border-0" key={hour.day}>
              <TableCell className="text-gray-25 text-sm">{hour.day}</TableCell>
              <TableCell className="text-end text-sm">{hour.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  )
}

export default InfoDetail
