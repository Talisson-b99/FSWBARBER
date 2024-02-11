import { redirect } from 'next/navigation'
import BarbershopItem from '../(home)/_components/Barbershop-item'
import Search from '../(home)/_components/Search'
import Header from '../_components/Header'
import { db } from '../_lib/prisma'

interface BarbershopsProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsProps) => {
  if (!searchParams.search) {
    redirect('/')
  }
  const Barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })
  return (
    <>
      <div className="xl:relative">
        <Header />
      </div>
      <div className="px-5 py-6">
        <div className="xl:absolute xl:left-[300px] xl:top-[3.5%]  xl:z-10 xl:min-w-[550px] ">
          <Search />
        </div>
        <div className="xl:px-32">
          <h1 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
            Resultados para &ldquo;{searchParams.search}&ldquo;
          </h1>

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
            {Barbershops.map((Barbershop) => (
              <div className="w-full" key={Barbershop.id}>
                <BarbershopItem barbershop={Barbershop} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
