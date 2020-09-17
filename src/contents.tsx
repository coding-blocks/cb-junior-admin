// in src/posts.js
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
  SelectInput,
  FileField,
  FileInput,
  UrlField,
  BooleanInput,
  BooleanField,
  DateTimeInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";

const ContentFilter = (props: any) => {
  return (<Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>);
};

export const ContentList = (props: any) => (
  <List {...props} filters={<ContentFilter />}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="type" />
      <ShowButton label="" />
      <EditButton label="" />
      {/*<DeleteButton label="" />*/}
    </Datagrid>
  </List>
);

export const ContentShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="type" />
      {/*<YouTube videoId={getYouTubeID("url")}*/}
      <UrlField source="url" />
      <BooleanField source="isLive" />
    </SimpleShowLayout>
  </Show>
);

export const ContentCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput
          source="type"
          choices={[
            { id: 'ytvideo', name: "Youtube Video" },
          ]}
      />
      <TextInput source="url" />
      <DateTimeInput source="published_at" />
      <BooleanInput label="Live"source="isLive" />
    </SimpleForm>
  </Create>
);

export const ContentEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      {/* <DisabledInput source="id" /> */}
      <TextInput source="title" />
      <SelectInput
          source="type"
          choices={[
            { id: 'ytvideo', name: "Youtube Video" },
          ]}
      />
      <TextInput source="url" />
      <DateTimeInput source="published_at" />
      <BooleanInput label="Live"source="isLive" />
    </SimpleForm>
  </Edit>
);
