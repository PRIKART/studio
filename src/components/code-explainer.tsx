'use client';

import { useState } from 'react';
import { codeExplainer } from '@/ai/flows/code-explainer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CodeExplainerProps {
  code: string;
  language: string;
}

export function CodeExplainer({ code, language }: CodeExplainerProps) {
  const [currentCode, setCurrentCode] = useState(code);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExplain = async () => {
    setIsLoading(true);
    setExplanation('');
    try {
      const result = await codeExplainer({ code: currentCode, language });
      setExplanation(result.explanation);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Failed to get explanation', error);
      toast({
        title: 'AI Error',
        description: 'Could not generate explanation at this time.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <h3 className="mb-2 font-headline text-lg font-semibold">Code Example</h3>
      <Textarea
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        className="min-h-[200px] font-code text-sm"
        placeholder="Enter code to explain..."
      />
      <Button
        onClick={handleExplain}
        disabled={isLoading}
        className="mt-4"
        variant="secondary"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Explain Code
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline">
              AI Code Explanation
            </DialogTitle>
            <DialogDescription>
              Here's a breakdown of the code snippet.
            </DialogDescription>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto pr-2">
            {explanation.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
