import { ActionReducerMap } from '@ngrx/store';
import * as Section from '@entities/section/model/section.reducer';
import { SectionEffects } from '@entities/section/model/section.effects';

export interface AppState {
    sections: Section.SectionState;
}

export const appReducers: ActionReducerMap<AppState> = {
    sections: Section.sectionReducer,
};

export const appEffects = [SectionEffects];
