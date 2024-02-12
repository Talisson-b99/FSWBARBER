'use client'
import BookingItem from '../_components/Booking-item'
import Header from '../_components/Header'
// import { redirect } from 'next/navigation'
import BookingItemDesktop from './components/BookingItemDesktop'
import Infobooking from './components/info-booking'

import { Drawer, DrawerContent, DrawerTrigger } from '../_components/ui/drawer'
import { useEffect, useState } from 'react'
import { getBookingConfirmed } from './_actions/get-booking-confirmed'
import { getBookingFinished } from './_actions/get-booking-finished'
import { Decimal } from '@prisma/client/runtime/library'
import { getSession } from './_actions/get-session'
import { Loader2 } from 'lucide-react'

type Props = {
  service: {
    // import { getServerSession } from 'next-auth'
    id: string
    name: string
    price: Decimal
    barbershopId: string
    description: string
    imageUrl: string
  }
  barbershop: {
    id: string
    name: string
    address: string
    imageUrl: string
  }
} & {
  id: string
  userId: string
  serviceId: string
  babershopId: string
  date: Date
}

const Bookings = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([] as any)
  const [fineshedBookings, setFineshedBookings] = useState([] as any)
  const [infoService, setInfoService] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)

  const getConfirmedBookings = async () => {
    try {
      setIsLoading(true)
      const sessionCurrent = await getSession()

      const response = await getBookingConfirmed(
        (sessionCurrent?.user as any).id,
      )
      setConfirmedBookings(response)
    } catch (error) {
      console.error('Erro ao obter reservas confirmadas:', error)
    }
  }

  const getFinishedBookings = async () => {
    try {
      const sessionCurrent = await getSession()
      const response = await getBookingFinished(
        (sessionCurrent?.user as any).id,
      )
      setFineshedBookings(response)
    } catch (error) {
      console.error('Erro ao obter reservas confirmadas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteService = (id: any) => {
    return setConfirmedBookings(
      confirmedBookings.filter(
        (confirmedBooking: any) => confirmedBooking.id !== id,
      ),
    )
  }

  useEffect(() => {
    getFinishedBookings()
  }, [])

  useEffect(() => {
    getConfirmedBookings()
  }, [])

  return (
    <div className="pb-24">
      <Header />
      <div className="hidden xl:mt-10 xl:grid xl:grid-cols-2 xl:gap-10 xl:px-32">
        <div>
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          {isLoading && (
            <div>
              <Loader2 size={40} className="mx mt-10 animate-spin" />
            </div>
          )}
          {confirmedBookings.length > 0 && (
            <div>
              <h3 className="mb-3 mt-5 text-xs font-bold uppercase text-gray-25">
                Confirmados
              </h3>
              <Drawer>
                <div className="space-y-3">
                  {confirmedBookings?.map((confirmedBooking: Props) => (
                    <>
                      <DrawerTrigger
                        onClick={() => setInfoService(confirmedBooking)}
                        key={confirmedBooking.id}
                        asChild
                      >
                        <BookingItemDesktop booking={confirmedBooking} />
                      </DrawerTrigger>
                    </>
                  ))}
                  <DrawerContent className=" w-[600px] border-0">
                    <div>
                      <Infobooking
                        deleteService={deleteService}
                        booking={infoService}
                      />
                    </div>
                  </DrawerContent>
                </div>
              </Drawer>
            </div>
          )}
          {fineshedBookings.length > 0 && (
            <div>
              <h3 className="mb-3 mt-5 text-xs font-bold uppercase text-gray-25">
                Finalizados
              </h3>
              <Drawer>
                <div className="space-y-3">
                  {fineshedBookings?.map((fineshedBooking: Props) => (
                    <>
                      <DrawerTrigger
                        onClick={() => setInfoService(fineshedBooking)}
                        key={fineshedBooking.id}
                        asChild
                      >
                        <BookingItemDesktop booking={fineshedBooking} />
                      </DrawerTrigger>
                    </>
                  ))}
                  <DrawerContent className=" w-[600px] border-0">
                    <div>
                      <Infobooking
                        deleteService={deleteService}
                        booking={infoService}
                      />
                    </div>
                  </DrawerContent>
                </div>
              </Drawer>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 xl:hidden">
        <h1 className="mt-6 text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
              Confirmados
            </h3>
            <div className="flex flex-col gap-3">
              {confirmedBookings?.map((booking: Props) => (
                <BookingItem
                  deleteService={deleteService}
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          </>
        )}
        {fineshedBookings.length > 0 && (
          <>
            <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
              Finalizados
            </h3>
            <div className="flex flex-col gap-3">
              {fineshedBookings.map((booking: Props) => (
                <BookingItem
                  deleteService={deleteService}
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Bookings
