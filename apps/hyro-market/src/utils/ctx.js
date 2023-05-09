import { createContext, useContext } from 'react';

/**
 * A generic function that can be used to create contexts
 * @param contextName A string - The name of the context to be created
 * @returns **useCtx** - A hook that deals with the default and the undefined check of useContext and return context whic can be used to consume the context
 * @returns **ctx.Provider** - A Context provider component which can be used to create our specific provider component containing our required state
 */
export const createCtx = (contextName) => {
    const ctx = createContext(undefined);

    const useCtx = () => {
        const context = useContext(ctx);
        if (!context) throw new Error(`Expected to be in a ${contextName} context, but was not.`);
        return context;
    };

    return [useCtx, ctx.Provider];
};
