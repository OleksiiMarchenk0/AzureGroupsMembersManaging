import * as React from "react";
// import styles from './AzureGroupsMembersManaging.module.scss';
// import type { IAzureGroupsMembersManagingProps } from './IAzureGroupsMembersManagingProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import GetMembers from "./GetMembers/GetMembers";

import GetGroups from "./GetGroups/GetGroups";
import AddMember from "./AddMember/AddMember";


function AzureGroupsMembersManaging(props: any) {
  const { context } = props;
  const [chosenGroupId, setChosenGroupId] = React.useState<string>("");

  const getChosenGroupId = (id: string) => {
    console.log(`${id} - test`);
    setChosenGroupId(id);
  };

  return (
    <section>


      <GetGroups context={context} getChosenGroupId={getChosenGroupId} />
      <GetMembers context={props.context} groupId={chosenGroupId} />
      <AddMember context={context} groupId={chosenGroupId} />
    </section>
  );
}

export default AzureGroupsMembersManaging;
