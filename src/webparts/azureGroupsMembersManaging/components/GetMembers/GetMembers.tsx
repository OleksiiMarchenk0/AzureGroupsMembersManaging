import * as React from "react";
import { useEffect } from "react";
import { getMembersService } from "../../services/getMembersService";
import { removeMemberService } from "../../services/removeMemberService";
import RenderMembers from "./RenderMembers";

function GetMembers(props: any) {
  const { groupId, context, isGroupChosen } = props;
  const [members, setMembers] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchData = async () => {
    try {
      const membersData = await getMembersService(context, groupId);
      if (membersData) {
        setMembers(membersData);
      } else {
        console.error("Error: Invalid data structure");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const removeUser = async (userId: string) => {
    try {
      const response = await removeMemberService(context, groupId, userId);
      console.log(response);

     setMembers((members:any) => members.filter((member:any) => member.id !== userId));

    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
    }
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <RenderMembers
            members={members}
            removeUser={removeUser}
            isGroupChosen={isGroupChosen}
          />
        </>
      )}
    </div>
  );
}

export default GetMembers;
