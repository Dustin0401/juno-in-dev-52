import { PageHeader } from '@/components/PageHeader'

interface SettingsHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function SettingsHeader({ sidebarOpen, onToggleSidebar }: SettingsHeaderProps) {
  return (
    <PageHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar}>
      <div className="text-lg font-semibold text-foreground">
        Settings
      </div>
    </PageHeader>
  )
}