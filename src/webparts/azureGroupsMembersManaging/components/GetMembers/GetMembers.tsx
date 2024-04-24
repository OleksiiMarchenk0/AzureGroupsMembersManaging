import * as  React from 'react'
import { useEffect } from 'react';
import { getMembersService } from '../../services/getMembersService';
import { Button } from '@fluentui/react-components';
import { removeMemberService } from '../../services/removeMemberService';



function GetMembers(props: any) {
  const {groupId} = props;
  const [members, setMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const {context} = props;
  console.log(context);


  useEffect(()=>{
  
    
    const fetchData = async () => {
      try {
        const membersData = await getMembersService(context,groupId);
        if (membersData) {
          setMembers(membersData);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

  
    

    fetchData();
  },[groupId])

  const removeUser = async (userId:string) => {
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
           <h2> Get members of  groups</h2>
           
          {members.map((member: any) => (
           <div key={member.id}>
           <span>  {member.displayName}</span>
           <Button onClick={()=> { removeUser(member.id)}} appearance="primary">Remove</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetMembers
