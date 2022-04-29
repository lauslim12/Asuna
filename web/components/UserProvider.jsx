import PropTypes from 'prop-types';
import { useEffect, useMemo, useReducer } from 'react';

import { post } from '../utils/apiHelper';
import UserContext, { defaultState } from '../utils/userContext';

/**
 * Reducer to help manage global state.
 */
const UserReducer = (initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...initialState,
        isAuthenticated: true,
      };

    case 'logout':
      return {
        ...initialState,
        isAuthenticated: false,
      };

    case 'fail':
      return {
        ...initialState,
        isAuthenticated: false,
      };

    default:
      throw new Error(`Reducer does not support the action type '${action.type}'!`);
  }
};

/**
 * Provider function to help provide the values for the Context.
 */
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, defaultState);

  /**
   * First things first, when first time loading a component, authenticate a user quickly.
   */
  useEffect(() => {
    post({ key: 'check_auth_key' }, '/api/checkAuth')
      .then((res) => {
        if (res.status === 'success') {
          return dispatch({ type: 'login' });
        }

        return dispatch({ type: 'fail' });
      })
      .catch(() => dispatch({ type: 'fail' }));
  }, []);

  /**
   * Memorize the states to prevent unnecessary re-renders.
   */
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  /**
   * Return a new provider.
   */
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
