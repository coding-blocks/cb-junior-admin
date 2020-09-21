type ConfigSet = {
  graphqlEndpoint: string,
  apiEndpoint: string
}

const configs = {
  development: <ConfigSet>{
    graphqlEndpoint: 'http://localhost:8080/v1/graphql',
    apiEndpoint: 'http://localhost:4343/api/',
  },
  production: <ConfigSet>{
    graphqlEndpoint: '',
    apiEndpoint: ''
  }
}

const loadConfigForEnv : (string?) => ConfigSet = (env = process.env.NODE_ENV) => configs[env]

export default loadConfigForEnv()