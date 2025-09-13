import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === course.image);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link href={`/courses/${course.id}`} className="flex h-full flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
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
          <div className="p-6 pb-2">
            <CardTitle className="font-headline text-xl">
              {course.title}
            </CardTitle>
            <CardDescription className="mt-2">{course.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-2"></CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="flex w-full items-center justify-between">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.difficulty}</Badge>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
