import CRMDashboard from './crm/CRMDashboard'
import WorkspaceDashboard from './workspace/page'

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const view = Array.isArray(searchParams.view)
    ? searchParams.view[0]
    : (searchParams.view as string | undefined)

  if (view === 'workspace') {
    return <WorkspaceDashboard />
  }

  return <CRMDashboard initialTab={view || 'home'} />
}
