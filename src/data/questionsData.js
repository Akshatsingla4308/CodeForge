export const initialQuestions = [
  {
    id: "q-1",
    title: "Hello World",
    language: "Java",
    difficulty: "Easy",
    description: "Write a standard program that outputs 'Hello, World!' to the console output.",
    inputFormat: "No input required",
    outputFormat: "A single line containing: Hello, World!",
    sampleInput: "None",
    expectedOutput: "Hello, World!",
    starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      Python: `print("Hello, World!")`,
      C: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      JavaScript: `console.log("Hello, World!");`
    }
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 25;
        int sum = a + b;
        System.out.println(sum);
    }
}`,
      Python: `a = 15
b = 25
print(a + b)`,
      C: `#include <stdio.h>

int main() {
    int a = 15, b = 25;
    printf("%d\\n", a + b);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 25;
    cout << (a + b) << endl;
    return 0;
}`,
      JavaScript: `const a = 15;
const b = 25;
console.log(a + b);`
    }
  },
  {
    id: "q-3",
    title: "Even or Odd",
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int n = 18;
        if (n % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
      Python: `n = 18
if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
      C: `#include <stdio.h>

int main() {
    int n = 18;
    if (n % 2 == 0) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int n = 18;
    if (n % 2 == 0) {
        cout << "Even" << endl;
    } else {
        cout << "Odd" << endl;
    }
    return 0;
}`,
      JavaScript: `const n = 18;
if (n % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}`
    }
  },
  {
    id: "q-4",
    title: "Reverse a String",
    language: "Java",
    difficulty: "Easy",
    description: "Given a string str = 'CodeForge', reverse the characters in the string and print the reversed result.",
    inputFormat: "String str = 'CodeForge'",
    outputFormat: "Print the reversed string",
    sampleInput: "str = 'CodeForge'",
    expectedOutput: "egroFedoC",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String str = "CodeForge";
        StringBuilder sb = new StringBuilder(str);
        System.out.println(sb.reverse().toString());
    }
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        String str = "CodeForge";
        StringBuilder sb = new StringBuilder(str);
        System.out.println(sb.reverse().toString());
    }
}`,
      Python: `str_val = "CodeForge"
print(str_val[::-1])`,
      C: `#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "CodeForge";
    int len = strlen(str);
    for (int i = len - 1; i >= 0; i--) {
        putchar(str[i]);
    }
    putchar('\\n');
    return 0;
}`,
      "C++": `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "CodeForge";
    reverse(s.begin(), s.end());
    cout << s << endl;
    return 0;
}`,
      JavaScript: `const str = "CodeForge";
console.log(str.split("").reverse().join(""));`
    }
  },
  {
    id: "q-5",
    title: "Find the Largest of Three Numbers",
    language: "Java",
    difficulty: "Easy",
    description: "Given three numbers a = 45, b = 89, and c = 32, determine the largest number and print it to the console.",
    inputFormat: "Variables a = 45, b = 89, c = 32",
    outputFormat: "Print the largest integer",
    sampleInput: "a = 45, b = 89, c = 32",
    expectedOutput: "89",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 45;
        int b = 89;
        int c = 32;
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        System.out.println(max);
    }
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int a = 45;
        int b = 89;
        int c = 32;
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        System.out.println(max);
    }
}`,
      Python: `a, b, c = 45, 89, 32
print(max(a, b, c))`,
      C: `#include <stdio.h>

int main() {
    int a = 45, b = 89, c = 32;
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    printf("%d\\n", max);
    return 0;
}`,
      "C++": `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a = 45, b = 89, c = 32;
    cout << max({a, b, c}) << endl;
    return 0;
}`,
      JavaScript: `const a = 45, b = 89, c = 32;
console.log(Math.max(a, b, c));`
    }
  },
  {
    id: "q-6",
    title: "Factorial of a Number",
    language: "Java",
    difficulty: "Medium",
    description: "Calculate the factorial of integer n = 5 (5! = 5 * 4 * 3 * 2 * 1) and print the result.",
    inputFormat: "n = 5",
    outputFormat: "Print the factorial integer",
    sampleInput: "n = 5",
    expectedOutput: "120",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
      Python: `n = 5
fact = 1
for i in range(1, n + 1):
    fact *= i
print(fact)`,
      C: `#include <stdio.h>

int main() {
    int n = 5, fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("%d\\n", fact);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int n = 5, fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    cout << fact << endl;
    return 0;
}`,
      JavaScript: `let n = 5;
let fact = 1;
for (let i = 1; i <= n; i++) {
    fact *= i;
}
console.log(fact);`
    }
  },
  {
    id: "q-7",
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int length = 12;
        int width = 8;
        int area = length * width;
        System.out.println(area);
    }
}`,
      Python: `length = 12
width = 8
print(length * width)`,
      C: `#include <stdio.h>

int main() {
    int length = 12, width = 8;
    printf("%d\\n", length * width);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int length = 12, width = 8;
    cout << (length * width) << endl;
    return 0;
}`,
      JavaScript: `const length = 12, width = 8;
console.log(length * width);`
    }
  },
  {
    id: "q-8",
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int cube = n * n * n;
        System.out.println(cube);
    }
}`,
      Python: `n = 5
print(n ** 3)`,
      C: `#include <stdio.h>

int main() {
    int n = 5;
    printf("%d\\n", n * n * n);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    cout << (n * n * n) << endl;
    return 0;
}`,
      JavaScript: `const n = 5;
console.log(n ** 3);`
    }
  },
  {
    id: "q-9",
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int celsius = 25;
        int fahrenheit = (celsius * 9 / 5) + 32;
        System.out.println(fahrenheit);
    }
}`,
      Python: `celsius = 25
fahrenheit = (celsius * 9 // 5) + 32
print(fahrenheit)`,
      C: `#include <stdio.h>

int main() {
    int celsius = 25;
    int fahrenheit = (celsius * 9 / 5) + 32;
    printf("%d\\n", fahrenheit);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int celsius = 25;
    int fahrenheit = (celsius * 9 / 5) + 32;
    cout << fahrenheit << endl;
    return 0;
}`,
      JavaScript: `const celsius = 25;
const fahrenheit = Math.floor((celsius * 9) / 5) + 32;
console.log(fahrenheit);`
    }
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
}`,
    starterCodes: {
      Java: `public class Main {
    public static void main(String[] args) {
        int principal = 1000;
        int rate = 5;
        int time = 2;
        int interest = (principal * rate * time) / 100;
        System.out.println(interest);
    }
}`,
      Python: `principal = 1000
rate = 5
time = 2
interest = (principal * rate * time) // 100
print(interest)`,
      C: `#include <stdio.h>

int main() {
    int principal = 1000, rate = 5, time = 2;
    int interest = (principal * rate * time) / 100;
    printf("%d\\n", interest);
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;

int main() {
    int principal = 1000, rate = 5, time = 2;
    int interest = (principal * rate * time) / 100;
    cout << interest << endl;
    return 0;
}`,
      JavaScript: `const principal = 1000, rate = 5, time = 2;
const interest = (principal * rate * time) / 100;
console.log(interest);`
    }
  }
];
