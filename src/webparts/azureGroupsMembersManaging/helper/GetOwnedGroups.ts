import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGroupOwnersService } from "../services/getGroupOwnersService";
import { getGroupsService } from "../services/getGroupsService";
import { getMeService } from "../services/getMeService";
//import { getMeService } from "../services/getMeService";

export async function GetOwnedGroups(
    context: WebPartContext,
  ): Promise<any> {
    let groupsData = await getGroupsService(context);
async function getGroupOwners(){
  interface MyObject {
    groupId: string;
    groupOwnersResponse: any; 
}
  const groupsData = await getGroupsService(context);
  const resultArray: MyObject[] = [];

   // Fetch owners for each group and collect promises
   const promises = groupsData.map(async (group: any) => {
    const groupId: string = group.id;
    const groupOwnersPromise = getGroupOwnersService(context, group.id);
    const groupOwnersResponse = await groupOwnersPromise;
    resultArray.push({ groupId, groupOwnersResponse });
});

// Await all promises to resolve
await Promise.all(promises);

return resultArray;
}

   
    try {
      const owners = await getGroupOwners(); // Await the processed owners
      const me = await getMeService(context);
      let myGroupsIds = owners.filter(o=> o.groupOwnersResponse[0].id===me.id) //for test
      console.log(myGroupsIds);
      groupsData = groupsData.filter((group:any)=>{;
      //  group.id === 
      let idsToheck=myGroupsIds[0].groupId;
          return idsToheck === group.id;
      })
      console.log(groupsData);
      
      return { groupsData };
    } catch (error) {
      console.error("Error occurred while fetching and processing groups:", error);
      throw error; // Rethrow the error for handling elsewhere
    }
  }