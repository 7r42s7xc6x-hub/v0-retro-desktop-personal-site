"use client"

export function SupportContent() {
  return (
    <div className="p-4 space-y-3 bg-[#f5f0e6]">
      {/* Warm header */}
      <div className="text-center space-y-1.5">
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f5d442] via-[#e6c030] to-[#c9a227] border-2 border-[#8B6914] flex items-center justify-center shadow-md">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="#8B6914">
              <path d="M8 14l-1.4-1.3C2.6 9 0 6.6 0 3.7 0 1.6 1.6 0 3.7 0c1.2 0 2.4.6 3.3 1.5C7.9.6 9.1 0 10.3 0 12.4 0 14 1.6 14 3.7c0 2.9-2.6 5.3-6.6 9L8 14z" transform="translate(1, 0)" />
            </svg>
          </div>
        </div>
        <h2 className="text-base font-semibold text-[#2a2a2a]">Support My Work</h2>
        <p className="text-sm text-[#5a5a5a] leading-snug">
          If you enjoy my podcast or writing, consider buying me a coffee.
        </p>
      </div>

      {/* Support button */}
      <div className="flex justify-center pt-1">
        <a
          href="https://buy.stripe.com/28E28rewieT10MG97TfEk00"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-b from-[#f5d442] to-[#d4a827] hover:from-[#ffe066] hover:to-[#e6b830] text-[#5a4510] font-semibold rounded-md border-2 border-[#8B6914] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.2)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
          </svg>
          Support
        </a>
      </div>

      {/* Thank you note */}
      <p className="text-xs text-center text-[#8a8a7a]">
        Thank you for your generosity.
      </p>
    </div>
  )
}
