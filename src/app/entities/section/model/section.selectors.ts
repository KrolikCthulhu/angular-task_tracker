import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as SectionAll from './section.reducer';
import { Section } from './section.model';
import { Task } from '@entities/task/model/task.model';
import { SectionState } from './section.reducer';

export const selectSectionState =
    createFeatureSelector<SectionAll.SectionState>('sections');

export const {
    selectIds: selectSectionIds,
    selectEntities: selectSectionEntities,
    selectAll: selectAllSections,
    selectTotal: selectTotalSections,
} = SectionAll.adapter.getSelectors(selectSectionState);

export const selectSectionById = (sectionId: string) =>
    createSelector(
        selectSectionEntities,
        (sectionEntities) => sectionEntities[sectionId]
    );

export const selectSectionsFilteredByTaskStatus = (status: Task['status']) =>
    createSelector(selectAllSections, (sections: Section[]) =>
        sections.map((section) => ({
            ...section,
            tasks: section.tasks.filter((task) => task.status === status),
        }))
    );

export const selectLoading = createSelector(
    selectSectionState,
    (state: SectionState) => state.loading
);
