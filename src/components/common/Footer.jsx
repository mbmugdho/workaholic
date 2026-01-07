export default function Footer() {
  const github = import.meta.env.VITE_SOCIAL_GITHUB || '#'
  const linkedin = import.meta.env.VITE_SOCIAL_LINKEDIN || '#'
  const facebook = import.meta.env.VITE_SOCIAL_FACEBOOK || '#'

  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-10 mt-10">
      <aside>
        <div className="text-2xl font-bold">Workaholic</div>
        <p className="text-sm text-base-content/70 max-w-xl">
          Micro-tasking and earning platform for Workers, Buyers, and Admins.
        </p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="link link-hover"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="link link-hover"
          >
            LinkedIn
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noreferrer"
            className="link link-hover"
          >
            Facebook
          </a>
        </div>
      </nav>

      <aside>
        <p className="text-xs text-base-content/60">
          © {new Date().getFullYear()} Workaholic — All rights reserved.
        </p>
      </aside>
    </footer>
  )
}
