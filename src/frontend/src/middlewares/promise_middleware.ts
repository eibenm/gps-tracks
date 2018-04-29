import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
    Action
  } from 'redux';

  interface AppAction<P, M> extends Action {
    payload?: P;
    meta?: M;
  }
  
  const promiseMiddlewareHandler = (api: MiddlewareAPI) => 
    (next: Dispatch) => 
      <P, M>(action: AppAction<P, M>) => {
  
    window.console.log('will dispatch', action);
  
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
    return promiseMiddlewareHandler;
  }

// import {
//   Middleware,
//   MiddlewareAPI,
//   Action,
//   AnyAction
// } from 'redux';

// type PromiseDispatch = <T extends Action>(promise: Promise<T>) => Promise<T>;

// const promiseMiddlewareHandler: Middleware<PromiseDispatch> = ({
//   dispatch
// }: MiddlewareAPI) => next => <T extends Action>(
//   action: AnyAction | Promise<T>
// ) => {
//   if (action instanceof Promise) {
//     action.then(dispatch);
//     return action;
//   }

//   return next(action);
// };

// export function promiseMiddleware(): Middleware {
//   return promiseMiddlewareHandler;
// }
