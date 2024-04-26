import * as React from "react";
// import { setMembersService } from "../../services/setMembersService";

//import { getADUserService } from "../../services/getADUserService";
import RenderADMembers from "./RenderADMembers";
export default function AddMember(props: any) {

  //const [loading, setLoading] = React.useState<boolean>(true);

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
