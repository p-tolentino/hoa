import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

const Settings = async () => {
  return (
    <div>
      <Heading title='Settings' description='Manage your system settings' />
      <Separator className='mt-4 mb-6' />
    </div>
  )
}

export default Settings
