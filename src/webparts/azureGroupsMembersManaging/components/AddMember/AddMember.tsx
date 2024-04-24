import * as React from 'react'
import { setMembersService } from '../../services/setMembersService';
import { getADUser } from '../../services/getADUser';

export default function AddMember(props:any) {
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

   const { context } = props;

   // getting users
    React.useEffect(()=>{
        const fetchUsers = async () => {
          try {
            const users = await getADUser(context);
            if (users) {
              setUsers(users);
            } else {
              console.error("Error: Invalid data structure");
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          } finally {
            setLoading(false);
            console.log(users);
            
          }
        };
    
        fetchUsers();
      },[context])


  
      const groupId='d3e99e86-9150-4433-8d2a-0bacce3a4211' // test var EuvicGermanySecurity
      const userId = '379c8ead-dc9e-4352-996f-32436f6ca648' //test var  Kacper Suchecki
      const addUsers = async () => {
        try {
          await setMembersService(context, groupId, [userId]);
        } catch (error) {
          console.error("Error adding members:", error);
        } finally {
       
        }
      };

  return (
    <div>
      <button onClick={addUsers}>Add member</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {users.map((user: any) => (
            <div key={user.id}>{user.displayName}</div>
          ))}
        </div>
      )}
    </div>
  )
}
