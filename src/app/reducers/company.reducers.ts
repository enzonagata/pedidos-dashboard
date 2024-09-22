import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { increment } from './actions/company.actions';

export const initialState = {};

export const companyReducer = createReducer(
    initialState,
    on(increment, (state, company) => {
        return { ...state, company };
    })
);