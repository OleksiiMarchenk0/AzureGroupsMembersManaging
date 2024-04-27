import { MSGraphClient } from "@microsoft/sp-http";

export const getADUserService = (context: any) => {
  return context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient) => {
      return client.api(`/users`).version("v1.0").get();
    })
    .then((response: any) => {
      return response.value;
    });
};
