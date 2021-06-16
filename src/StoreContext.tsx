import React from 'react';
import store, {StoreType} from "./Redux/Store";
const StoreContext = React.createContext({} as StoreType );


type ProviderType = {
    children: React.ReactNode
    store:StoreType
}
export const Provider = (props:ProviderType) => {
    return  <StoreContext.Provider value={props.store}>
        {props.children}
        </StoreContext.Provider>
}

export default StoreContext;