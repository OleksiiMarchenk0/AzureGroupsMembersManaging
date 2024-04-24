import { MSGraphClient } from "@microsoft/sp-http";


export const getGroupOwnersService = (context: any, groupId:string) => {
    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/groups/${groupId}/owners`)
                .version('v1.0')
                .get();
        })
        .then((response: any) => {
            return response.value;
        });
};