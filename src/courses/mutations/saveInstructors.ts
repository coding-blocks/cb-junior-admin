import {client} from "../../lib/dataProvider";
import {gql} from '@apollo/client';
import { difference } from 'ramda';

const MUTATION_ADD = gql`
  mutation ($values: [course_instructors_insert_input!]!) {
  insert_course_instructors(objects: $values) {
    affected_rows
  }
}`


const MUTATION_DELETE = gql`
mutation ($courseId: Int!, $instructorIds: [Int!]!) {
  delete_course_instructors(where: {_and: {courseId: {_eq: $courseId}, instructorId: {_in: $instructorIds}}}) {
    affected_rows
  }
}`

const QUERY = gql`
query ($courseId: Int){
  course_instructors (where: {courseId: { _eq: $courseId }}) {
    id
    courseId
    instructorId
  }
}`


export default async function (course: any) {
  // get existing data
  const {id: courseId, instructorIds: newInstructorIds} = course

  const {data} = await client.query({
    query: QUERY,
    variables: {courseId},
    fetchPolicy: 'network-only' // make sure not to pickup from cache
  })


  const oldInstructorIds: number[] = data.course_instructors.map(ci => ci.instructorId)

  // @ts-ignore
  const toAdd : number[] = difference(newInstructorIds, oldInstructorIds);
  // @ts-ignore
  const toRemove: number[] = difference(oldInstructorIds, newInstructorIds)

  // delete old instructors
  await (toRemove.length && client.mutate({
    mutation: MUTATION_DELETE,
    variables: {
      courseId,
      instructorIds: toRemove
    }
  }))

  // add new ones
  await client.mutate({
    mutation: MUTATION_ADD,
    variables: {
      values: toAdd.map(instructorId => ({
        courseId,
        instructorId
      }))
    }
  })

  // FIN.
}

