import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSection from './section.reducer';

export const selectSectionState =
  createFeatureSelector<fromSection.SectionState>('sections');

export const {
  selectIds: selectSectionIds,
  selectEntities: selectSectionEntities,
  selectAll: selectAllSections,
  selectTotal: selectTotalSections,
} = fromSection.adapter.getSelectors(selectSectionState);

export const selectSectionById = (sectionId: string) =>
  createSelector(
    selectSectionEntities,
    (sectionEntities) => sectionEntities[sectionId]
  );
