import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

// Get projectId from environment variable or use a default for development
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

const metadata = {
  name: 'Juno AI',
  description: 'AI-native crypto research platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://juno.ai',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
})

export { config }

const queryClient = new QueryClient()

// Wallet provider component
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(
    WagmiProvider, 
    { config }, 
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  )
}