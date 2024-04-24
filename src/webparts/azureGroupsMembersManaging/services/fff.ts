import { MSGraphClient } from "@microsoft/sp-http";


export const getGroupsService = (context: any) => {
   context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient): void => {
      client
        .api(`/groups`)
        .version("v1.0")
        .get();
    });
};
