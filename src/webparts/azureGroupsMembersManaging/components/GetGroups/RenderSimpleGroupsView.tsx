import * as React from "react";
import RenderSimpleGroups from "./RenderSimpleGroups";
import { IGetGroupRenderProps } from "./IGroupProps";
import { Spinner, SpinnerSize } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";


export default function RenderSimpleGroupsView(props: IGetGroupRenderProps) {
  const { isAdmin, groups, filteredGroups, getChosenGroupIdAndName } = props;
  console.log(filteredGroups);
  
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
