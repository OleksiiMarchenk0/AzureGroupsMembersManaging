import * as React from "react";
// import styles from './AzureGroupsMembersManaging.module.scss';
// import type { IAzureGroupsMembersManagingProps } from './IAzureGroupsMembersManagingProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import GetMembers from "./GetMembers/GetMembers";

import GetGroups from "./GetGroups/GetGroups";
import AddMember from "./AddMember/AddMember";
import RemoveMember from "./RemoveMember/RemoveMember";

function AzureGroupsMembersManaging(props: any) {
  const { context } = props;
  console.log(context.pageContext.user.displayName);

  return (
    <section>
      Welcome, {context.pageContext.user.displayName}
      <h2> Get groups</h2>
      <GetGroups context={context} />
      <h2> Get members</h2>
      <GetMembers context={props.context} />
      
      <h2> Modify members</h2>
      <AddMember context={context} />

      <h2>Remove User</h2>
      <RemoveMember context = {context} />
    </section>
  );
}

export default AzureGroupsMembersManaging;
