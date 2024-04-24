import * as  React from 'react'
import { useEffect } from 'react';
import { getMembersService } from '../../services/getMembersService';



function GetMembers(props: any) {
  const groupId = 'd3e99e86-9150-4433-8d2a-0bacce3a4211';
  const [members, setMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(()=>{
    const {context} = props;
    console.log(context);
    
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
  },[])
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {members.map((member: any) => (
            <div key={member.id}>{member.displayName}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetMembers
