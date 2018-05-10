import {
  Action,
  Dispatch,
  Middleware,
  MiddlewareAPI
} from 'redux';

export function loggingMiddleware(): Middleware {
  return (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    window.console.log('will dispatch', action);
    return next(action);  
  };
}
