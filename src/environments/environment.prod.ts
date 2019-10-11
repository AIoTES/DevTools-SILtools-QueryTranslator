/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthJWTToken } from '@nebular/auth';
export const environment = {
  production: true,
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
