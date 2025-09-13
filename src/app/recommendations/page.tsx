'use client';

import { useEffect } from 'react';
import { useProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course-card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationsPage() {
  const { completedCourses, recommendedCourses, recommendationReasoning, isLoading, getRecommendations } = useProgress();

  useEffect(() => {
    if (completedCourses.length > 0 && recommendedCourses.length === 0) {
      getRecommendations();
    }
  }, [completedCourses, recommendedCourses.length, getRecommendations]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Your Personalized Learning Path</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          AI-powered recommendations to guide your next steps, based on the courses you've completed.
        </p>
      </header>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center shadow-sm">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 font-semibold">Generating your recommendations...</p>
          <p className="text-muted-foreground">This might take a moment.</p>
        </div>
      )}

      {!isLoading && recommendedCourses.length > 0 && (
        <section>
          <div className="mb-8 rounded-lg border-l-4 border-accent bg-accent/10 p-6">
            <h2 className="font-headline text-xl font-semibold text-accent-foreground">Why these recommendations?</h2>
            <p className="mt-2 italic text-muted-foreground">{recommendationReasoning}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {!isLoading && completedCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center shadow-sm">
          <h2 className="font-headline text-2xl font-bold">Start Learning to Get Recommendations</h2>
          <p className="mt-2 max-w-md text-muted-foreground">Complete at least one course, and we'll generate a personalized learning path for you here.</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Courses</Link>
          </Button>
        </div>
      )}

      {!isLoading && recommendedCourses.length === 0 && completedCourses.length > 0 && (
         <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center shadow-sm">
          <h2 className="font-headline text-2xl font-bold">Could not generate recommendations</h2>
          <p className="mt-2 max-w-md text-muted-foreground">We couldn't generate recommendations at this time. Please try again.</p>
          <Button onClick={getRecommendations} className="mt-6">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
