import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGroupOwnersService } from "../services/getGroupOwnersService";
import { getGroupsService } from "../services/getGroupsService";
//import { getMeService } from "../services/getMeService";

export async function GetOwnedGroups(
    context: WebPartContext,
  ): Promise<any> {
    const groupsOwnerspromises: Promise<any>[] = [];
    const groupsData = await getGroupsService(context);
  
    // Fetch owners for each group and collect promises
    groupsData.forEach((group: any) => {
      const groupsOwners = getGroupOwnersService(context, group.id);
      groupsOwnerspromises.push(groupsOwners);
    });
  
    // Process owners asynchronously
    async function processOwners() {
      let owners: any = [];
      try {
        const arrOfResults = await Promise.all(groupsOwnerspromises);
        arrOfResults.forEach((result: any) => {
          owners.push(...result);
        });
        return owners;
      } catch (error) {
        console.error("Error occurred while processing owners:", error);
        return [];
      }
    }
  
    try {
      const owners = await processOwners(); // Await the processed owners
      console.log(owners);
      console.log(groupsData);
      
      // Return both owners and groupsData or whatever is needed
      return { owners, groupsData };
    } catch (error) {
      console.error("Error occurred while fetching and processing groups:", error);
      throw error; // Rethrow the error for handling elsewhere
    }
  }