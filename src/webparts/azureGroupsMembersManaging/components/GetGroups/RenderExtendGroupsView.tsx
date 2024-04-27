import * as React from 'react'
import RenderGroups from './RenderGroups'
import {  IGetGroupRenderProps } from './IGroupProps'

export default function RenderExtendGroupsView(props:IGetGroupRenderProps) {
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
