import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Section } from './section.model';
import { createReducer, on } from '@ngrx/store';
import * as SectionActions from './section.actions';
import * as TaskActions from '@entities/task/model/task.actions';

export interface SectionState extends EntityState<Section> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Section> = createEntityAdapter<Section>();

export const initialState: SectionState = adapter.getInitialState({
    loading: false,
    error: null,
});

export const sectionReducer = createReducer(
    initialState,
    on(SectionActions.addSection, (state, { section }) =>
        adapter.addOne(section, state)
    ),
    on(SectionActions.updateSectionTitle, (state, { id, newTitle }) =>
        adapter.updateOne({ id: id, changes: { title: newTitle } }, state)
    ),
    on(SectionActions.deleteSection, (state, { id }) =>
        adapter.removeOne(id, state)
    ),
    on(SectionActions.loadSections, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(SectionActions.loadSectionsSuccess, (state, { sections }) =>
        adapter.setAll(sections, { ...state, loading: false })
    ),
    on(SectionActions.loadSectionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(TaskActions.addTask, (state, { task }) => {
        console.log(task);
        const { sectionId } = task;
        const section = state.entities[sectionId];
        if (!section) {
            return state;
        }
        const updatedSection = {
            ...section,
            tasks: [...section.tasks, task],
        };
        return adapter.updateOne(
            { id: sectionId, changes: updatedSection },
            state
        );
    }),
    on(TaskActions.updateTask, (state, { updatedTask }) => {
        const section = state.entities[updatedTask.sectionId];
        if (!section) {
            return state;
        }
        return adapter.updateOne(
            {
                id: updatedTask.sectionId,
                changes: {
                    tasks: section.tasks.map((task) =>
                        task.id === updatedTask.id
                            ? { ...task, ...updatedTask }
                            : task
                    ),
                },
            },
            state
        );
    })
);
