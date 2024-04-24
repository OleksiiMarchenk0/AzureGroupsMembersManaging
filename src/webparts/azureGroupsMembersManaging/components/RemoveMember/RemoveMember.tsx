import * as React from "react";
import { removeMemberService } from "../../services/removeMember";

export default function RemoveMember(props: any) {
  const groupId = "d3e99e86-9150-4433-8d2a-0bacce3a4211";
  const userId = "49c4d0ae-1a79-4473-b10c-ca779fd31f79"; //Jarek
  // const [members, setMembers] = React.useState<any[]>([]);
  //  const [loading, setLoading] = React.useState<boolean>(true);
  const { context } = props;
  const removeUser = async () => {
    try {
      const response = await removeMemberService(context, groupId, userId);
      console.log(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {

    }
  };

  return (
    <div>
      <button onClick={removeUser}>Remove user from group</button>
    </div>
  );
}
