import { ActionReducerMap } from '@ngrx/store';
import * as Section from './section/section.reducer';
import { SectionEffects } from './section/section.effects';

export interface AppState {
  sections: Section.SectionState;
}

export const appReducers: ActionReducerMap<AppState> = {
  sections: Section.sectionReducer,
};

export const appEffects = [SectionEffects];
