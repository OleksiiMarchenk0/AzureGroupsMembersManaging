import * as React from 'react'
import { setMembersService } from '../../services/setMembersService';

import { Button } from '@fluentui/react-components';
import { getADUserService } from '../../services/getADUserService';
//, CompoundButton, MenuButton, SplitButton, ToggleButton
export default function AddMember(props:any) {
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

   const { context } = props;

   // getting users
    React.useEffect(()=>{
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
      },[context])


  
    const {groupId} = props;
      const addUsers = async (userId:string) => {
        console.log(`${userId} is adding`);
        
        try {
          console.log(`userId ${userId}`);
          
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
        <div>
          <h2> Modify members of group</h2>
          {users.map((user: any) => (
            <div key={user.id}>
             <span>  {user.displayName}</span>
             <Button onClick={()=> { addUsers(user.id)}} appearance="primary">Add</Button>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}
