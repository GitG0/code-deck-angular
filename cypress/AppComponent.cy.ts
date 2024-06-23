import { AppComponent } from '../src/app/app.component'

describe('AppComponent.cy.ts', () => {
  it('mounts', () => {
    cy.mount(AppComponent)
  })
})