import ApolloClient from "apollo-boost";

// @ts-ignore
import { buildQueryFactory } from './ra-data-hasura-graphql-src/buildQuery';
// @ts-ignore
import buildVariables from './ra-data-hasura-graphql-src/buildVariables';
// @ts-ignore
import {
  buildGqlQuery,
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
  // @ts-ignore
} from './ra-data-hasura-graphql-src/buildGqlQuery';
// @ts-ignore
import getResponseParser from './ra-data-hasura-graphql-src/getResponseParser';
// @ts-ignore
import * as gqlTypes from 'graphql-ast-types-browser';
import config from "../../config";



export const client = new ApolloClient({
  uri: config.graphqlEndpoint,
  get headers () {
    // do a getter cuz we want this to be "reactive"
    const jwt = localStorage.getItem("login_jwt")
    return ({
      ...(jwt && {Authorization: `Bearer ${jwt}`})
    })
  }
});

export const buildFieldsCustom =  (type: { name: string; }) => {
  let res = buildFields(type);
  if (type.name === 'courses') {
    // here we add additional fields we want to query for apps.
    // we are using the graphql-ast-types functions which is ast representation for graphql
    res.push(...[
      gqlTypes.field(
        gqlTypes.name('course_instructors'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('instructorId')),
          gqlTypes.field(
            gqlTypes.name('instructor'),
            null,
            null,
            null,
            gqlTypes.selectionSet([
              gqlTypes.field(gqlTypes.name('id')),
              gqlTypes.field(gqlTypes.name('firstname')),
              gqlTypes.field(gqlTypes.name('lastname')),
            ])
          ),
        ])
      ),
      gqlTypes.field(
        gqlTypes.name('course_contents'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('contentId')),
          gqlTypes.field(gqlTypes.name('order')),
          gqlTypes.field(
            gqlTypes.name('content'),
            null,
            null,
            null,
            gqlTypes.selectionSet([
              gqlTypes.field(gqlTypes.name('id')),
              gqlTypes.field(gqlTypes.name('title')),
              gqlTypes.field(gqlTypes.name('url')),
            ])
          ),
        ])
      ),
    ]);
  }
  return res;
};


const buildGqlQueryCustom = (iR: any) =>
  buildGqlQuery(
    iR,
    buildFieldsCustom,
    buildMetaArgs,
    buildArgs,
    buildApolloArgs
  );

export const buildQuery = buildQueryFactory(
  buildVariables,
  buildGqlQueryCustom,
  getResponseParser
);