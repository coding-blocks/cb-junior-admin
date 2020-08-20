// in src/Courses.js
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
  UrlField,
  SimpleFormIterator
} from "react-admin";

import OrderedFormIterator from './lib/OrderedFormIterator'
import RichTextInput from "ra-input-rich-text";

const CourseFilter = (props: any) => {
  return (<Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>);
};


export const CourseList = (props: any) => (
  <List {...props} filters={<CourseFilter />}>
    <Datagrid>
      <TextField source="title" />
      <RichTextField source="subtitle" />
      <TextField source="slug" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

export const CourseShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="subtitle" />
      <TextField source="slug" />
      <ImageField source="logo.src" />
      <ImageField source="background.src" />
      <ReferenceArrayField source="contents" label="Contents" reference="contents">
        <Datagrid>
          <TextField source="title" label="Title"/>
          <UrlField source="url" label="Url"/>
        </Datagrid>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);

export const CourseCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="subtitle" />
      <TextInput source="slug" />
      <ImageInput source="logo">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="background">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceArrayInput label="contents" source="contents" reference="contents">
        <AutocompleteArrayInput optionText="title" />
        <OrderedFormIterator />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const CourseEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      {/* <DisabledInput source="id" /> */}
      <TextInput source="title" />
      <RichTextInput source="subtitle" />
      <TextInput source="slug" />
      <ImageInput source="logo">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="background">
        <ImageField source="src" title="title" />
      </ImageInput>
      {/* <ReferenceInput
        label="Instrcutor"
        source="instructor"
        reference="Instructors"
        // filter={{ isAdmin: true }}
      >
        <SelectInput label="Instructor" optionText="firstname" />
      </ReferenceInput> */}
      <ReferenceArrayInput label="contents" source="contents" reference="contents">
        <AutocompleteArrayInput optionText='title'/>
      </ReferenceArrayInput>
      {/* <SelectInput
        source="rating"
        choices={[
          { id: 1, name: "Good" },
          { id: 2, name: "Okay" },
          { id: 3, name: "Bad" }
        ]}
      />
      <FileInput source="file" label="File" accept="application/pdf">
        <FileField source="src" title="title" />
      </FileInput> */}
    </SimpleForm>
  </Edit>
);
