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
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  ReferenceArrayField,
  ImageField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ImageInput,
  UrlField,
  SelectArrayInput
} from "react-admin";

import RichTextInput from "ra-input-rich-text";
import OrderedArrayInput from "./lib/OrderedArrayInput";


const AUDIENCE_VALUES = ['1st - 4th', '5th - 8th', '9th - 10th', '11th - 12th'];

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

      <SelectArrayInput source="audience" choices={AUDIENCE_VALUES.map(a => ({name: a}))} optionValue="name" />

      <ReferenceArrayInput
          label="Instructors"
          source="instructorIds"
          reference="Instructors"
          filterToQuery={ (searchText :any) => ({ firstname: searchText })}
      >
        <AutocompleteArrayInput optionText='firstname'/>
      </ReferenceArrayInput>

      <ReferenceArrayInput label="contents" source="contents" reference="contents"
                           filterToQuery={ (searchText :any) => ({ title: searchText })}
      >
        <OrderedArrayInput>
          <AutocompleteArrayInput optionText='title' />
        </OrderedArrayInput>
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


      <SelectArrayInput source="audience" choices={AUDIENCE_VALUES.map(a => ({name: a}))} optionValue="name" />

      <ReferenceArrayInput
        label="Instructors"
        source="instructorIds"
        reference="Instructors"
        filterToQuery={ (searchText :any) => ({ firstname: searchText })}
        >
        <AutocompleteArrayInput optionText='firstname' allowEmpty/>
      </ReferenceArrayInput>

      <ReferenceArrayInput label="contents" source="contents" reference="contents"
                           filterToQuery={ (searchText :any) => ({ title: searchText })}
      >
        <OrderedArrayInput>
          <AutocompleteArrayInput optionText='title' />
        </OrderedArrayInput>
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
