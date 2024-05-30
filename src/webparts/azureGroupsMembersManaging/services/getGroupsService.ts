import { MSGraphClient } from "@microsoft/sp-http";


export const getGroupsService = (context: any):Promise<any> => {
    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
                .api('/groups')
                .version('v1.0')
                .get()
             
        })
        .then((response: any) => {
            return response.value;
        });
};
