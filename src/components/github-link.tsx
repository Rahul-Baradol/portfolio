export function GithubLink() {
    return (
        <a
            href="https://github.com/Rahul-Baradol"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 absolute bottom-6 right-4 opacity-50 transition-opacity duration-300 w-9 h-9 rounded-full overflow-hidden hover:opacity-100"
        >
            <img
                className="w-10 object-cover"
                src="/github.webp"
                alt=""
            />
        </a>
    )
}