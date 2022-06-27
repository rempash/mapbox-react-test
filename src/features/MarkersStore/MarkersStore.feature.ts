import React from "react";
import MarkersStore from './classes/MarkersStore.class';

/*
    issue: we can't save markers links to redux store due
    they should be serializable, so we use specific class
    to manage markers links, and we give access to them through
    react context feature
*/
export const MarkerStoreContext = React.createContext(MarkersStore);
