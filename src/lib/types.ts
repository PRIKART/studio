export type Lesson = {
  id: string;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
};

export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Web Development' | 'Data Science' | 'Mobile Development';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
};
