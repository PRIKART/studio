'use client';

import { useProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle2 } from 'lucide-react';

interface LessonControlsProps {
  courseId: string;
  lessonId: string;
}

export function LessonControls({ courseId, lessonId }: LessonControlsProps) {
  const { isCompleted, toggleComplete } = useProgress();
  const completed = isCompleted(lessonId);

  return (
    <div className="mt-8 border-t pt-6">
      <Button
        onClick={() => toggleComplete(lessonId, courseId)}
        size="lg"
        variant={completed ? 'secondary' : 'default'}
      >
        {completed ? (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Mark as Incomplete
          </>
        ) : (
          <>
            <Check className="mr-2 h-5 w-5" />
            Mark as Complete
          </>
        )}
      </Button>
    </div>
  );
}
