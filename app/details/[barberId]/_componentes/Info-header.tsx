'use client'
import SideMenu from '@/app/_components/Side-menu'
import { Button } from '@/app/_components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/app/_components/ui/sheet'
import { ChevronLeftIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const InfoHeader = () => {
  return (
    <div className="flex justify-between">
      <Link href={'/'}>
        <Button size="icon" variant="secondary">
          <ChevronLeftIcon size={20} />
        </Button>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="secondary">
            <MenuIcon size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0">
          <SideMenu />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default InfoHeader
