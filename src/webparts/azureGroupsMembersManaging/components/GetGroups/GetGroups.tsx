import * as React from "react";
import { useEffect } from "react";
import { RecognizeIsUserGlobalAdminHelper } from "../../helper/RecognizeIsUserGlobalAdminHelper";
//import RenderGroups from "./RenderGroups";
import RenderExtendGroupsView from "./RenderExtendGroupsView";


export default function GetGroups(props: any) {
const{context, groups, filteredGroups , loading, getChosenGroupIdAndName, view} = props;


  const templateRoleId = "62e90394-69f5-4237-9190-012177145e10";
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
console.log(`Choosed ${view }view`);


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


  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
    <>
              {view === "Extended" ? (
              <RenderExtendGroupsView isAdmin={isAdmin} groups={groups} filteredGroups={filteredGroups} getChosenGroupIdAndName={getChosenGroupIdAndName} />
              ) : (
                <div>Normal view</div>
              )}
            </>          
        </div>
      )}
    </div>
  );
}
