import * as React from "react";
import { setMembersService } from "../../services/setMembersService";

import { getADUserService } from "../../services/getADUserService";
import RenderADMembers from "./RenderADMembers";
export default function AddMember(props: any) {
  const [users, setUsers] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { context,groupId, isGroupChosen } = props;

  // getting users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getADUserService(context);
        if (users) {
          setUsers(users);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [context]);


  const addUsers = async (userId: string) => {
    try {
await setMembersService(context, groupId, [userId]);


      
    } catch (error) {
      console.error("Error adding members:", error);
    } finally {
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading all AAD users...</div>
      ) : (
        <RenderADMembers users={users} addUsers={addUsers}  isGroupChosen ={isGroupChosen}/>
      )}
    </div>
  );
}
