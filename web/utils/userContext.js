import { createContext } from 'react';

/**
 * Default state for Context.
 */
export const defaultState = {
  isAuthenticated: false,
};

/**
 * Creation of a new Context.
 */
const UserContext = createContext(defaultState);

export default UserContext;
