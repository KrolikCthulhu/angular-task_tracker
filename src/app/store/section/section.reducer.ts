import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Section } from '../../entities/section/model/section.model';
import { createReducer, on } from '@ngrx/store';
import * as SectionActions from './section.actions';

export interface SectionState extends EntityState<Section> {}

export const adapter: EntityAdapter<Section> = createEntityAdapter<Section>();

export const initialState: SectionState = adapter.getInitialState();

export const sectionReducer = createReducer(
  initialState,
  on(SectionActions.addSection, (state, { section }) =>
    adapter.addOne(section, state)
  )
  // on(SectionActions.updateSection, (state, { id, changes }) => adapter.updateOne({ id, changes }, state)),
  // on(SectionActions.deleteSection, (state, { id }) => adapter.removeOne(id, state))
);
