import * as React from "react";
import { useEffect } from "react";
import { RecognizeIsUserGlobalAdminHelper } from "../../helper/RecognizeIsUserGlobalAdminHelper";
import RenderExtendGroupsView from "./RenderExtendGroupsView";
import RenderSimpleGroupsView from "./RenderSimpleGroupsView";
import {  IGetGroupSimpleProps } from "./IGroupProps";
import { Spinner, SpinnerSize } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";


export default function GetGroups(props: IGetGroupSimpleProps):JSX.Element {
const{context, groups, filteredGroups , loading, getChosenGroupIdAndName, view,  chosenGroupId} = props;


const templateRoleId = "62e90394-69f5-4237-9190-012177145e10";
const [isAdmin, setIsAdmin] = React.useState<boolean>(false);



  // set isAdmin
  useEffect(() => {
    async function checkAdminStatus():Promise<void> {
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

    checkAdminStatus().catch((error)=>{
      console.log(error);
      
    });
  }, [context, templateRoleId]);


  return (
    <div style={{ marginTop: '15px', marginBottom: '15px' }}>
      {loading ? (
         <Spinner size={SpinnerSize.large} label={strings.Group.loadingProgressLabel} />
      ) : (
        <div>
    <>
              {view === "Extended" ? (
              <RenderExtendGroupsView isAdmin={isAdmin} groups={groups} filteredGroups={filteredGroups} getChosenGroupIdAndName={getChosenGroupIdAndName}  chosenGroupId={chosenGroupId} />
              ) : (
                <RenderSimpleGroupsView  isAdmin={isAdmin} groups={groups} filteredGroups={filteredGroups} getChosenGroupIdAndName={getChosenGroupIdAndName} chosenGroupId={chosenGroupId}/>
              )}
            </>          
        </div>
      )}
    </div>
  );
}
