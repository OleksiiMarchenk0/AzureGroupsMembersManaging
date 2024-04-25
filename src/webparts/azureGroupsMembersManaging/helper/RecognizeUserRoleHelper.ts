import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGlobalAdminsService } from "../services/getGlobalAdminsService";
import { getMeService } from "../services/getMeService";

export function RecognizeUserRoleHelper(context:WebPartContext, templateRoleId:string){

      //Get logged user
   const me =    getMeService(context)
      .then((res:any)=>res);
  
  
      // Getting global admins
    const globalAdmins =   getGlobalAdminsService(context, templateRoleId)
       .then((res:any)=>res)

       Promise.all([me, globalAdmins])
       .then(function (results) {
         const whoami = results[0];
         const admins = results[1];

         console.log(whoami);
         console.log(admins);
         
         
       });
       
       
       
}