import * as React from "react";
import RenderExtendADMembers from "./RenderExtendADMembers";
import RenderSimpleADMembers from "./RenderSimpleADMembers";



export default function AddMember(props: any) {
  const {  isGroupChosen, addUsers,loading,adusers, chosenGroupDisplayName , view} = props;
  return (
    <div>
      {loading ? (
        <div>Loading all AAD users...</div>
      ) : (
        <>
        {view === "Extended" ? (
         <RenderExtendADMembers users={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen} chosenGroupDisplayName={chosenGroupDisplayName}/>
        ) : (
       <RenderSimpleADMembers users={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen} chosenGroupDisplayName={chosenGroupDisplayName} />
        )}
      </>
      )}
    </div>
  );
}
