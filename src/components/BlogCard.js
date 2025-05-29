import Link from 'next/link'

export const BlogCard = ({ title, description, contentPath, publishDate, estimatedTimeToRead }) => {
  return (
      <div className={`w-[95vw] h-fit rounded-lg p-4 pb-3 border-2 border-[rgb(64,44,120)] border-b-0 border-r-0 bg-gradient-to-br from-55% from-transparent  to-purple-950`}>
        <Link className='mb-2 flex flex-col gap-4' href={contentPath}>
          <div className='h-fit w-fit flex flex-col gap-2'>
            <div className='text-lg italic'>
              {title}
            </div>
            <div className='text-sm'>
              {description}
            </div>
          </div>
          <div className='w-fit h-fit text-[0.8rem]'>
          {publishDate} 
          </div>
        </Link>
      </div>
  )
}

export default BlogCard