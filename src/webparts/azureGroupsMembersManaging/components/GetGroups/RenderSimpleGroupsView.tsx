import * as React from "react";
import RenderSimpleGroups from "./RenderSimpleGroups";
import { IGetGroupRenderProps } from "./IGroupProps";


export default function RenderSimpleGroupsView(props: IGetGroupRenderProps) {
  const { isAdmin, groups, filteredGroups, getChosenGroupIdAndName } = props;
  return (
    <div>
      <>
        {isAdmin === null ? (
          <p>Loading...</p>
        ) : isAdmin ? (
          <>
            {" "}
            <RenderSimpleGroups
              groups={groups}
              getChosenGroupIdAndName={getChosenGroupIdAndName}
            />
          </>
        ) : (
          <>
            <RenderSimpleGroups
              groups={filteredGroups}
              getChosenGroupIdAndName={getChosenGroupIdAndName}
            />
          </>
        )}
      </>
    </div>
  );
}
