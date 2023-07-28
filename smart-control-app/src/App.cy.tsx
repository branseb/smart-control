import { CssBaseline, ThemeProvider } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { mount } from 'cypress/react'
import { RouterProvider, createMemoryRouter, redirect } from 'react-router-dom'
import { config } from './config.ts'
import { routes } from './router.tsx'
import { theme } from './theme.ts'
import { SetAtom } from './components/setAtom.tsx'
import { fakeDeviceDetail, fakeDeviceItems, fakeUser } from '../mocks/fakeresponses.ts'

const router = createMemoryRouter(routes)

describe('App component', () => {

  const interceptAndMount = () => {
    cy.intercept('GET', '/Devices/user', fakeUser).as('user');
    cy.intercept('GET', '/Devices', fakeDeviceItems).as('devices');
    cy.intercept('GET', '/Devices/detail?id=000001', fakeDeviceDetail).as('deviceDetail');
    cy.intercept('POST','/Device/pair?id=idtestid&pin=pintest', {statusCode: 200}).as('pairdevice');
    cy.intercept('POST','/Device/addRole?email=addroletest@test.com&deviceId=000001&roleStatus=0', {statusCode:200}).as('adduserrole');
    mount(
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={config.clientId}>
          <CssBaseline><SetAtom />
            <RouterProvider router={router} />
          </CssBaseline>
        </GoogleOAuthProvider>
      </ThemeProvider>
    )
  };

  const getByDataTest = (value: string) =>
    cy.get(`[data-test~="${value}"]`);
  
  it('header and login button are visibled', () => {
    interceptAndMount();
    getByDataTest("login-button").should('be.visible');
    getByDataTest('toolbar').should('be.visible');
  });

  it('logout check', () => {
    interceptAndMount();
    getByDataTest('login-button').click();
    getByDataTest('logout-button').should('be.visible').click();
    getByDataTest('item').should('have.length', 0);

  });

  it('home page have a addDevice Button and dialog', () => {
    interceptAndMount();
    cy.wait('@user');
    getByDataTest('pair-device-button').should('be.visible').click();
    getByDataTest('pair-device-dialog').should('be.visible');
  });

  it('3 Devices its visibled', () => {
    interceptAndMount();
    cy.wait('@user');
    cy.wait('@devices')
    getByDataTest("item").should('be.visible').should('have.length', 3).eq(0);

  });

  it('pairing device', () => {
    interceptAndMount();
    cy.wait('@user');
    cy.wait('@devices');
    getByDataTest('pair-device-button').click();
    getByDataTest('pair-device-id').click().type('idtestid');
    getByDataTest('pair-device-pin').click().type('pintest');
    getByDataTest('confirm-pair-device-button').should('be.visible').click();
    cy.wait('@pairdevice');
    getByDataTest('pair-device-dialog').should('not.exist');

  });

  it('adding user role',()=>{
    interceptAndMount();
    cy.wait('@user');
    getByDataTest('item').eq(0).click();
    cy.wait('@deviceDetail');
    getByDataTest('users-add-user').should('be.visible').children('button').eq(0).click();
    getByDataTest('role-user-email').type('addroletest@test.com');
    getByDataTest('confirm-user-role').should('be.visible').click();
    cy.wait('@adduserrole');
  })

  it('onDevice item click navigate to device detail', () => {
    interceptAndMount();
    cy.wait('@user');
    getByDataTest('item').eq(0).click();
    cy.wait('@deviceDetail')
    getByDataTest('item').should('be.visible')
  });

  it('3 sensor-items on detail page are visibled', () => {
    interceptAndMount();
    cy.wait('@user');
    getByDataTest('item').eq(0).click();
    cy.wait('@deviceDetail')
    getByDataTest('item').should('be.visible').should('have.length', 3);
  });


})

