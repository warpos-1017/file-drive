import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/lib/uploadthing'

type FileUploadProps = {
  apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: FileUploadProps) => {
  const type = value?.split('.').pop()

  if (value) {
    return (
      <div className='flex flex-col justify-center items-center'>
        {type !== 'pdf' ? (
          <div className='relative w-40 h-40'>
            <Image
              src={value}
              alt='uploaded image'
              className='object-contain'
              fill
            />
          </div>
        ) : (
          <div className='relative flex items-center'>
            <FileIcon />
            <a
              href={value}
              target='_blank'
              rel='noopener_noreferrer'
              className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
            >
              View PDF
            </a>
          </div>
        )}
        <Button variant='ghost' className='' onClick={() => onChange('')}>
          <X className='h-4 w-4 mr-2' />
          Remove Logo
        </Button>
      </div>
    )
  }
  return (
    <div className='w-full bg-muted/30'>
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => onChange(res?.[0].url)}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
      />
    </div>
  )
}

export default FileUpload
