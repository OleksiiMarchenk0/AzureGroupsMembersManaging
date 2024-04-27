import * as React from "react";
import RenderExtendADMembers from "./RenderExtendADMembers";



export default function AddMember(props: any) {
  const {  isGroupChosen, addUsers,loading,adusers, chosenGroupDisplayName } = props;
  return (
    <div>
      {loading ? (
        <div>Loading all AAD users...</div>
      ) : (
        <>
        {props.view === "Extended" ? (
         <RenderExtendADMembers users={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen} chosenGroupDisplayName={chosenGroupDisplayName}/>
        ) : (
        <div>Normal view aad members</div>
        )}
      </>
      )}
    </div>
  );
}
