import { GRADE_7_MATERIALS, GRADE_7_QUIZZES } from './materialsGrade7';
import { GRADE_8_MATERIALS, GRADE_8_QUIZZES } from './materialsGrade8';
import { GRADE_9_MATERIALS, GRADE_9_QUIZZES } from './materialsGrade9';
import { INITIAL_ANNOUNCEMENTS, INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_SITE_SETTING } from './infoAndHomeData';
import { CareerMaterial, MaterialQuiz } from '../types/bicara';

export const INITIAL_MATERIALS: CareerMaterial[] = [
  ...GRADE_7_MATERIALS,
  ...GRADE_8_MATERIALS,
  ...GRADE_9_MATERIALS
];

export const INITIAL_QUIZZES: MaterialQuiz[] = [
  ...GRADE_7_QUIZZES,
  ...GRADE_8_QUIZZES,
  ...GRADE_9_QUIZZES
];

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_bicara_bk_1794573083026.jpg';

export { INITIAL_CATEGORIES, INITIAL_ARTICLES, INITIAL_ANNOUNCEMENTS, INITIAL_SITE_SETTING };
