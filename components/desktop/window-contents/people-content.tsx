const MONO_FONT =
  'ui-monospace, "SF Mono", Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", monospace'

const PEOPLE = [
  { name: "Tyler Cowen", url: "https://tylercowen.com/" },
  { name: "David Deutsch", url: "https://daviddeutsch.org.uk/" },
  { name: "Dwarkesh Patel", url: "https://www.dwarkesh.com/" },
  { name: "Scott Alexander", url: "https://www.astralcodexten.com/" },
  { name: "Patrick Collison", url: "https://patrickcollison.com/" },
  { name: "Peter Thiel", url: "https://x.com/peterthiel?lang=en" },
  { name: "Marc Andreessen", url: "https://a16z.com/author/marc-andreessen" },
  { name: "Michael Huemer", url: "https://fakenous.substack.com/" },
  { name: "Jasmine Sun", url: "https://jasmi.news/" },
  { name: "Bryan Caplan", url: "https://betonit.substack.com/" },
  { name: "Robin Hanson", url: "https://www.overcomingbias.com/" },
  { name: "Peter Boghossian", url: "https://peterboghossian.com/" },
  { name: "Michael Shermer", url: "https://michaelshermer.com/" },
  { name: "Jason Crawford", url: "https://jasoncrawford.org/" },
  { name: "Brendan McCord", url: "https://brendanmccord.com/" },
  { name: "Jim O'Shaughnessy", url: "https://osv.llc/" },
  { name: "Sam Harris", url: "https://samharris.org/" },
  { name: "George Mack", url: "https://george-mack.com/" },
  { name: "Joe Hudson", url: "https://artofaccomplishment.com/" },
  { name: "Cate Hall", url: "https://usefulfictions.substack.com/" },
  { name: "Naval Ravikant", url: "https://nav.al/" },
  { name: "Brett Hall", url: "https://bretthall.substack.com/" },
  { name: "Arjun Khemani", url: "https://www.arjunkhemani.com/" },
  { name: "Ross Douthat", url: "https://www.nytimes.com/column/ross-douthat" },
  { name: "Josh Howerton", url: "https://lakepointe.church/josh-howerton/" },
  { name: "Craig Groeschel", url: "https://www.craiggroeschel.com/" },
  { name: "Cliff Knechtle", url: "https://givemeananswer.org/" },
]

export function PeopleContent() {
  return (
    <div className="flex flex-col gap-4 text-[#2a2a2a]">
      <div className="text-center border-b-2 border-[#2a2a2a] pb-3 mb-1">
        <h2 className="text-base font-bold tracking-wide">[ PEOPLE ]</h2>
        <p className="text-xs mt-2 opacity-80 leading-relaxed">
          Some of the most interesting people I find myself returning to again and again.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {PEOPLE.map((person) => (
          <a
            key={person.name}
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-2 py-1.5 hover:bg-[#d8d4cc] active:bg-[#c8c4bc] transition-colors border border-transparent hover:border-[#2a2a2a]"
            style={{ fontFamily: MONO_FONT }}
          >
            <span className="text-[#2a2a2a] opacity-50 group-hover:opacity-100 transition-opacity">{">"}</span>
            <span className="text-sm underline underline-offset-2 decoration-[#2a2a2a]/40 group-hover:decoration-[#2a2a2a] transition-all">
              {person.name}
            </span>
            <svg
              className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity"
              viewBox="0 0 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 7L7 1M7 1H3M7 1V5" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
