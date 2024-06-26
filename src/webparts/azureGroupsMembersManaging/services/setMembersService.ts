import { MSGraphClient } from "@microsoft/sp-http";



export const setMembersService = (context: any, groupId:string, userIds:string[]):Promise<any> => {
    const newMembers = {
        'members@odata.bind': userIds.map(userId => `https://graph.microsoft.com/v1.0/directoryObjects/${userId}`)
    };
    



    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/groups/${groupId}`)
                .version('v1.0')
                .update(newMembers);
        })
        .then((response: Response) => {
            return response;
        });
};