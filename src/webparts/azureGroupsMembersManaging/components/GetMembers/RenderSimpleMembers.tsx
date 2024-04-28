import * as React from "react";
import {
  Text,
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";

import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import styles from "./RenderMembers.module.scss";
import { IMember } from "./IMember";
import { IListMembersSimplestProps } from "./IListMembersProps";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";
export default function RenderSimpleMembers(props: IListMembersSimplestProps) {
  const { members, removeUser, isGroupChosen, chosenGroupDisplayName } = props;
  const [searchText, setSearchText] = React.useState<string>("");

  // Filter members based on search text
  const filteredMembers = searchText
    ? members.filter(
        (member) =>
          member.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !==
          -1
      )
    : members;

  return (
    <>
      {isGroupChosen && (
        <>
          <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
            {strings.Members.label} {chosenGroupDisplayName}
          </Text>
          {members && members.length > 0 ? (
            <>
              <TextField
                label={strings.Members.searchLabel}
                value={searchText}
                onChange={(event, newValue) => setSearchText(newValue || "")}
              />
              {filteredMembers.map((member: IMember) => (
                <div
                  key={member.id}
                  className={mergeStyles(styles.memberContainer)}
                >
                  <Persona
                    imageUrl={member.imageUrl}
                    text={member.displayName}
                    size={PersonaSize.size32}
                  />
                  <DefaultButton
                    onClick={() => removeUser(member.id)}
                    iconProps={{ iconName: "Cancel" }}
                    className={mergeStyles(
                      styles.cancelButton,
                      styles.cancelButton__simple
                    )}
                    styles={{
                      root: { height: 24, minWidth: 24, lineHeight: 24 },
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <MessageBar messageBarType={MessageBarType.warning}>
              {strings.Members.noMembersFoundWarning}
            </MessageBar>
          )}
        </>
      )}
    </>
  );
}
