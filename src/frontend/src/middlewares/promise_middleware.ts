import {
  Middleware,
  MiddlewareAPI,
  Dispatch,
  Action
} from 'redux';

interface PromisMiddlewareAction<P, M> extends Action {
  payload?: P;
  meta?: M;
}

const promiseMiddlewareHandler = (api: MiddlewareAPI) => 
  (next: Dispatch) => 
    <P, M>(action: PromisMiddlewareAction<P, M>) => {

  window.console.log('will dispatch', action);

  if (action.payload instanceof Promise) {
    return action.payload.then((value) => {
      const resolvedAction: PromisMiddlewareAction<P, M> = { type: action.type };
      if (action.payload) resolvedAction.payload = value;
      if (action.meta) resolvedAction.meta = action.meta;
      api.dispatch(resolvedAction);
    }, (reason) => {
      window.console.error(`Error: ${reason}`);
    });
  }

  return next(action);
};

export function promiseMiddleware(): Middleware {
  return promiseMiddlewareHandler;
}
