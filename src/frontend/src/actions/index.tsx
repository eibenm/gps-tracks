import * as actions from '../constants/actions';

interface GetTestAction {
  type: actions.TEST;
  payload: Promise<object>;
}

interface GetTestAgainAction {
  type: actions.TEST_AGAIN;
}

export type AppAction = GetTestAction | GetTestAgainAction;

export const getTest = (): AppAction => {
  return {
    type: actions.TEST,
    payload: fetch('http://localhost:82/test.php', {
      method: 'GET'
    }).then(response => response.json())
  };
};

export const getTestAgain = (): AppAction => {
  return {
    type: actions.TEST_AGAIN
  };
};
