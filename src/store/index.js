import { init } from '@rematch/core';
import { user } from './user';
import { login } from './login';
const models = {user,login };

const store = init({ models });

export default store;
