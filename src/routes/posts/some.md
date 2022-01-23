---
title: Test post
description: desc
author: Antony
created: 2022-01-22
modified: 2022-01-22
hidden: false
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

# Heading

## Heading 2

<Profile name=Antony />

### Heading 3

<b>Bold text</b>

```java
class Human {
    private final String name;
    
    public Human(String name) {
        this.name = name;

        System.out.println("Hooman created with name " + name);
    }

    public void getName() {
        return name;
    }
}
```

```bash
yarn add @lvksh/logger
git add .
git commit -S -m "Introduce @lvksh/logger"
```

```javascript
const hello = (name) => {
    console.log(`Hello ${name}`);
}
```

```typescript
type FancyType<T, K extends keyof T> = { [k in K]: T[k] extends string ? string : never };

const hello = (hello: string) => {
    console.log(`Hello ${name}`);
}
```

```kotlin
fun main() {
    val name = "stranger"        // Declare your first variable
    println("Hi, $name!")        // ...and use it!
    print("Current count:")
    for (i in 0..10) {           // Loop over a range from 0 to 10
        print(" $i")
    }
}
```

```tsx
const Hello: FC<{ name: string }> = ({ name, children }) => {
    return (
        <div>
            Hello {name}
            {children}
        </div>
    )
}
```

```html
<template>
    <div v-for="item in items">
        <span :key="item">{{ item }}</span>
    </div>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        items: ["Hi", "Hello"]
    })
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace;
}
</style>
```

```go
import (
    "fmt"
)

func greet(a string) string {
    return "Hello" + a
}

func main() {
    if true {
        fmt.Println(greet("Antony"))
    }
} 
```

```cpp
#include<bits/stdc++.h>

using namespace std;

int main(int argc, char** argv) {
    cout << "Hi" << endl;

    return 0;
}
```

```python
import everything

x = int(input("x: "))

powArr = [int(input())**2 for _ in range(x)]

print(powArr)
```

```php
$str = "This is a really shit language, I cba to make this a nice example";

echo $str;
```

```yaml
---
items:
  - name: a
    id: 2
  - name: b
    id: 4
```

```json
{
    "hi": "hello",
    "num": 4
}
```

```html
<span>test</span>
```

```css
* {
    font-family: 'JetBrains Mono', monospace;
}
```