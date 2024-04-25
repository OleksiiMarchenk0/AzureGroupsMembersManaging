import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGroupOwnersService } from "../services/getGroupOwnersService";

//import { getMeService } from "../services/getMeService";

export async function GetOwnedGroups(
    context: WebPartContext,
    groups:any
):Promise<any>{
    const promises:any = [];
   // let filteredGroups = []
    groups.forEach((group:any)=>{
        const groupsOwners =  getGroupOwnersService(context,group.id)
        console.log(`groupId - ${group.id} , owners - ${groupsOwners.toString()}`);
        promises.push(groupsOwners, group)
        

    })
    Promise.all(promises).then(arrOfResults => {
        // setState here
        arrOfResults.forEach(res=>console.log(res));
        
       
        
      });
 
}