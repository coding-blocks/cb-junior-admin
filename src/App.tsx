import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { CourseList, CourseCreate, CourseEdit, CourseShow } from './courses';
import { Admin, Resource, fetchUtils } from "react-admin";
import buildHasuraProvider from 'ra-data-hasura-graphql';

import AuthProvider from "./lib/AuthProvider";
import {ContentCreate, ContentEdit, ContentList, ContentShow} from "./contents";
import {InstructorCreate, InstructorEdit, InstructorList, InstructorShow} from './instructors'
import {buildQuery, client} from "./lib/dataProvider";

// const dataProvider = buildHasuraProvider({client});
const authProvider = AuthProvider;

class App extends React.Component {
  constructor() {
    // @ts-ignore
    super();
    this.state = { dataProvider: null };
  }

  componentDidMount() {
    buildHasuraProvider({client, buildQuery}).then((dataProvider: any) => {
      console.log(dataProvider)
        this.setState({ dataProvider })
    });
  }
  render() {
    const { dataProvider } : any = this.state;
    if (!dataProvider) {
      return <div>Loading....</div>
    }

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
          name="instructors"
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
          name="posts"
          list={PostList}
          show={PostShow}
          create={PostCreate}
          edit={PostEdit}
        />
        <Resource
          name="course_instructors"
        />
      </Admin>
    );
  }
}

export default App;
