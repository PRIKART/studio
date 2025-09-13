import { allCourses } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CodeExplainer } from '@/components/code-explainer';
import { LessonControls } from './_components/lesson-controls';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const course = allCourses.find((c) => c.id === params.courseId);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === params.lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = course.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < course.lessons.length - 1
      ? course.lessons[lessonIndex + 1]
      : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href={`/courses/${params.courseId}`}
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {course.title}
      </Link>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          {lesson.title}
        </h1>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        {lesson.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {lesson.codeSnippet && (
        <div className="my-8">
          <CodeExplainer
            code={lesson.codeSnippet.code}
            language={lesson.codeSnippet.language}
          />
        </div>
      )}

      <LessonControls
        courseId={params.courseId}
        lessonId={params.lessonId}
      />
      
      <nav className="mt-12 flex justify-between border-t pt-6">
        {prevLesson ? (
          <Button variant="outline" asChild>
            <Link href={`/courses/${params.courseId}/${prevLesson.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
        ) : <div />}
        {nextLesson ? (
          <Button asChild>
            <Link href={`/courses/${params.courseId}/${nextLesson.id}`}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : <div />}
      </nav>
    </div>
  );
}
