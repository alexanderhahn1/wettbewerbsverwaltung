export class MockKeycloakService {
  isLoggedIn() {
    return Promise.resolve(true)
  }

  getToken() {
    return Promise.resolve('mock-token')
  }

  getUsername() {
    return 'test-user'
  }

  getUserRoles() {
    return []
  }

  getKeycloakInstance() {
    return {
      tokenParsed: {
        distinguishedNames: [],
        realm_access: {
          roles: []
        }
      }
    }
  }

  loadUserProfile() {
    return Promise.resolve({
      username: 'test-user',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com'
    })
  }

  login() {}
  logout() {}
}
