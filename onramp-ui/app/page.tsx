import { OnrampForm } from '@/components/onramp/onramp-form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { type OnrampSearchParams } from '@/types'

interface PageProps {
  searchParams: OnrampSearchParams
}

export default function Page({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-background sm:flex sm:items-center sm:justify-center">
      <main className="w-full sm:container sm:mx-auto sm:max-w-md h-screen sm:h-auto px-0 py-0 sm:px-4 sm:py-8 flex flex-col sm:block">
        <Card className="shadow-sm sm:border sm:shadow-sm border-0 shadow-none flex-1 sm:flex-none flex flex-col sm:block">
          <CardHeader className="text-center pb-6 pt-8 sm:pt-6 px-4">
            <div className="mb-8">
              <img 
                src="https://metakeep.xyz/images/metakeep-cryptography-light-cropped.png" 
                alt="MetaKeep" 
                className="h-9 max-w-[200px] mx-auto object-contain"
              />
            </div>
            <h2 className="text-xl font-medium tracking-tight">Fund your account</h2>
          </CardHeader>

          <CardContent className="space-y-6 flex-1 sm:flex-none flex flex-col sm:block px-4">
            <OnrampForm searchParams={searchParams} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}