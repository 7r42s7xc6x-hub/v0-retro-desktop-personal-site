"use client"

// ============================================
// EASY EDIT SECTION - Change your podcast episodes here!
// ============================================

const PODCAST_DESCRIPTION =
  "Conversations with thinkers on progress, science, philosophy, economics and the evolving human condition."

const PLATFORM_LINKS = [
  { platform: "YouTube", url: "https://youtube.com/@salvadorpodcast" },
  { platform: "Apple Podcasts", url: "https://podcasts.apple.com/gb/podcast/salvador-podcast/id1798566809" },
  { platform: "Spotify", url: "https://open.spotify.com/show/481b0TinpbQZSXc8BQEk2N?si=9d7a5cfd3f7841f8" },
]

const EPISODES = [
  {
    guest: "Tyler Cowen",
    topic: "talent, effective altruism and religion",
    url: "https://www.progreshion.blog/p/tyler-cowen-talent-effective-altruism?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Sarah Fitz-Claridge",
    topic: "taking children seriously and freedom",
    url: "https://www.progreshion.blog/p/19-sarah-fitz-claridge-taking-children?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Scott Aaronson",
    topic: "quantum computing, AI and AGI progress",
    url: "https://www.progreshion.blog/p/18-scott-aaronson-quantum-computing?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Michael Huemer",
    topic: "free will, political anarchism and morality",
    url: "https://www.progreshion.blog/p/19-michael-huemer-free-will-political?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Brett Hall",
    topic: "the beginning of infinity, Popper and epistemology",
    url: "https://www.progreshion.blog/p/21-brett-hall-the-beginning-of-infinity?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "David Deutsch",
    topic: "the fabric of explanations, optimism and creativity",
    url: "https://www.progreshion.blog/p/23-david-deutsch-the-fabric-of-explanations?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Garett Jones",
    topic: "national IQ, immigration and less democracy",
    url: "https://www.progreshion.blog/p/22-garett-jones-national-iq-immigration?r=58frit&utm_campaign=post&utm_medium=web",
  },
  {
    guest: "Johan Norberg",
    topic: "global capitalism, open societies and degrowth",
    url: "https://www.progreshion.blog/p/johan-norberg",
  },
]

// ============================================
// Component Code (no need to edit below)
// ============================================

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "youtube":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "spotify":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      )
    case "apple podcasts":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.12 1.2-.59 1.54-.468.342-1.08.39-1.608.12-.468-.24-.78-.672-.864-1.176-.216-1.2-.72-2.208-1.584-3.084-1.2-1.224-2.76-1.848-4.536-1.788-1.68.06-3.12.72-4.236 1.932-.864.936-1.38 2.004-1.56 3.216-.06.504-.384.924-.852 1.14-.528.24-1.116.18-1.56-.156-.456-.336-.684-.924-.576-1.488.36-1.932 1.188-3.6 2.544-4.968 1.62-1.644 3.624-2.532 5.94-2.652.186-.012.374-.015.562-.015zm.126 4.1a5.25 5.25 0 014.26 2.244 5.16 5.16 0 01.96 3.756 1.406 1.406 0 01-.864 1.116c-.468.204-1.02.12-1.416-.204-.336-.276-.54-.672-.564-1.116a2.598 2.598 0 00-.84-1.86 2.568 2.568 0 00-1.836-.684 2.532 2.532 0 00-1.8.756 2.532 2.532 0 00-.744 1.812c-.024.444-.24.852-.588 1.116a1.38 1.38 0 01-1.428.156 1.4 1.4 0 01-.828-1.128 5.112 5.112 0 011.044-3.696 5.232 5.232 0 014.068-2.244l.288-.012.288-.012zm-.072 5.636c.876 0 1.596.72 1.596 1.596 0 .264-.06.516-.18.744l.012.012-.012.024-.012.024.012-.012a14.082 14.082 0 01-.576 1.5 51.92 51.92 0 01-.72 1.632c-.24.528-.456.984-.636 1.356l-.048.096-.012.012c-.216.384-.516.624-.912.624s-.696-.24-.912-.636l-.012-.012-.048-.096a37.68 37.68 0 01-.636-1.356 51.92 51.92 0 01-.72-1.632 14.082 14.082 0 01-.576-1.5l.012.012-.012-.024-.012-.024.012-.012a1.596 1.596 0 011.416-2.328z" />
        </svg>
      )
    default:
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "youtube":
      return "bg-[#FF0000] hover:bg-[#cc0000]"
    case "spotify":
      return "bg-[#1DB954] hover:bg-[#1aa34a]"
    case "apple podcasts":
      return "bg-[#9933CC] hover:bg-[#7a29a3]"
    default:
      return "bg-[#4a4a4a] hover:bg-[#3a3a3a]"
  }
}

export function TalksContent() {
  return (
    <div className="space-y-4 font-mono text-sm pr-4 overflow-hidden">
      <h2 className="text-lg font-bold tracking-wide border-b-2 border-black pb-2">[ PODCAST ]</h2>

      <p className="text-xs text-gray-700 leading-relaxed">{PODCAST_DESCRIPTION}</p>

      {/* Platform Links */}
      <div className="flex flex-wrap gap-2">
        {PLATFORM_LINKS.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs text-white rounded transition-colors ${getPlatformColor(link.platform)}`}
          >
            {getPlatformIcon(link.platform)}
            <span>{link.platform}</span>
          </a>
        ))}
      </div>

      {/* Episode List */}
      <div className="space-y-3">
        {EPISODES.map((episode, index) => (
          <a
            key={index}
            href={episode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-[#2a2a2a] bg-[#f5f5f0] p-3 hover:bg-[#e8e8e0] transition-colors cursor-pointer"
          >
            <h3 className="font-bold text-sm leading-snug text-blue-700 hover:text-blue-900">{episode.guest}</h3>
            <p className="text-xs text-gray-600 mt-1">{episode.topic}</p>
          </a>
        ))}
      </div>

      {/* Archive Link */}
      <p className="text-xs text-gray-600 pt-2 border-t border-gray-300">
        Full archive at{" "}
        <a
          href="https://progreshion.blog/podcast"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          progreshion.blog/podcast
        </a>
      </p>
    </div>
  )
}
