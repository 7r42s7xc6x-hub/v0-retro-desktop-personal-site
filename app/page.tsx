"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { DesktopIcon } from "@/components/desktop/desktop-icon"
import { Window } from "@/components/desktop/window"
import { Dock } from "@/components/desktop/dock"
import { MenuBar, WALLPAPERS } from "@/components/desktop/menu-bar"
import { AboutContent } from "@/components/desktop/window-contents/about-content"
import { ContactContent } from "@/components/desktop/window-contents/contact-content"
import { SocialsContent } from "@/components/desktop/window-contents/socials-content"
import { GuestbookContent } from "@/components/desktop/window-contents/guestbook-content" // Import guestbook
import { TalksContent } from "@/components/desktop/window-contents/talks-content" // Import TalksContent
import { PortalContent } from "@/components/desktop/window-contents/portal-content" // Import PortalContent
import { SupportContent } from "@/components/desktop/window-contents/support-content"
import { PeopleContent } from "@/components/desktop/window-contents/people-content"

type WindowId =
  | "about"
  | "contact"
  | "socials"
  | "writing"
  | "guestbook"
  | "talks" // Added guestbook
  | "window" // Renamed portal to window
  | "support"
  | "people"

const desktopIcons = [
  { id: "about" as WindowId, label: "About Me", iconType: "document" as const },
  {
    id: "writing" as const,
    label: "Writing",
    iconType: "writing" as const,
    externalUrl: "https://progreshion.blog",
  },
  { id: "socials" as WindowId, label: "Socials", iconType: "socials" as const },
  // { id: "guestbook" as WindowId, label: "Guestbook", iconType: "guestbook" as const },
  { id: "talks" as WindowId, label: "Podcast", iconType: "talks" as const },
  // Renamed portal icon to window
  { id: "window" as WindowId, label: "Window", iconType: "portal" as const },
  { id: "support" as WindowId, label: "Support", iconType: "support" as const },
  { id: "people" as WindowId, label: "People", iconType: "people" as const },
]

interface WindowState {
  id: WindowId
  isOpen: boolean
  zIndex: number
  position: { x: number; y: number }
}

const getWindowConfigs = (
  isMobile: boolean,
): Record<
  WindowId,
  { title: string; defaultPosition: { x: number; y: number }; size?: { width: number; height: number } }
> => ({
  about: {
    title: "About Me",
    defaultPosition: { x: isMobile ? 10 : 80, y: isMobile ? 50 : 80 },
    size: { width: isMobile ? 300 : 520, height: isMobile ? 420 : 480 },
  },
  contact: {
    title: "Uplink",
    defaultPosition: { x: isMobile ? 10 : 120, y: isMobile ? 50 : 100 },
    size: { width: isMobile ? 280 : 340, height: isMobile ? 260 : 280 },
  },
  socials: {
    title: "Socials",
    defaultPosition: { x: isMobile ? 10 : 150, y: isMobile ? 50 : 100 },
    size: { width: isMobile ? 300 : 360, height: isMobile ? 180 : 160 },
  },
  writing: {
    title: "Writing",
    defaultPosition: { x: isMobile ? 10 : 80, y: isMobile ? 50 : 60 },
    size: { width: isMobile ? 300 : 520, height: isMobile ? 420 : 480 },
  },
  guestbook: {
    title: "Guestbook",
    defaultPosition: { x: isMobile ? 10 : 140, y: isMobile ? 50 : 90 },
    size: { width: isMobile ? 300 : 360, height: isMobile ? 400 : 420 },
  },
  talks: {
    title: "Podcast",
    defaultPosition: { x: isMobile ? 10 : 100, y: isMobile ? 50 : 70 },
    size: { width: isMobile ? 300 : 420, height: isMobile ? 450 : 480 },
  },
  window: {
    title: "Window",
    defaultPosition: { x: isMobile ? 10 : 150, y: isMobile ? 50 : 100 },
    size: { width: isMobile ? 280 : 350, height: isMobile ? 300 : 350 },
  },
  support: {
    title: "Support",
    defaultPosition: { x: isMobile ? 10 : 130, y: isMobile ? 50 : 90 },
    size: { width: isMobile ? 280 : 320, height: isMobile ? 280 : 300 },
  },
  people: {
    title: "People",
    defaultPosition: { x: isMobile ? 10 : 120, y: isMobile ? 50 : 80 },
    size: { width: isMobile ? 300 : 380, height: isMobile ? 420 : 480 },
  },
})

export default function Desktop() {
  const [isMobile, setIsMobile] = useState(false)
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].url)
  const [wallpaperType, setWallpaperType] = useState<"image" | "video">(WALLPAPERS[0].type || "image")
  const [maxIconsPerColumn, setMaxIconsPerColumn] = useState(5)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const calculateMaxIcons = () => {
      const viewportHeight = window.innerHeight
      const menuBarHeight = 48 // top-12
      const dockHeight = 96 // bottom-24
      const availableHeight = viewportHeight - menuBarHeight - dockHeight
      const iconHeight = 100 // approximate height of icon + gap
      const maxIcons = Math.floor(availableHeight / iconHeight)
      const totalIcons = desktopIcons.length // 8 icons
      const desiredMax = Math.min(maxIcons, totalIcons - 2) // Leave at least 2 for second column
      setMaxIconsPerColumn(Math.max(3, desiredMax)) // Minimum 3 per column
    }
    calculateMaxIcons()
    window.addEventListener("resize", calculateMaxIcons)
    return () => window.removeEventListener("resize", calculateMaxIcons)
  }, [])

  const windowConfigs = getWindowConfigs(isMobile)

  const [windows, setWindows] = useState<WindowState[]>([
    { id: "about", isOpen: false, zIndex: 1, position: { x: 80, y: 80 } },
    { id: "contact", isOpen: false, zIndex: 1, position: { x: 120, y: 100 } },
    { id: "socials", isOpen: false, zIndex: 1, position: { x: 150, y: 100 } },
    // { id: "guestbook", isOpen: false, zIndex: 1, position: { x: 140, y: 90 } }, // Added guestbook window state
    { id: "talks", isOpen: false, zIndex: 1, position: { x: 100, y: 70 } }, // Added talks window state
    // Renamed portal window state to window
    { id: "window", isOpen: false, zIndex: 1, position: { x: 150, y: 100 } },
    { id: "support", isOpen: false, zIndex: 1, position: { x: 130, y: 90 } },
    { id: "people", isOpen: false, zIndex: 1, position: { x: 120, y: 80 } },
  ])
  const [maxZIndex, setMaxZIndex] = useState(1)

  const openWindow = useCallback(
    (id: WindowId) => {
      setMaxZIndex((prev) => prev + 1)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: true, zIndex: maxZIndex + 1 } : w)))
    },
    [maxZIndex],
  )

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)))
  }, [])

  const focusWindow = useCallback(
    (id: WindowId) => {
      setMaxZIndex((prev) => prev + 1)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)))
    },
    [maxZIndex],
  )

  const handleIconClick = (icon: (typeof desktopIcons)[0]) => {
    if ("externalUrl" in icon && icon.externalUrl) {
      const link = document.createElement("a")
      link.href = icon.externalUrl
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      link.click()
    } else {
      openWindow(icon.id as WindowId)
    }
  }

  const getWindowContent = (id: WindowId) => {
    switch (id) {
      case "about":
        return <AboutContent onOpenGuestbook={() => openWindow("guestbook")} /> // Pass callback to open guestbook
      case "contact":
        return <ContactContent />
      case "socials":
        return <SocialsContent />
      case "guestbook":
        return <GuestbookContent /> // Added guestbook content
      case "talks":
        return <TalksContent /> // Added talks content
      case "window":
        return null // Window returns null - uses renderContent instead
      case "writing":
        return null
      case "support":
        return <SupportContent />
      case "people":
        return <PeopleContent />
    }
  }

  const handleWallpaperChange = (url: string, type: "image" | "video") => {
    setWallpaper(url)
    setWallpaperType(type)
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {wallpaperType === "video" ? (
        <video
          key={wallpaper}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={wallpaper} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: `url('${wallpaper}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      )}

      <MenuBar onWallpaperChange={handleWallpaperChange} currentWallpaper={wallpaper} />

      <div className="absolute top-12 left-6 bottom-24 pointer-events-none">
        <div
          className="grid gap-3 h-full pointer-events-auto content-start"
          style={{
            gridTemplateRows: `repeat(${maxIconsPerColumn}, auto)`,
            gridAutoFlow: "column",
            gridAutoColumns: "auto",
          }}
        >
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={null}
              iconType={icon.iconType}
              label={icon.label}
              onClick={() => handleIconClick(icon)}
              isExternal={"externalUrl" in icon && !!icon.externalUrl}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            title={windowConfigs[window.id].title}
            isOpen={window.isOpen}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={window.zIndex}
            defaultPosition={windowConfigs[window.id].defaultPosition}
            position={window.position}
            size={windowConfigs[window.id].size}
            hideScrollbar={window.id === "window"}
            renderContent={
              window.id === "window"
                ? (position) => (
                    <PortalContent
                      windowPosition={position}
                      windowSize={windowConfigs[window.id].size || { width: 350, height: 350 }}
                    />
                  )
                : undefined
            }
          >
            {getWindowContent(window.id)}
          </Window>
        ))}
      </AnimatePresence>

      <Dock onWallpaperChange={handleWallpaperChange} currentWallpaper={wallpaper} />
    </div>
  )
}
