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

export const selectTasksSortedByDate = () =>
    createSelector(selectAllSections, (sections) => {
        const sortedSections = sections.map((section) => {
            const sortedTasks = section.tasks.slice().sort((task1, task2) => {
                if (task1.dueDate && task2.dueDate) {
                    return (
                        new Date(task1.dueDate).getTime() -
                        new Date(task2.dueDate).getTime()
                    );
                } else if (task1.dueDate) {
                    return -1;
                } else if (task2.dueDate) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return { ...section, tasks: sortedTasks };
        });
        return sortedSections;
    });
