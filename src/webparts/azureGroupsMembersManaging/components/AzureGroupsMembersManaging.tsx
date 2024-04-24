import * as React from 'react';
// import styles from './AzureGroupsMembersManaging.module.scss';
// import type { IAzureGroupsMembersManagingProps } from './IAzureGroupsMembersManagingProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import GetMembers from './GetMembers/GetMembers';


import GetGroups from './GetGroups/GetGroups';
import AddMember from './AddMember/AddMember';


function AzureGroupsMembersManaging(props:any){
const {context} = props;
console.log(context.pageContext.user.displayName);

    return (
     <section>
      
     Welcome,  {context.pageContext.user.displayName}

   <GetMembers context = {props.context}/>
   <GetGroups context = {context}/>
   <AddMember context = {context}/>
     </section>
      
    );
}

export default AzureGroupsMembersManaging;