import * as React from "react";
import { useEffect } from "react";
import { getGroupsService } from "../../services/getGroupsService";
import { RecognizeIsUserGlobalAdminHelper } from "../../helper/RecognizeIsUserGlobalAdminHelper";
import { GetOwnedGroups } from "../../helper/GetOwnedGroups";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import RenderGroups from "./RenderGroups";

export default function GetGroups(props: any) {
  const [groups, setGroups] = React.useState<[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const templateRoleId = "62e90394-69f5-4237-9190-012177145e10";
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const { context } = props;

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
  }, []);

  //Getting filteredGroups
  useEffect(() => {
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

  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
          {isAdmin === null ? (
            <p>Loading...</p>
          ) : isAdmin ? (
            <>
              {" "}
              <RenderGroups
                groups={groups}
                getChosenGroupId={props.getChosenGroupId}
              />
            </>
          ) : (
            <>
              <RenderGroups
                groups={filteredGroups}
                getChosenGroupId={props.getChosenGroupId}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
