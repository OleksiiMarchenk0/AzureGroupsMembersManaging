import * as React from "react";
import RenderExtendMembers from "./RenderExtendMembers";
import RenderSimpleMembers from "./RenderSimpleMembers";
import { IListMembersProps } from "./IListMembersProps";
import { Spinner, SpinnerSize } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";


function GetMembers(props: IListMembersProps):JSX.Element {
  const { isGroupChosen, members, loading, removeUser,view, chosenGroupDisplayName ,usersPerPage} = props;

  return (
    <div style={{ marginTop: '15px', marginBottom: '15px' }}>
      {loading ? (
         <Spinner size={SpinnerSize.large} label={strings.Members.loadingPermissionsProgressLabel} />
      ) : (
        <div>
          <>
            {view === "Extended" ? (
              <>
                <RenderExtendMembers
                  members={members}
                  removeUser={removeUser}
                  isGroupChosen={isGroupChosen}
                  chosenGroupDisplayName={chosenGroupDisplayName}
                  usersPerPage={usersPerPage}
                />
              </>
            ) : (
              <RenderSimpleMembers
              members={members}
              removeUser={removeUser}
              isGroupChosen={isGroupChosen}
              chosenGroupDisplayName={chosenGroupDisplayName}
            />
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default GetMembers;
