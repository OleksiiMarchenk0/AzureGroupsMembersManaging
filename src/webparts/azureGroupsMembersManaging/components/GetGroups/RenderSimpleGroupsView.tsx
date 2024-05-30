import * as React from "react";
import RenderSimpleGroups from "./RenderSimpleGroups";
import { IGetGroupRenderProps } from "./IGroupProps";
import { Spinner, SpinnerSize } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";


export default function RenderSimpleGroupsView(props: IGetGroupRenderProps):JSX.Element {
  const { isAdmin, groups, filteredGroups, getChosenGroupIdAndName ,chosenGroupId} = props;
  
  return (
    <div>
      <>
        {isAdmin === null ? (
         <Spinner size={SpinnerSize.large} label={strings.Members.loadingPermissionsProgressLabel} />
        ) : isAdmin ? (
          <>
            {" "}
            <RenderSimpleGroups
              groups={groups}
              getChosenGroupIdAndName={getChosenGroupIdAndName}
              chosenGroupId={chosenGroupId}
            />
          </>
        ) : (
          <>
            <RenderSimpleGroups
              groups={filteredGroups}
              getChosenGroupIdAndName={getChosenGroupIdAndName}
              chosenGroupId={chosenGroupId}
            />
          </>
        )}
      </>
    </div>
  );
}
