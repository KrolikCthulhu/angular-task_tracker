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
