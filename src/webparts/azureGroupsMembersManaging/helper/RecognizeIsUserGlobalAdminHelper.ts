import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGlobalAdminsService } from "../services/getGlobalAdminsService";
import { getMeService } from "../services/getMeService";

export async function RecognizeIsUserGlobalAdminHelper(
  context: WebPartContext,
  templateRoleId: string
): Promise<boolean> {
  try {
    // Get logged user
    const me = await getMeService(context);

    // Getting global admins
    const globalAdmins = await getGlobalAdminsService(context, templateRoleId);

    const admins = globalAdmins[0].members;

    console.log(me);
    console.log(admins);

    const isAdmin = admins.some((admin: any) => admin.id === me.id);

    return isAdmin;
  } catch (error) {
    console.error("Error in RecognizeIsUserGlobalAdminHelper:", error);
    return false;
  }
}