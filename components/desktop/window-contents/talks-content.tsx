"use client"

// ============================================
// EASY EDIT SECTION - Change your talks here!
// ============================================

const TALKS_CONFIG = [
  {
    title: "Timour on Endgame Podcast with Amanda Cassatt",
    links: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=QgyiZ4aJCKI&t=1s" },
      { platform: "Spotify", url: "https://open.spotify.com/episode/6OHZtD8qb34agsKUBuB2RG?si=6cd18e741cdc4a92" },
    ],
  },
  {
    title: "Talk at the Network State Conference 2025",
    links: [
      { platform: "X (Twitter)", url: "https://x.com/JoinEdgeCity/status/1975241403463557595?s=20" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=lc8XSxEx4bo" },
    ],
  },
  {
    title: "Audrey Tang - Plurality and Digital Democracy",
    links: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=LbuDzJh8Meg&t=4s" },
      { platform: "Spotify", url: "https://open.spotify.com/episode/7MBxAszAYDWL3evoN0DgXW?si=3e8708877da340a6" },
    ],
  },
  {
    title: "Appearance on Velocity of Change podcast",
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/episode/44IhHMmYlSHjiS2pwY94Tw?si=BJNwpavCSYOEYKHFfuUArw" },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=3kHy0kA3tas&list=PLhuBigpl7lqtJGEuwySnnvliDzSfooC0_&index=5",
      },
    ],
  },
  {
    title: "Cybernetic Communities (cyberEconomy Podcast)",
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/episode/0P0A6hw0C6RDrzyS8yYF59?si=ab488411daed4d35" },
    ],
  },
  {
    title: "Bankless Podcast: Edge City Patagonia",
    links: [
      { platform: "X (Twitter)", url: "https://x.com/timourxyz/status/1957847075674083399?s=20" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=h47CcgGTdEc" },
    ],
  },
  {
    title: "Green Pill Podcast: Network Nations - Entanglement, Building Voluntary Interdependencies",
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/episode/646H5fe3lrQ5EwdhRQ0DOx?si=336c3dfad8394ffe" },
    ],
  },
  {
    title: "Conversation with Glen Weyl: Network Societies, Civic Tech & Democracy",
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/episode/6sl9s5S3DT21CIGFTSBd4E?si=23ffd819309a42de" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=B9RQlwyeYCY&t" },
    ],
  },
]

// ============================================
// SALVADOR PODCAST EPISODES
// ============================================

const PODCAST_EPISODES = [
  {
    guest: "Tyler Cowen",
    topic: "talent, effective altruism and religion",
    links: {
      youtube: "https://youtu.be/7yLsjSPBziA",
      apple: "https://podcasts.apple.com/us/podcast/tyler-cowen-talent-effective-altruism-and-religion/id1798566809?i=1000745622679",
      spotify: "https://open.spotify.com/episode/5G1fjiWwKyycY3SFEFa4XU",
    },
  },
  {
    guest: "Sarah Fitz-Claridge",
    topic: "taking children seriously and freedom",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/16-sarah-fitz-claridge-taking-children-seriously-and/id1798566809?i=1000727664474",
      spotify: "https://open.spotify.com/episode/5XgMyUnFFMRjgzx4d34XFW",
    },
  },
  {
    guest: "Scott Aaronson",
    topic: "quantum computing, AI and AGI progress",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/15-scott-aaronson-quantum-computing-ai-and-agi-progress/id1798566809?i=1000722234342",
      spotify: "https://open.spotify.com/episode/6pC5coCpc5Lp7WCdoNdCuI",
    },
  },
  {
    guest: "Michael Huemer",
    topic: "free will, political anarchism and morality",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/14-michael-huemer-free-will-political-anarchism-and/id1798566809?i=1000718869770",
      spotify: "https://open.spotify.com/episode/1KjVgVwIBMfJGlD5gfTXmZ",
    },
  },
  {
    guest: "Brett Hall",
    topic: "the beginning of infinity, Popper and epistemology",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/13-brett-hall-the-beginning-of-infinity/id1798566809?i=1000716305521",
      spotify: "https://open.spotify.com/episode/3NkQjYr6lJzKwMfBqXvDpH",
    },
  },
  {
    guest: "David Deutsch",
    topic: "the fabric of explanations, optimism and creativity",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/12-david-deutsch-the-fabric-of-explanations/id1798566809?i=1000714346642",
      spotify: "https://open.spotify.com/episode/2WpLmNqR8cKzXvT4sFbYeJ",
    },
  },
  {
    guest: "Garett Jones",
    topic: "national IQ, immigration and less democracy",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/11-garett-jones-national-iq-immigration-and-less-democracy/id1798566809?i=1000713298211",
      spotify: "https://open.spotify.com/episode/4MpXkRsT9nLzYcU7vGwBqA",
    },
  },
  {
    guest: "Johan Norberg",
    topic: "global capitalism, open societies and degrowth",
    links: {
      youtube: "https://youtube.com/@salvadorpodcast",
      apple: "https://podcasts.apple.com/us/podcast/10-johan-norberg-global-capitalism-open-societies-and/id1798566809?i=1000712420387",
      spotify: "https://open.spotify.com/episode/7LqZpWtV2mKxNcS6uHdFrE",
    },
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
    case "apple":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587.136.136.15.36.028.51a11.063 11.063 0 00-2.01 6.39c0 2.543.886 4.931 2.372 6.818.122.158.1.38-.05.517-1.64 1.393-3.59 2.066-5.696 2.066-1.266 0-2.46-.26-3.55-.72-.204-.086-.43-.086-.634 0a8.313 8.313 0 01-2.795.517c-2.29 0-4.21-.837-5.692-2.41-.077-.079-.093-.188-.058-.295.19-.521.351-1.052.48-1.59.15-.62.253-1.228.31-1.809.03-.293.153-.58.356-.78a8.065 8.065 0 001.667-2.45c.52-1.03.838-2.196.838-3.549 0-2.135-.744-4.01-1.97-5.42-.162-.186-.128-.48.072-.627C4.508 3.26 6.632 2.568 8.85 2.568c.983 0 1.934.149 2.852.41.186.055.385.055.571 0a9.77 9.77 0 01.593-.157v-.253zm.653 1.215c-.185.061-.375.12-.568.174a.435.435 0 01-.255-.001 10.39 10.39 0 00-2.894-.388c-1.778 0-3.48.532-4.915 1.516l-.067.054c1.014 1.449 1.616 3.22 1.616 5.155 0 1.478-.353 2.764-.936 3.912-.4.791-.912 1.521-1.51 2.172a4.1 4.1 0 00-.143.158c-.056.591-.149 1.2-.279 1.82a20.67 20.67 0 01-.297 1.19c1.18 1.096 2.638 1.654 4.298 1.654.866 0 1.687-.146 2.46-.417.482-.166 1.005-.166 1.487 0 .89.322 1.84.506 2.845.506 1.524 0 2.948-.437 4.174-1.28-1.248-1.877-1.972-4.122-1.972-6.539 0-2.448.765-4.748 2.095-6.662a9.166 9.166 0 00-5.14-3.024zm-.035-1.214z" />
        </svg>
      )
    case "x (twitter)":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
    case "apple":
      return "bg-[#9933CC] hover:bg-[#7a29a3]"
    case "x (twitter)":
      return "bg-[#000000] hover:bg-[#333333]"
    default:
      return "bg-[#4a4a4a] hover:bg-[#3a3a3a]"
  }
}

// Small icon version for podcast episode buttons
const getSmallPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "youtube":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "spotify":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      )
    case "apple":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587.136.136.15.36.028.51a11.063 11.063 0 00-2.01 6.39c0 2.543.886 4.931 2.372 6.818.122.158.1.38-.05.517-1.64 1.393-3.59 2.066-5.696 2.066-1.266 0-2.46-.26-3.55-.72-.204-.086-.43-.086-.634 0a8.313 8.313 0 01-2.795.517c-2.29 0-4.21-.837-5.692-2.41-.077-.079-.093-.188-.058-.295.19-.521.351-1.052.48-1.59.15-.62.253-1.228.31-1.809.03-.293.153-.58.356-.78a8.065 8.065 0 001.667-2.45c.52-1.03.838-2.196.838-3.549 0-2.135-.744-4.01-1.97-5.42-.162-.186-.128-.48.072-.627C4.508 3.26 6.632 2.568 8.85 2.568c.983 0 1.934.149 2.852.41.186.055.385.055.571 0a9.77 9.77 0 01.593-.157v-.253zm.653 1.215c-.185.061-.375.12-.568.174a.435.435 0 01-.255-.001 10.39 10.39 0 00-2.894-.388c-1.778 0-3.48.532-4.915 1.516l-.067.054c1.014 1.449 1.616 3.22 1.616 5.155 0 1.478-.353 2.764-.936 3.912-.4.791-.912 1.521-1.51 2.172a4.1 4.1 0 00-.143.158c-.056.591-.149 1.2-.279 1.82a20.67 20.67 0 01-.297 1.19c1.18 1.096 2.638 1.654 4.298 1.654.866 0 1.687-.146 2.46-.417.482-.166 1.005-.166 1.487 0 .89.322 1.84.506 2.845.506 1.524 0 2.948-.437 4.174-1.28-1.248-1.877-1.972-4.122-1.972-6.539 0-2.448.765-4.748 2.095-6.662a9.166 9.166 0 00-5.14-3.024zm-.035-1.214z" />
        </svg>
      )
    default:
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
  }
}

export function TalksContent() {
  return (
    <div className="space-y-4 font-mono text-sm pr-4 overflow-hidden">
      <h2 className="text-lg font-bold tracking-wide border-b-2 border-black pb-2">[ TALKS & PODCASTS ]</h2>

      <div className="space-y-4">
        {TALKS_CONFIG.map((talk, index) => (
          <div key={index} className="border-2 border-[#2a2a2a] bg-[#f5f5f0] p-3">
            <h3 className="font-bold text-sm mb-2 leading-snug">{talk.title}</h3>
            <div className="flex flex-wrap gap-2">
              {talk.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
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
          </div>
        ))}
      </div>

      {/* Salvador Podcast Section */}
      <h2 className="text-lg font-bold tracking-wide border-b-2 border-black pb-2 mt-6">[ SALVADOR PODCAST ]</h2>

      <div className="space-y-3">
        {PODCAST_EPISODES.map((episode, index) => (
          <div key={index} className="border-2 border-[#2a2a2a] bg-[#f5f5f0] p-3">
            <h3 className="font-bold text-sm leading-snug">{episode.guest}</h3>
            <p className="text-xs text-[#555] mb-2 leading-snug">{episode.topic}</p>
            <div className="flex gap-1.5">
              <a
                href={episode.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-6 h-6 text-white rounded transition-colors bg-[#FF0000] hover:bg-[#cc0000]"
                title="YouTube"
              >
                {getSmallPlatformIcon("youtube")}
              </a>
              <a
                href={episode.links.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-6 h-6 text-white rounded transition-colors bg-[#9933CC] hover:bg-[#7a29a3]"
                title="Apple Podcasts"
              >
                {getSmallPlatformIcon("apple")}
              </a>
              <a
                href={episode.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-6 h-6 text-white rounded transition-colors bg-[#1DB954] hover:bg-[#1aa34a]"
                title="Spotify"
              >
                {getSmallPlatformIcon("spotify")}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Archive Link */}
      <div className="text-center pt-2 pb-1 border-t border-[#ccc]">
        <a
          href="https://progreshion.blog/podcast"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#555] hover:text-black hover:underline"
        >
          Full archive at progreshion.blog/podcast
        </a>
      </div>
    </div>
  )
}
