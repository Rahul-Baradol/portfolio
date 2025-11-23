interface SocialCardProps {
    image_url: string;
    website_url: string;
}

export function SocialCard({ image_url, website_url }: SocialCardProps) {
    return (
        <a href={website_url} target='_blank' className={`
                  border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden`}>
            <img
                width={35}
                height={35}
                src={image_url}
                alt=""
            />
        </a>
    )
}

interface SocialContainerProps {
    socials: SocialCardProps[];
}

export function SocialContainer({ socials } : SocialContainerProps) {
    return (
        <div className='fixed top-0 right-0 flex flex-col gap-4'>
            {
                socials.map((social) => {
                    return <SocialCard key={social.website_url} {...social} />
                })
            }
        </div>
    )
}