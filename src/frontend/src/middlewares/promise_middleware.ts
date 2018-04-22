import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
  } from 'redux';
  
  import { AppAction } from '@src/types';
  
  const promiseMiddlewareHandler = (api: MiddlewareAPI) => 
    (next: Dispatch) => 
      <P, M>(action: AppAction<P, M>) => {
  
    // window.console.log('will dispatch', action);
  
    if (action.payload instanceof Promise) {
      return action.payload.then((value) => {
        const resolvedAction: AppAction<P, M> = { type: action.type };
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
    return promiseMiddlewareHandler as Middleware;
  }
  