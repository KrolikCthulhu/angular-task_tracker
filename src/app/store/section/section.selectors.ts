import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Section from './section.reducer';

export const selectSectionState =
  createFeatureSelector<Section.SectionState>('sections');

export const {
  selectIds: selectSectionIds,
  selectEntities: selectSectionEntities,
  selectAll: selectAllSections,
  selectTotal: selectTotalSections,
} = Section.adapter.getSelectors(selectSectionState);

export const selectSectionById = (sectionId: string) =>
  createSelector(
    selectSectionEntities,
    (sectionEntities) => sectionEntities[sectionId]
  );
