import configureStore from "redux-mock-store";
import thunk from 'redux-thunk'

import * as actions from "./";
import * as reducers from "reducers/menu";

const middleware = [thunk];

const mockStore = configureStore(middleware);

describe('async actions', () => {

    test('creates TOGGLE_MENU when it has been done', () => {

    const expectedActions = [
        { type: reducers.TOGGLE_MENU, state: false }
      ]
      const store = mockStore({ menu: {} })
  
      return store.dispatch(actions.toggleMenu(false)).then(() => {
        expect(expectedActions).toEqual(store.getActions())
      })
    })
});

describe('reducers', () => {
  test('should handle Menu reducer', () => {
    expect(reducers.menu(undefined, {})).toEqual({
      open: true
    })
  })

  test('should handle Menu reducer adding TOGGLE_MENU', () => {
    expect(reducers.menu(undefined, { type: reducers.TOGGLE_MENU, state: false })).toEqual({
      open: false 
    })
  })
})