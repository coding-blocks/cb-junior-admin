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
  // DisabledInput,
  SimpleShowLayout,
  ReferenceField,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  FileField,
  FileInput,
  ReferenceInput,
  ReferenceArrayField,
  ImageField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ImageInput,
  DisabledInput
} from "react-admin";

import RichTextInput from "ra-input-rich-text";
import OrderedArrayInput from "./lib/OrderedArrayInput";

const InstructorFilter = (props: any) => {
  return (<Filter {...props}>
    <TextInput label="Search" source="firstname" alwaysOn />
  </Filter>);
};


export const InstructorList = (props: any) => (
  <List {...props} filters={<InstructorFilter />}>
    <Datagrid>
      <TextField source="firstname" />
      <TextField source="lastname" />
      <ShowButton label="" />
      <EditButton label="" />
      {/*<DeleteButton label="" />*/}
    </Datagrid>
  </List>
);

export const InstructorShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <ImageField source="photo.src" />
    </SimpleShowLayout>
  </Show>
);

export const InstructorCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <ImageInput source="photo">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const InstructorEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled={true} />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <ImageInput source="photo">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
