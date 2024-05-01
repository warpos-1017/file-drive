import React from 'react'

type Props = {
  params: { domain: string }
}
const DomainEntryPage = ({ params }: Props) => {
  return <div>Domain Entery: {params.domain}</div>
}

export default DomainEntryPage
