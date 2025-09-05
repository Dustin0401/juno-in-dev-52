import { PageHeader } from '@/components/PageHeader';

interface StakingHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function StakingHeader({ sidebarOpen, onToggleSidebar }: StakingHeaderProps) {
  return (
    <PageHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />
  );
}