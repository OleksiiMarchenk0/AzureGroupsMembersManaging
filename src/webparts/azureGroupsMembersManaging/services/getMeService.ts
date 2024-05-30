import { MSGraphClient } from "@microsoft/sp-http";

export const getMeService = (context: any):Promise<any> => {
  return context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient) => {
      return client.api(`/me`).version("v1.0").get();
    })
    .then((response: any) => {
      return response;
    });
};
