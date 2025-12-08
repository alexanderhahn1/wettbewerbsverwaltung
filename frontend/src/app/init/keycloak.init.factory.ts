import { KeycloakService} from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService):() => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'demo',
        clientId: 'demo-client',
      },
      /*
      config: {
        url: 'https://auth.htl-leonding.ac.at/',
        realm: 'wettbewerbsdatenbank',
        clientId: 'angular-client',
      },
       */
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets', '/public']
    })
}
