import Link from 'next/link'

export const BlogCard = ({ title, description, contentPath, publishDate, estimatedTimeToRead }) => {
  return (
      <div className={`w-[95vw] h-fit rounded-lg p-4 pb-6 border-2 border-[rgb(64,44,120)] border-b-0 border-r-0 bg-gradient-to-br from-55% from-transparent  to-purple-950`}>
        <Link className='mb-2 flex flex-col gap-2' href={contentPath}>
          <div className='text-lg italic'>
            {title}
          </div>
          <div className='text-sm'>
            {description}
          </div>
        </Link>
      </div>
  )
}

export default BlogCard