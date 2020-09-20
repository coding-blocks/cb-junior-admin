import {client} from "../../lib/dataProvider";
import {gql} from '@apollo/client';
import { difference } from 'ramda';

const MUTATION_ADD = gql`
  mutation ($values: [course_contents_insert_input!]!) {
  insert_course_contents(objects: $values) {
    affected_rows
  }
}`


const MUTATION_DELETE = gql`
mutation ($courseId: Int!, $contentIds: [Int!]!) {
  delete_course_contents(where: {_and: {courseId: {_eq: $courseId}, contentId: {_in: $contentIds}}}) {
    affected_rows
  }
}`

const QUERY = gql`
query ($courseId: Int){
  course_contents (where: {courseId: { _eq: $courseId }}) {
    id
    courseId
    contentId
  }
}`

const UPDATE = gql`
mutation ($courseId: Int!, $contentId: Int!, $order: Int!) {
  update_course_contents_by_pk(pk_columns: {courseId: $courseId, contentId: $contentId}, _set: {order: $order}) {
    id
  }
}`


export default async function (course: any) {
  // get existing data
  const {id: courseId, contentIds: newContentIds} = course

  const {data} = await client.query({
    query: QUERY,
    variables: {courseId},
    fetchPolicy: 'network-only' // make sure not to pickup from cache
  })


  const oldContentIds: number[] = data.course_contents.map(cc => cc.contentId)

  // @ts-ignore
  const toAdd : number[] = difference(newContentIds, oldContentIds);
  // @ts-ignore
  const toRemove: number[] = difference(oldContentIds, newContentIds)


  console.log(oldContentIds, newContentIds, toAdd, toRemove)

  // delete old instructors
  await (toRemove.length && client.mutate({
    mutation: MUTATION_DELETE,
    variables: {
      courseId,
      contentIds: toRemove
    }
  }))

  // add new ones
  await client.mutate({
    mutation: MUTATION_ADD,
    variables: {
      values: toAdd.map(contentId => ({
        courseId,
        contentId
      }))
    }
  })

  // set Order
  await Promise.all(newContentIds.map((contentId, index) => client.mutate({
    mutation: UPDATE,
    variables: {
      contentId,
      courseId,
      order: index
    }
  })))


  // FIN.
}

