import * as React from "react";
import RenderGroups from "./RenderGroups";
import { IGetGroupRenderProps } from "./IGroupProps";
import { Spinner, SpinnerSize } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";

export default function RenderExtendGroupsView(props: IGetGroupRenderProps) {
  const { isAdmin, groups, filteredGroups, getChosenGroupIdAndName , chosenGroupId} = props;
  return (
    <div>
      <>
        {isAdmin === null ? (
          <Spinner
            size={SpinnerSize.large}
            label={strings.Members.loadingPermissionsProgressLabel}
          />
        ) : isAdmin ? (
          <>
            {" "}
            <RenderGroups
              groups={groups}
              getChosenGroupIdAndName={getChosenGroupIdAndName}
              chosenGroupId={chosenGroupId}
            />
          </>
        ) : (
          <>
            <RenderGroups
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
