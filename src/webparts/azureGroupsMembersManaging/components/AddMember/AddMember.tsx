import * as React from "react";
import RenderExtendADMembers from "./RenderExtendADMembers";
import RenderSimpleADMembers from "./RenderSimpleADMembers";
import { IAddADMembersProps } from "./IAddADMembersProps";



export default function AddMember(props: IAddADMembersProps) {
  const {  isGroupChosen, addUsers,loading,adusers, chosenGroupDisplayName , view, context, groupId} = props;
  return (
    <div>
      {loading ? (
        <div>Loading all AAD users...</div>
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
