import { MSGraphClient } from "@microsoft/sp-http";


export const removeMemberService = (context: any, groupId:string, userId:string) => {
   

    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/groups/${groupId}/members/${userId}/$ref`)
                .version('v1.0')
                .delete();
        })
        .then((response: Response) => {
            return response;
        });
};