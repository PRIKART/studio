'use server';

/**
 * @fileOverview Provides an AI-powered code explainer flow.
 *
 * - codeExplainer - A function that accepts code and returns an explanation.
 * - CodeExplainerInput - The input type for the codeExplainer function.
 * - CodeExplainerOutput - The return type for the codeExplainer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeExplainerInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type CodeExplainerInput = z.infer<typeof CodeExplainerInputSchema>;

const CodeExplainerOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of the code.'),
});
export type CodeExplainerOutput = z.infer<typeof CodeExplainerOutputSchema>;

export async function codeExplainer(input: CodeExplainerInput): Promise<CodeExplainerOutput> {
  return codeExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeExplainerPrompt',
  input: {schema: CodeExplainerInputSchema},
  output: {schema: CodeExplainerOutputSchema},
  prompt: `You are an expert software engineer who specializes in explaining code to junior developers.

  Please provide a clear, concise explanation of the following code snippet. Assume the user has some basic programming knowledge but may not be familiar with the specific language or libraries used.
  Explain what the code does, how it works, and any potential issues or edge cases.

  Language: {{{language}}}
  Code:
  {{{
    code
  }}}
  `,
});

const codeExplainerFlow = ai.defineFlow(
  {
    name: 'codeExplainerFlow',
    inputSchema: CodeExplainerInputSchema,
    outputSchema: CodeExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
