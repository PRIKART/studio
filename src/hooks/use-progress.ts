'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-learning-recommendations';
import { allCourses } from '@/lib/data';
import type { Course } from '@/lib/types';

const PROGRESS_KEY = 'smart-learn-progress';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [recommendationReasoning, setRecommendationReasoning] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        setCompletedLessons(new Set(JSON.parse(storedProgress)));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage', error);
    }
  }, []);

  const saveProgress = (newProgress: Set<string>) => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(newProgress)));
      setCompletedLessons(newProgress);
    } catch (error) {
      console.error('Failed to save progress to localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not save your progress.',
        variant: 'destructive',
      });
    }
  };

  const isCompleted = useCallback(
    (lessonId: string) => completedLessons.has(lessonId),
    [completedLessons]
  );

  const toggleComplete = (lessonId: string, courseId: string) => {
    const newProgress = new Set(completedLessons);
    if (newProgress.has(lessonId)) {
      newProgress.delete(lessonId);
    } else {
      newProgress.add(lessonId);
      toast({
        title: 'Progress Saved!',
        description: 'You\'ve completed a lesson. Keep it up!',
      });
    }
    saveProgress(newProgress);
  };

  useEffect(() => {
    const coursesTakenMap: { [key: string]: number } = {};
    const coursesTaken: string[] = [];

    completedLessons.forEach(lessonId => {
      const course = allCourses.find(c => c.lessons.some(l => l.id === lessonId));
      if(course) {
        if (!coursesTakenMap[course.id]) {
          coursesTakenMap[course.id] = 0;
        }
        coursesTakenMap[course.id]++;
      }
    });

    for (const courseId in coursesTakenMap) {
      const course = allCourses.find(c => c.id === courseId);
      if (course && coursesTakenMap[courseId] === course.lessons.length) {
        coursesTaken.push(course.title);
      }
    }
    setCompletedCourses(coursesTaken);
  }, [completedLessons]);
  
  const getRecommendations = useCallback(async () => {
    if (completedCourses.length === 0) {
       toast({
        title: 'Start Learning!',
        description: 'Complete a few courses to get personalized recommendations.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await getPersonalizedRecommendations({ coursesTaken: completedCourses });
      
      const matchedCourses = allCourses.filter(course => result.recommendations.includes(course.title));
      setRecommendedCourses(matchedCourses);
      setRecommendationReasoning(result.reasoning);

    } catch (error) {
      console.error('Failed to get recommendations', error);
      toast({
        title: 'AI Error',
        description: 'Could not generate recommendations at this time.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [completedCourses, toast]);

  return { isCompleted, toggleComplete, completedLessons, completedCourses, recommendedCourses, recommendationReasoning, isLoading, getRecommendations };
}
