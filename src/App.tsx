import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { CourseList, CourseCreate, CourseEdit, CourseShow } from './courses';
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions
} from "react-admin-firebase";
import {ContentCreate, ContentEdit, ContentList, ContentShow} from "./contents";
import {InstructorCreate, InstructorEdit, InstructorList, InstructorShow} from './instructors'
import { NotificationList, NotificationShow, NotificationCreate } from "./notifications";

const config = require("./FIREBASE_CONFIG.js").firebaseConfig;

const options: RAFirebaseOptions = {
  logging: process.env.NODE_ENV != 'production',
  // rootRef: "/",
  //   dontwatch: ['courses', 'Instructors', 'contents']
};
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource
          name="courses"
          list={CourseList}
          show={CourseShow}
          create={CourseCreate}
          edit={CourseEdit}
        />

        <Resource
          name="Instructors"
          list={InstructorList}
          show={InstructorShow}
          create={InstructorCreate}
          edit={InstructorEdit}
        />

        <Resource
          name="contents"
          list={ContentList}
          show={ContentShow}
          create={ContentCreate}
          edit={ContentEdit}
        />

        <Resource
          name="Notifications"
          list={NotificationList}
          show={NotificationShow}
          create={NotificationCreate}
        />
        
        {/*<Resource*/}
        {/*  name="posts"*/}
        {/*  list={PostList}*/}
        {/*  show={PostShow}*/}
        {/*  create={PostCreate}*/}
        {/*  edit={PostEdit}*/}
        {/*/>*/}
      </Admin>
    );
  }
}

export default App;
