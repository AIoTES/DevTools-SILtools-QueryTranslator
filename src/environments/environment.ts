/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { NbAuthJWTToken } from '@nebular/auth';

export const environment = {
  production: false,
  apiServer: {
    endpoints: {
      base: '/api',
      register: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
      queryTranlation: "http://localhost:4570/querytranslation"
    },
    token: {
      class: NbAuthJWTToken,
      key: 'Data.token', // this parameter tells auth mechanism where to look for the token
    }
  },
};
