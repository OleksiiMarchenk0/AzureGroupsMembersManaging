import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import GetMembers from "./GetMembers/GetMembers";
import GetGroups from "./GetGroups/GetGroups";
import AddMember from "./AddMember/AddMember";

import { getMembersService } from "../services/getMembersService";
import { getGroupsService } from "../services/getGroupsService";
import { removeMemberService } from "../services/removeMemberService";
import { setMembersService } from "../services/setMembersService";
import { getADUserService } from "../services/getADUserService";


import { GetOwnedGroups } from "../helper/GetOwnedGroups";
import { IMember } from "./GetMembers/IMember";
import { IAzureGroupsMembersManagingProps } from "./IAzureGroupsMembersManagingProps";


function AzureGroupsMembersManaging(props: IAzureGroupsMembersManagingProps) {
  const { context, view } = props;
  const [chosenGroupId, setChosenGroupId] = React.useState<string>("");
  const [chosenGroupDisplayName, setChosenGroupDisplayName] = React.useState<string>("");
  const [isGroupChosen, setIsGroupChosen] = React.useState<boolean>(false);

  const [members, setMembers] = React.useState<IMember[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [groups, setGroups] = React.useState<[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<[]>([]);
  const [adusers, setadusers] = React.useState<[]>([]);

  const getChosenGroupIdAndName = (id: string,displayName:string) => {
    setChosenGroupId(id);
    setIsGroupChosen(true);
    setChosenGroupDisplayName(displayName)
    console.log(displayName);
    
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

      const membersData = await getMembersService(context, chosenGroupId);
      if (membersData) {
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


  // Get AD Users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        let users = await getADUserService(context);
        if (users) {
           const actualMemberIds: string[] = members.map(member => member.id);
          users = users.filter((user: IMember) => actualMemberIds.indexOf(user.id) === -1);
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
  }, [members]);

  // Remove user from group
  const removeUser = async (userId: string) => {
    try {
      await removeMemberService(
        context,
        chosenGroupId,
        userId
      );
      setMembers((members: IMember[]) =>
        members.filter((member: IMember) => member.id !== userId)
      );
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
    }
  };

  //Add user to group
  const addUsers = async (userId: string) => {
    try {
      const addedUser = adusers.filter((aduser: IMember) => aduser.id === userId);
      await setMembersService(context, chosenGroupId, [userId]);
      setMembers((prevMembers) => [...prevMembers, ...addedUser]);
    } catch (error) {
      console.error("Error adding members:", error);
    } finally {
    }
  };
  return (
    <section>
      <GetGroups
        context={context}
        groups={groups}
        getChosenGroupIdAndName={getChosenGroupIdAndName}
        loading={loading}
        filteredGroups={filteredGroups}
        view={view}
      />
      <GetMembers
        context={props.context}
        isGroupChosen={isGroupChosen}
        members={members}
        removeUser={removeUser}
        view={view}
        chosenGroupDisplayName={chosenGroupDisplayName}
        loading={loading}
    
      />
      <AddMember
        context={context}
        groupId={chosenGroupId}
        isGroupChosen={isGroupChosen}
        addUsers={addUsers}
        adusers={adusers}
        loading={loading}
        view={view}
        chosenGroupDisplayName={chosenGroupDisplayName}
      />
    </section>
  );
}

export default AzureGroupsMembersManaging;
