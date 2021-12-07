import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { clientApolloProvider, createApolloProvider } from '@vue/apollo-option'

import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri:'https://book-apigateway.herokuapp.com/'
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization":localStorage.getItem("tokenAccess") || "",
        }
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export const apolloProvider = new createApolloProvider({
    defaultClient:apolloClient
})