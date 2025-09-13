// src/ai/flows/personalized-learning-recommendations.ts
'use server';

/**
 * @fileOverview Recommends learning paths and lessons based on courses a user has previously taken.
 *
 * - getPersonalizedRecommendations - A function that returns personalized learning recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  coursesTaken: z
    .array(z.string())
    .describe('A list of course names the user has already taken.'),
  userInterests: z
    .array(z.string())
    .optional()
    .describe('A list of user specified interests, can be used to tailor recommendations'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended course names.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a learning path recommendation system.  Based on the courses a user has already taken, recommend a series of next courses for them to take.

Courses taken:
{{#each coursesTaken}}- {{this}}\n{{/each}}

{{#if userInterests}} User interests:
{{#each userInterests}}- {{this}}\n{{/each}}{{/if}}

Respond with specific course names, and a brief explanation of why each course is recommended.
`, // Changed prompt to use Handlebars syntax
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
