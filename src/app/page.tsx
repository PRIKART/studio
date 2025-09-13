'use client';

import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CourseCard } from '@/components/course-card';
import { allCourses, categories, difficulties } from '@/lib/data';
import type { Course } from '@/lib/types';
import { useProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const { completedCourses, recommendedCourses, recommendationReasoning, isLoading, getRecommendations } = useProgress();

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const categoryMatch =
        selectedCategory === 'All' || course.category === selectedCategory;
      const difficultyMatch =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          Unlock Your Potential
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Find the perfect course to kickstart your learning journey.
        </p>
      </header>
      
      {completedCourses.length > 0 && (
         <section className="mb-12 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-headline text-2xl font-bold">Your Learning Path</h2>
              <p className="mt-1 text-muted-foreground">AI-powered recommendations based on your progress.</p>
            </div>
            <Button onClick={getRecommendations} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Refresh Recommendations'}
            </Button>
          </div>
          {recommendedCourses.length > 0 ? (
            <div className="mt-6">
              <p className="mb-4 italic text-muted-foreground">{recommendationReasoning}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendedCourses.map((course) => (
                   <div key={course.id} className="rounded-md border p-4 hover:bg-accent/50">
                     <Link href={`/courses/${course.id}`} className="flex flex-col h-full">
                       <h3 className="font-headline font-semibold">{course.title}</h3>
                       <p className="text-sm text-muted-foreground flex-grow">{course.description}</p>
                       <div className="mt-2 flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-secondary px-2 py-0.5">{course.category}</span>
                          <span className="rounded-full bg-secondary px-2 py-0.5">{course.difficulty}</span>
                       </div>
                     </Link>
                   </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center text-muted-foreground">
              {isLoading ? <p>Analyzing your progress and generating recommendations...</p> : <p>Click "Refresh Recommendations" to generate your personalized learning path.</p>}
            </div>
          )}
        </section>
      )}

      <section>
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="font-headline text-3xl font-bold">
            Explore Courses
          </h2>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No courses match your criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
