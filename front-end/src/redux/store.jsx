import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './projectReducer';

const store=configureStore({
    reducer:rootReducer,
});

export default store;