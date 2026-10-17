"use client"

const projects = [
  {
    name: "Atlas for Portuguese tech",
    description: "A map of Portugal's technology ecosystem.",
    url: "https://lusotech.fyi",
  },
  {
    name: "Tyler Cowen Simulator",
    description: "A simulator of my interview with Tyler Cowen.",
    url: "https://cowensimulator.com",
  },
]

export function ProjectsContent() {
  return (
    <div className="space-y-4 bg-[#f4efe2] p-4 text-[#252525]">
      <p className="text-sm leading-relaxed">
        Things I&apos;ve built and projects I&apos;m working on.
      </p>

      <div className="space-y-2">
        {projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-[#403b32] bg-[#fffaf0] p-3 shadow-[2px_2px_0_#403b32] transition-transform hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:shadow-none"
          >
            <h2 className="font-bold text-sm">{project.name}</h2>
            <p className="mt-1 text-xs text-[#5b5549]">{project.description}</p>
            <p className="mt-2 text-xs text-blue-700 underline">{project.url}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ProjectsContent
