import { getAuthUserDetails } from '@/lib/query'
import MenuOptions from './menu-options'

type SidebarProps = {
  id: string
  type: 'agency' | 'subaccount'
}

const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails()
  if (!user) return null

  if (!user.Agency) return

  const subaccount =
    type === 'subaccount'
      ? user.Agency.subaccounts.find((subaccount) => subaccount.id === id)
      : undefined

  const details = type === 'agency' ? user.Agency : subaccount
  if (!details) return

  const isWhitelabledAgency = user.Agency.whiteLabel
  // WIP: correct the 'default logo' asset..
  let sidebarLogo = user.Agency.agencyLogo || 'default logo'

  if (type === 'subaccount' && !isWhitelabledAgency) {
    sidebarLogo = subaccount?.subAccountLogo || user.Agency.agencyLogo
  }

  const sidebarOptions = details.sidebarOptions || []
  const subaccounts = user.Agency.subaccounts.filter((subaccount) =>
    user.permissions.find(
      (permission) =>
        permission.subaccountId === subaccount.id && permission.access
    )
  )

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        id={id}
        user={user}
        details={details}
        subAccounts={subaccounts}
        sidebarLogo={sidebarLogo}
        sidebarOpts={sidebarOptions}
      />
      <MenuOptions
        id={id}
        user={user}
        details={details}
        subAccounts={subaccounts}
        sidebarLogo={sidebarLogo}
        sidebarOpts={sidebarOptions}
      />
    </>
  )
}

export default Sidebar
