import { MSGraphClient } from "@microsoft/sp-http";


export const getADUser = (context: any) => {
    return context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
            return client
            .api(`/users`)
                .version('v1.0')
                .get();
        })
        .then((response: any) => {
            console.log(response);
            
            return response.value;
        });
};