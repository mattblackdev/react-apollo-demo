import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import UserForm from './UserForm'

const Signup = ({ mutate }) => (
  <UserForm title="Signup" mutate={mutate} updateWith="signup" />
)

const mutation = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`

export default graphql(mutation)(Signup)
