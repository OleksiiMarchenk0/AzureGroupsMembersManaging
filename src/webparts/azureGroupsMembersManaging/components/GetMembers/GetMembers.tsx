import * as  React from 'react'
import { useEffect } from 'react';
import { MSGraphClient } from '@microsoft/sp-http';



function GetMembers(props: any) {
  const groupId = 'd3e99e86-9150-4433-8d2a-0bacce3a4211';
  useEffect(()=>{
    const {context} = props;
    console.log(context);
    
  context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        // Now you can use the client to call Microsoft Graph API
        client
          .api(`/groups/${groupId}/members`)
          .version('v1.0')
          .get((error, members, rawResponse) => {
            // Handle the response or error
            if (error) {
              console.error('Error fetching group members:', error);
              return;
            }
            if(members){
              console.log(members);
              
            }
            // Render or process the members data
            this._renderMembers(members.value);
          });
      });
  },[])
  return (
  <div>
    
  </div>
  )
}

export default GetMembers
