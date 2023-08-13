import { Category, CategorySchema } from './models/category.model';
import { CategoryNote, CategoryNoteSchema } from './models/categoryNotes.model';
import { Note, NoteSchema } from './models/notes.model';

import { User, UserSchema } from './models/user.model';

const setupModels = (sequelize: any) => {
  User.init(UserSchema, User.config(sequelize));
  Note.init(NoteSchema, Note.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  CategoryNote.init(CategoryNoteSchema, CategoryNote.config(sequelize));
};
//
export default setupModels;
