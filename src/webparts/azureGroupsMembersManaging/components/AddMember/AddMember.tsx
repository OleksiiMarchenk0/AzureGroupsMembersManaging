import * as React from "react";
import RenderADMembers from "./RenderADMembers";


export default function AddMember(props: any) {
  const {  isGroupChosen, addUsers,loading,adusers } = props;
  return (
    <div>
      {loading ? (
        <div>Loading all AAD users...</div>
      ) : (
        <RenderADMembers users={adusers} addUsers={addUsers}  isGroupChosen ={isGroupChosen}/>
      )}
    </div>
  );
}
