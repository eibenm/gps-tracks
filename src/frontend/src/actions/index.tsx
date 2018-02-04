import * as constants from '../constants';

export interface GetTestAction {
  type: constants.TEST;
  payload: Promise<object>;
}

export interface GetTestAgainAction {
  type: constants.TEST_AGAIN;
}

export type AppAction = GetTestAction | GetTestAgainAction;

export const getTest = (): AppAction => {
  return {
    type: constants.TEST,
    payload: fetch('http://localhost:82/test.php', {
      method: 'GET'
    }).then(response => response.json())
  };
};

export const getTestAgain = (): AppAction => {
  return {
    type: constants.TEST_AGAIN
  };
};
