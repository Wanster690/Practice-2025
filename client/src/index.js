import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import deviceStore from './store/DeviceStore';

export const Context = createContext({
    user: new UserStore(),
    device: deviceStore,
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: deviceStore,
    }}>
        <App />

    </Context.Provider>
);
