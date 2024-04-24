import { MSGraphClient } from "@microsoft/sp-http";


export const getMembersService = (context: any, groupId:string) => {
    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/groups/${groupId}/members`)
                .version('v1.0')
                .get();
        })
        .then((response: any) => {
            return response.value;
        });
};