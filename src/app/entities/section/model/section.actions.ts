import { createAction, props } from '@ngrx/store';
import { Section } from './section.model';

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

export const loadSections = createAction('[Section] Load Sections');

export const loadSectionsSuccess = createAction(
    '[Section] Load Sections Success',
    props<{ sections: Section[] }>()
);

export const loadSectionsFailure = createAction(
    '[Section] Load Sections Failure',
    props<{ error: any }>()
);

export const deleteSection = createAction(
    '[Section] Delete Section',
    props<{ id: Section['id'] }>()
);

export const deleteSectionSuccess = createAction(
    '[Section] Delete Section Success',
    props<{ id: Section['id'] }>()
);

export const deleteSectionFailure = createAction(
    '[Section] Delete Section Failure',
    props<{ error: any }>()
);

export const updateSectionTitle = createAction(
    '[Section] Update Section Title',
    props<{ id: Section['id']; newTitle: Section['title'] }>()
);

export const updateSectionTitleSuccess = createAction(
    '[Section] Update Section Title Success',
    props<{ id: Section['id']; newTitle: Section['title'] }>()
);

export const updateSectionTitleFailure = createAction(
    '[Section] Update Section Title Failure',
    props<{ error: any }>()
);
