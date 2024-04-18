import { createAction, props } from '@ngrx/store';
import { Section } from '../../entities/section/model/section.model';

export const addSection = createAction(
  '[Section] Add Section',
  props<{ section: Section }>()
);

export const addSectionSuccess = createAction(
  '[Section] Add Section Success',
  props<{ section: Section }>()
);

export const addSectionFailure = createAction(
  '[Section] Add Section Failure',
  props<{ error: any }>()
);
