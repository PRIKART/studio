import type { Course } from './types';

export const allCourses: Course[] = [
  {
    id: 'intro-to-js',
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript, the most popular programming language for web development.',
    image: 'js-intro',
    category: 'Web Development',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'js-variables',
        title: 'Variables and Data Types',
        content: `In JavaScript, we use variables to store data. You can declare variables using 'var', 'let', or 'const'. 
        
        Common data types include:
        - String: for text, e.g., "Hello World"
        - Number: for integers and floating-point numbers, e.g., 42
        - Boolean: for true/false values
        
        'let' allows you to reassign the variable's value, while 'const' is for values that won't change. It's best practice to use 'const' by default.`,
        codeSnippet: {
          language: 'javascript',
          code: `const greeting = "Hello, Smart Learner!";
let userCount = 100;
const isLearning = true;

console.log(greeting);
console.log("Current users:", userCount);`
        }
      },
      {
        id: 'js-functions',
        title: 'Functions',
        content: `Functions are blocks of code designed to perform a particular task. A function is executed when "something" invokes it (calls it).
        
        You can define functions using the 'function' keyword or as an arrow function, which is a more modern syntax.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const subtract = (a, b) => {
  return a - b;
};

console.log("Addition:", add(5, 3));
console.log("Subtraction:", subtract(10, 4));`
        }
      }
    ]
  },
  {
    id: 'advanced-react',
    title: 'Advanced React Patterns',
    description: 'Level up your React skills with advanced patterns like Higher-Order Components, Render Props, and Hooks.',
    image: 'react-advanced',
    category: 'Web Development',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'react-hooks',
        title: 'Custom Hooks',
        content: `Custom Hooks are a powerful way to reuse stateful logic between components. By extracting component logic into reusable functions, you can keep your components clean and organized. A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.`,
        codeSnippet: {
          language: 'javascript',
          code: `import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Usage in a component:
// const width = useWindowWidth();
// return <p>Window width is {width}px</p>;`
        }
      }
    ]
  },
  {
    id: 'python-for-data',
    title: 'Python for Data Analysis',
    description: 'Explore data analysis using Python with popular libraries like Pandas and NumPy.',
    image: 'python-data',
    category: 'Data Science',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'pandas-intro',
        title: 'Introduction to Pandas',
        content: 'Pandas is a powerful library for data manipulation and analysis. The primary data structure in Pandas is the DataFrame, which is like a spreadsheet or a SQL table.',
        codeSnippet: {
          language: 'python',
          code: `import pandas as pd

# Create a simple DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie'],
        'Age': [25, 30, 35]}
df = pd.DataFrame(data)

print(df.head())
print("\\nAverage Age:", df['Age'].mean())`
        }
      }
    ]
  },
  {
    id: 'react-native-basics',
    title: 'Mobile Apps with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native.',
    image: 'react-native',
    category: 'Mobile Development',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'rn-components',
        title: 'Core Components',
        content: 'React Native provides a set of essential, ready-to-use components for building your UI, such as View, Text, and StyleSheet.',
        codeSnippet: {
          language: 'javascript',
          code: `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyFirstApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Mobile Developer!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MyFirstApp;`
        }
      }
    ]
  },
];

export const categories = [...new Set(allCourses.map(course => course.category))];
export const difficulties = [...new Set(allCourses.map(course => course.difficulty))];
