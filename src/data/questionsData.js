export const initialQuestions = [
  {
    id: "q-1",
    title: "Print Hello World",
    language: "Java",
    difficulty: "Easy",
    description: "Write a standard Java program that prints 'Hello, World!' to the console output.",
    inputFormat: "No input required",
    outputFormat: "A single line containing: Hello, World!",
    sampleInput: "None",
    expectedOutput: "Hello, World!",
    starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  },
  {
    id: "q-2",
    title: "Sum of Two Numbers",
    language: "Java",
    difficulty: "Easy",
    description: "Initialize two integer variables a = 15 and b = 25, compute their sum, and print the calculated sum.",
    inputFormat: "Predefined variables a = 15, b = 25",
    outputFormat: "Print the integer sum to the console",
    sampleInput: "a = 15, b = 25",
    expectedOutput: "40",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 25;
        int sum = a + b;
        System.out.println(sum);
    }
}`
  },
  {
    id: "q-3",
    title: "Check Even or Odd",
    language: "Java",
    difficulty: "Easy",
    description: "Given an integer n = 18, check whether the number is even or odd. Print 'Even' if it is divisible by 2, else print 'Odd'.",
    inputFormat: "Predefined integer n = 18",
    outputFormat: "Print 'Even' or 'Odd'",
    sampleInput: "n = 18",
    expectedOutput: "Even",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 18;
        if (n % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`
  },
  {
    id: "q-4",
    title: "Find Largest of Two Numbers",
    language: "Java",
    difficulty: "Easy",
    description: "Given two numbers a = 42 and b = 78, determine the larger number and print it to the console.",
    inputFormat: "Variables a = 42, b = 78",
    outputFormat: "Print the larger number",
    sampleInput: "a = 42, b = 78",
    expectedOutput: "78",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 42;
        int b = 78;
        int max = (a > b) ? a : b;
        System.out.println(max);
    }
}`
  },
  {
    id: "q-5",
    title: "Area of Rectangle",
    language: "Java",
    difficulty: "Easy",
    description: "Calculate the area of a rectangle with length = 12 and width = 8, then print the calculated area.",
    inputFormat: "length = 12, width = 8",
    outputFormat: "Print the rectangle area",
    sampleInput: "length = 12, width = 8",
    expectedOutput: "96",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int length = 12;
        int width = 8;
        int area = length * width;
        System.out.println(area);
    }
}`
  },
  {
    id: "q-6",
    title: "Cube of a Number",
    language: "Java",
    difficulty: "Easy",
    description: "Calculate the cube of integer n = 5 (n * n * n) and print the result.",
    inputFormat: "n = 5",
    outputFormat: "Print the cube of n",
    sampleInput: "n = 5",
    expectedOutput: "125",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int cube = n * n * n;
        System.out.println(cube);
    }
}`
  },
  {
    id: "q-7",
    title: "Celsius to Fahrenheit",
    language: "Java",
    difficulty: "Easy",
    description: "Convert a temperature of 25 degrees Celsius to Fahrenheit using formula (C * 9 / 5) + 32 and print the result.",
    inputFormat: "celsius = 25",
    outputFormat: "Print the temperature in Fahrenheit",
    sampleInput: "celsius = 25",
    expectedOutput: "77",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int celsius = 25;
        int fahrenheit = (celsius * 9 / 5) + 32;
        System.out.println(fahrenheit);
    }
}`
  },
  {
    id: "q-8",
    title: "Check Divisibility by 5 and 11",
    language: "Java",
    difficulty: "Easy",
    description: "Determine whether the number n = 55 is divisible by both 5 and 11. Print 'Divisible' if true, otherwise print 'Not Divisible'.",
    inputFormat: "n = 55",
    outputFormat: "Print 'Divisible' or 'Not Divisible'",
    sampleInput: "n = 55",
    expectedOutput: "Divisible",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 55;
        if (n % 5 == 0 && n % 11 == 0) {
            System.out.println("Divisible");
        } else {
            System.out.println("Not Divisible");
        }
    }
}`
  },
  {
    id: "q-9",
    title: "Average of Three Numbers",
    language: "Java",
    difficulty: "Easy",
    description: "Given three numbers a = 10, b = 20, and c = 30, compute their average value and print it.",
    inputFormat: "a = 10, b = 20, c = 30",
    outputFormat: "Print the average integer",
    sampleInput: "a = 10, b = 20, c = 30",
    expectedOutput: "20",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int c = 30;
        int avg = (a + b + c) / 3;
        System.out.println(avg);
    }
}`
  },
  {
    id: "q-10",
    title: "Simple Interest Calculator",
    language: "Java",
    difficulty: "Easy",
    description: "Calculate simple interest for Principal = 1000, Rate = 5, and Time = 2 years using formula (P * R * T) / 100, and print the interest.",
    inputFormat: "P = 1000, R = 5, T = 2",
    outputFormat: "Print the calculated interest value",
    sampleInput: "P = 1000, R = 5, T = 2",
    expectedOutput: "100",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int principal = 1000;
        int rate = 5;
        int time = 2;
        int interest = (principal * rate * time) / 100;
        System.out.println(interest);
    }
}`
  }
];
