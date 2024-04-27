import * as React from 'react'
import RenderGroups from './RenderGroups'

export default function RenderExtendGroupsView(props:any) {
    const {isAdmin,groups,filteredGroups,getChosenGroupIdAndName} = props
  return (
    <div>
                   <>
          {isAdmin === null ? (
            <p>Loading...</p>
          ) : isAdmin ? (
            <>
              {" "}
              <RenderGroups
                groups={groups}
                getChosenGroupIdAndName={getChosenGroupIdAndName}
              />
            </>
          ) : (
            <>
              <RenderGroups
                groups={filteredGroups}
                getChosenGroupIdAndName={getChosenGroupIdAndName}
              />
            </>
          )}
  </>
    </div>
  )
}
