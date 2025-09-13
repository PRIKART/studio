'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/use-progress';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/types';

interface LessonListProps {
  lessons: Lesson[];
  courseId: string;
}

export function LessonList({ lessons, courseId }: LessonListProps) {
  const { isCompleted } = useProgress();

  return (
    <ul className="list-none space-y-2 p-0">
      {lessons.map((lesson) => {
        const completed = isCompleted(lesson.id);
        return (
          <li key={lesson.id} className="m-0 p-0">
            <Link
              href={`/courses/${courseId}/${lesson.id}`}
              className={cn(
                'flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent/50',
                completed ? 'border-primary/50 bg-primary/5' : ''
              )}
            >
              {completed ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
              ) : (
                <Circle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              )}
              <span className="flex-grow font-medium">{lesson.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
