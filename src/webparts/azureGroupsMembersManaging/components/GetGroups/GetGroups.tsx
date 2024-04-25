import * as React from "react";
import { useEffect } from "react";
import { getGroupsService } from "../../services/getGroupsService";
import { IGroupProps } from "./GroupProps";
import { Button } from "@fluentui/react-components";
//import { getGroupOwnersService } from "../../services/getGroupOwnersService";
import { RecognizeIsUserGlobalAdminHelper } from "../../helper/RecognizeIsUserGlobalAdminHelper";
import { GetOwnedGroups } from "../../helper/GetOwnedGroups,";
import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { GetOwnedGroups } from "../../helper/GetOwnedGroups,";
// import { WebPartContext } from "@microsoft/sp-webpart-base";



export default function GetGroups(props: any) {
  const [groups, setGroups] = React.useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const templateRoleId = "62e90394-69f5-4237-9190-012177145e10";
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const { context } = props;
//const geID = '5c1aabf4-973a-4b60-bce1-6bf364ed5437';
  // set isAdmin
  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const isAdmin = await RecognizeIsUserGlobalAdminHelper(
          context,
          templateRoleId
        );
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    }

    checkAdminStatus();
  }, [context, templateRoleId]);

  //Getting filteredGroups
 useEffect(()=>{
  const fetchFilteredGroups = async (context:WebPartContext, groups:any) => {
    try {
      const filteredGroupsData = await GetOwnedGroups(context,groups);
      console.log(filteredGroupsData);
      setFilteredGroups(filteredGroups)
      
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
     // setLoading(false);
    }
  };

  fetchFilteredGroups(context,groups);
 },[isAdmin])

  //Getting all groups
  useEffect(() => {
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
  }, [isAdmin]);



  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
          <h2> Get groups</h2>
          {filteredGroups.map((group: IGroupProps) => (
            <div>
              <Button
                onClick={() => {
                  props.getChosenGroupId(group.id);
                }}
              >
                {group.displayName}
              </Button>
            </div>
          ))}

          {isAdmin === null ? (
            <p>Loading...</p>
          ) : isAdmin ? (
            <p>The user is an admin.</p>
          ) : (
            <p>The user is not an admin.</p>
          )}
        </div>
      )}
    </div>
  );
}
