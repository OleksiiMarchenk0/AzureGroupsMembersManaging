import * as React from "react";
// import styles from './AzureGroupsMembersManaging.module.scss';
// import type { IAzureGroupsMembersManagingProps } from './IAzureGroupsMembersManagingProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import GetMembers from "./GetMembers/GetMembers";

import GetGroups from "./GetGroups/GetGroups";
import AddMember from "./AddMember/AddMember";
import { getMembersService } from "../services/getMembersService";
import { getGroupsService } from "../services/getGroupsService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { GetOwnedGroups } from "../helper/GetOwnedGroups";
import { removeMemberService } from "../services/removeMemberService";
import { setMembersService } from "../services/setMembersService";
import { getADUserService } from "../services/getADUserService";

function AzureGroupsMembersManaging(props: any) {
  const { context } = props;
  const [chosenGroupId, setChosenGroupId] = React.useState<string>("");
  const [isGroupChosen, setIsGroupChosen] = React.useState<boolean>(false);

  const [members, setMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isMemberAdded, setIsMemberAdded] = React.useState<boolean>(false);
  const [groups, setGroups] = React.useState<[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<[]>([]);
  const [adusers, setadusers] = React.useState<[]>([]);

  const getChosenGroupId = (id: string) => {
    setChosenGroupId(id);
    setIsGroupChosen(true);
    console.log("getChoswnGroupId");
    console.log(id);
  };

  //Getting all groups
  React.useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const groupsData = await getGroupsService(context);
        if (groupsData) {
          setGroups(groupsData);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGroups();
  }, []);


  //Getting filteredGroups
  React.useEffect(() => {
    const fetchFilteredGroups = async (context: WebPartContext) => {
      try {
        const { groupsData } = await GetOwnedGroups(context);
        if (groupsData) {
          setFilteredGroups(groupsData);
          console.log("witaj");
        }
      } catch (error) {
        console.error("Error occurred while fetching owned groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredGroups(context);
  }, []);
  //Getting members
  const fetchMembers = async () => {
    try {
      console.log("fetchMembers");

      const membersData = await getMembersService(context, chosenGroupId);
      if (membersData) {
        console.log(membersData);

        setMembers(membersData);
      } else {
        console.error("Error: Invalid data structure");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMembers();
  }, [chosenGroupId]);

  React.useEffect(()=>{
    console.log(isMemberAdded);
    
  }, [isMemberAdded])


  // Remove user from group
  const removeUser = async (userId: string) => {
    try {
      const response = await removeMemberService(
        context,
        chosenGroupId,
        userId
      );
      console.log(response);

      setMembers((members: any) =>
        members.filter((member: any) => member.id !== userId)
      );
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
    }
  };

  //Add user to group
  const addUsers = async (userId: string) => {
    try {
      const addedUser = adusers.filter((aduser: any) => aduser.id === userId);
      await setMembersService(context, chosenGroupId, [userId]);
      setMembers((prevMembers) => [...prevMembers, ...addedUser]);
      setIsMemberAdded(true);
    } catch (error) {
      console.error("Error adding members:", error);
    } finally {
    }
  };


  // Get AD Users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getADUserService(context);
        if (users) {
          setadusers(users);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [context]);

  return (
    <section>
      <GetGroups
        context={context}
        groups={groups}
        getChosenGroupId={getChosenGroupId}
        loading={loading}
        filteredGroups={filteredGroups}
      />
      <GetMembers
        context={props.context}
        isGroupChosen={isGroupChosen}
        members={members}
        removeUser={removeUser}
      />
      <AddMember
        context={context}
        groupId={chosenGroupId}
        isGroupChosen={isGroupChosen}
        addUsers={addUsers}
        adusers={adusers}
        loading={loading}
      />
    </section>
  );
}

export default AzureGroupsMembersManaging;
