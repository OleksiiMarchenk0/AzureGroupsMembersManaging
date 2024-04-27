import * as React from "react";
import RenderSimpleGroups from "./RenderSimpleGroups";

export default function RenderSimpleGroupsView(props: any) {
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
