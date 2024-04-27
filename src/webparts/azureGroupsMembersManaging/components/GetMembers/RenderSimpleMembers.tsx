import * as React from "react";
import {  Text, TextField, DefaultButton } from "@fluentui/react";
import { IListMembersProps } from "./IListMembersProps";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import styles from "./RenderMembers.module.scss";
import { IMember } from "./IMember";

export default function RenderSimpleMembers(props: IListMembersProps) {
  const { members, removeUser, isGroupChosen, chosenGroupDisplayName } = props;
  const [searchText, setSearchText] = React.useState<string>("");

  // Filter members based on search text
  const filteredMembers = searchText
    ? members.filter(member => member.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    : members;

  return (
    <>
      {isGroupChosen && (
        <>
          <h2>Members of the group {chosenGroupDisplayName}</h2>
          {members && members.length > 0 ? (
            <>
           	   <TextField
            label="Search members"
            value={searchText}
            onChange={(event, newValue) => setSearchText(newValue || "")}
          />
           {filteredMembers.map((member: IMember) => (
            <div key={member.id} className={mergeStyles(styles.memberContainer)}>
              <Persona
                imageUrl={member.imageUrl}
                text={member.displayName}
                size={PersonaSize.size32} 
              />
              <DefaultButton
                onClick={() => removeUser(member.id)}
                iconProps={{ iconName: "Cancel" }}
                className={mergeStyles(styles.cancelButton,styles.cancelButton__simple)}
                styles={{ root: { height: 24, minWidth: 24, lineHeight: 24 } }}
              />
            </div>
          ))}
           
            </>
          ) : (
            <Text>No members found</Text>
          )}
			 
        
        </>
      )}
    </>
  );
}
