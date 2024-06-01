import * as React from "react";
import {
  MessageBar,
  MessageBarType,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import {  IListMembersSimplestPropsForExtend } from "./IListMembersProps";
import { Persona, DefaultButton } from "@fluentui/react";
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import styles from "./RenderMembers.module.scss"; // Import the SCSS file
import userStyles from "../AddMember/RenderADMembers.module.scss";
import { IMember } from "./IMember";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";

export default function RenderExtendMembers(
  props: IListMembersSimplestPropsForExtend
): JSX.Element {
  const { members, removeUser, isGroupChosen, chosenGroupDisplayName,usersPerPage } = props;
  const [searchText, setSearchText] = React.useState<string>("");
  console.log(chosenGroupDisplayName);

  // Filter members based on search text
  const filteredMembers = searchText
    ? members.filter(
        (member) =>
          member.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !==
          -1
      )
    : members;

  const [currentPage, setCurrentPage] = React.useState(1);
  const membersPerPage:number = usersPerPage;

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember,indexOfLastMember);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const onPageChange = (page:number):void=>{
    setCurrentPage(page);
  }
  return (
    <>
      {isGroupChosen && (
        <>
          <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
            {`${strings.Members.label} ${chosenGroupDisplayName}`}
          </Text>
          {members && members.length > 0 ? (
            <>
              <TextField
                label={strings.Members.searchLabel}
                value={searchText}
                onChange={(event, newValue) => setSearchText(newValue || "")}
              />
              <Stack className={userStyles.usersContainer}>
                {currentMembers.map((member: IMember) => (
                  <div
                    key={member.id}
                    className={mergeStyles(
                      styles.memberContainer,
                      styles.memberContainer__extended
                    )}
                  >
                    <Persona
                      imageUrl={member.imageUrl}
                      text={member.displayName}
                      secondaryText={member.jobTitle}
                    />
                    <DefaultButton
                      onClick={() => removeUser(member.id)}
                      iconProps={{ iconName: "Cancel" }}
                      className={mergeStyles(
                        styles.cancelButton,
                        styles.cancelButton__extended
                      )}
                    />
                  </div>
                ))}
                <Stack styles={{ root: { width: "100%" } }}>
                <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange}/>
                </Stack>
               
              </Stack>
            </>
          ) : (
            <MessageBar
              styles={{ root: { marginTop: "5px" } }}
              messageBarType={MessageBarType.warning}
            >
              {strings.Members.noMembersFoundWarning}
            </MessageBar>
          )}

        </>
      )}
    </>
  );
}
