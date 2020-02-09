# simple-login-system-api

Three mutations are exposed, and a query, as follows:

mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    firstName
    lastName
    email
  }
}

mutation createTokens($email: String!, $password: String!) {
  createTokens(email: $email, password: $password) {
    firstName
    lastName
    email
    authToken
    refreshToken
  }
}

mutation refreshAuthToken($refreshToken: String!) {
  refreshAuthToken(refreshToken: $refreshToken) {
    authToken
  }
}

{
  getUsers {
    firstName
    lastName
    email
  }
}
