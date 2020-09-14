// in src/Instructors.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  ImageField,
  ImageInput,
  UrlField,
  SelectArrayInput,
  BooleanField
} from "react-admin";

const AUDIENCE_VALUES = ['1st - 4th', '5th - 8th', '9th - 10th', '11th - 12th'];


const NotificationFilter = (props: any) => {
  return (<Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>);
};


export const NotificationList = (props: any) => (
  <List {...props} filters={<NotificationFilter />}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="subtitle" />
      <ShowButton label="" />
    </Datagrid>
  </List>
);

export const NotificationShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="subtitle" />
      <UrlField source="url" />
    </SimpleShowLayout>
  </Show>
);

export const NotificationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="subtitle" />
      <TextInput source="url" />
      <TextInput source="userId" />
      <SelectArrayInput source="classGroup" choices={AUDIENCE_VALUES.map(a => ({name: a}))} optionValue="name" />
      <TextInput source="courseId" />
      <BooleanField source="everyone" valueLabelTrue="Visible to everyone" valueLabelFalse="Not visible to everyone" />
    </SimpleForm>
  </Create>
);
