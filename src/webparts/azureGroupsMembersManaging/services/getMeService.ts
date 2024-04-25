import { MSGraphClient } from "@microsoft/sp-http";


export const getMeService = (context: any) => {
    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/me`)
                .version('v1.0')
                .get();
        })
        .then((response: any) => {
            console.log(response);
            
            return response;
        });
};