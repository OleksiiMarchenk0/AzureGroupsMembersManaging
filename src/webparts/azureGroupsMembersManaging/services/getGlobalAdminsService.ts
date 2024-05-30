import { MSGraphClient } from "@microsoft/sp-http";

export const getGlobalAdminsService = (context: any, id: string):Promise<any> => {
  return context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient) => {
      return client
        .api(
          `directoryRoles?$filter=roleTemplateId eq '62e90394-69f5-4237-9190-012177145e10'&$expand=members`
        )
        .version("v1.0")
        .get();
    })
    .then((response: any) => {
      return response.value;
    })
    .catch((error: Error) => console.error(error));
};
