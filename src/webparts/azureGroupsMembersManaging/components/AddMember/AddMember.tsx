import * as React from "react";
import RenderExtendADMembers from "./RenderExtendADMembers";
import RenderSimpleADMembers from "./RenderSimpleADMembers";
import { IAddADMembersProps } from "./IAddADMembersProps";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as strings from "AzureGroupsMembersManagingWebPartStrings";



export default function AddMember(props: IAddADMembersProps) {
  const {  isGroupChosen, addUsers,loading,adusers, chosenGroupDisplayName , view, context, groupId} = props;
  return (
    <div>
      {loading ? (
        <Spinner size={SpinnerSize.large} label={strings.Members.loadingAADUsersProgressLabel} />
   
      ) : (
        <>
        {view === "Extended" ? (
         <RenderExtendADMembers adusers={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen} chosenGroupDisplayName={chosenGroupDisplayName} context={context} groupId={groupId}/>
        ) : (
       <RenderSimpleADMembers adusers={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen} chosenGroupDisplayName={chosenGroupDisplayName} context={context}  groupId={groupId}/>
        )}
      </>
      )}
    </div>
  );
}
