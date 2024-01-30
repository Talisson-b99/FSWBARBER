import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="fsw barber"
          width={105}
          height={20}
          className="h-5"
        />
        <Button size="icon" variant="ghost">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
