import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGroupOwnersService } from "../services/getGroupOwnersService";
import { getGroupsService } from "../services/getGroupsService";
import { getMeService } from "../services/getMeService";
import { IMember } from "../components/GetMembers/IMember";
import {
  IGroupPromise,
  IGroupProps,
} from "../components/GetGroups/IGroupProps";

export async function GetOwnedGroups(context: WebPartContext): Promise<any> {
  let groupsData = await getGroupsService(context);

  async function getGroupOwners(): Promise<any> {
    const resultArray: IGroupPromise[] = [];

    // Fetch owners for each group and collect promises
    const promises = groupsData.map(async (group: IGroupProps) => {
      const groupId: string = group.id;
      const groupOwnersResponse = await getGroupOwnersService(
        context,
        group.id
      );
      resultArray.push({ groupId, groupOwnersResponse });
    });

    // Await all promises to resolve
    await Promise.all(promises);

    return resultArray;
  }

  try {
    const owners = await getGroupOwners();

    const me = await getMeService(context);
    const myGroupsIds = owners.filter((o:IGroupPromise) => {
      // Iterate through groupOwnersResponse array for each owner
      return o.groupOwnersResponse.some(
        (response: IMember) => response.id === me.id
      );
    });

    groupsData = groupsData.filter((group: any) => {
      const groupIds = myGroupsIds.map((owner:any) => owner.groupId);

      return groupIds.indexOf(group.id) !== -1;
    });

    return { groupsData };
  } catch (error) {
    console.error(
      "Error occurred while fetching and processing groups:",
      error
    );
    throw error;
  }
}
