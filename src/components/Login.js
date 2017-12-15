import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import UserForm from './UserForm'

const Login = ({ mutate }) => (
  <UserForm title="Login" mutate={mutate} updateWith="login" />
)

const mutation = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`

export default graphql(mutation)(Login)
