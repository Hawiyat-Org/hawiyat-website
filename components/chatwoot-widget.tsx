'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'

interface ChatwootWidgetProps {
  websiteToken: string
  baseUrl?: string
}

declare global {
  interface Window {
    chatwootSettings: any
    chatwootSDK: any
    $chatwoot: any
  }
}

export default function ChatwootWidget({ 
  websiteToken, 
  baseUrl = 'https://app.chatwoot.com'
}: ChatwootWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!websiteToken || window.$chatwoot) return

    window.chatwootSettings = {
      hideMessageBubble: true,
      position: 'right',
      locale: 'en',
      type: 'standard',
    }

    const script = document.createElement('script')
    script.src = `${baseUrl}/packs/js/sdk.js`
    script.defer = true
    script.async = true
    
    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: websiteToken,
          baseUrl: baseUrl
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      document.querySelectorAll(`script[src*="chatwoot"]`).forEach(script => script.remove())
      document.querySelector('.woot-widget-holder')?.remove()
      document.querySelector('.woot-widget-bubble')?.remove()
      delete window.$chatwoot
      delete window.chatwootSDK
      delete window.chatwootSettings
    }
  }, [websiteToken, baseUrl])

  const handleToggle = () => {
    if (isOpen) {
      window.$chatwoot?.toggle('close')
      setTimeout(() => {
        setIsOpen(false)
      }, 100)
    } else {
      setIsOpen(true)
      setTimeout(() => {
        window.$chatwoot?.toggle('open')
      }, 100)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleToggle}
        className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 text-white   dark:text-black rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  )
}

export function useChatwoot() {
  const toggle = (state?: 'open' | 'close') => {
    window.$chatwoot?.toggle(state)
  }

  const setUser = (identifier: string, user: Record<string, any>) => {
    window.$chatwoot?.setUser(identifier, user)
  }

  const setCustomAttributes = (attributes: Record<string, any>) => {
    window.$chatwoot?.setCustomAttributes(attributes)
  }

  const reset = () => {
    window.$chatwoot?.reset()
  }

  return { toggle, setUser, setCustomAttributes, reset }
}