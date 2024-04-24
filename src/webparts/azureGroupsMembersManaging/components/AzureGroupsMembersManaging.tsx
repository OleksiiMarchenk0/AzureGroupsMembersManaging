import * as React from 'react';
// import styles from './AzureGroupsMembersManaging.module.scss';
// import type { IAzureGroupsMembersManagingProps } from './IAzureGroupsMembersManagingProps';
// import { escape } from '@microsoft/sp-lodash-subset';

//import GetMembers from './GetMembers/GetMembers';
import GetGroups from './GetGroups/GetGroups';


function AzureGroupsMembersManaging(props:any){


    return (
     <section>
      
      {props.context.pageContext.web.title}
   {/* <GetMembers context = {props.context}/> */}
   <GetGroups context = {props.context}/>
     </section>
      
    );
}

export default AzureGroupsMembersManaging;