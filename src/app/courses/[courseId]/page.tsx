import { allCourses } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { LessonList } from './_components/lesson-list';

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = allCourses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === course.image);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <header className="mb-6">
            <div className="mb-4 flex items-center gap-4">
               <Badge variant="secondary">{course.category}</Badge>
               <Badge variant="outline">{course.difficulty}</Badge>
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {course.description}
            </p>
          </header>

          <div className="prose prose-blue dark:prose-invert max-w-none">
             <h2 className="font-headline text-2xl font-bold">What you'll learn</h2>
             <LessonList lessons={course.lessons} courseId={course.id} />
          </div>
        </div>
        <aside className="md:col-span-1">
          <div className="sticky top-20">
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
              {placeholder && (
                <Image
                  src={placeholder.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholder.imageHint}
                />
              )}
            </div>
            <h3 className="font-headline text-lg font-semibold">Course Content</h3>
            <p className="text-sm text-muted-foreground">{course.lessons.length} lessons</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
