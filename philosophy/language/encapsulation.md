---
icon: container
---
Encapsulation is simply the idea of bundling your data into a class. Consider the following example:

Java:
```java
public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
PHP:
```php
class User {
    private String $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name) {
        $this->name = $name;
    }
}
```

Above are examples of encapsulating a name (with respect to a User class) in both Java/PHP. Below is the **INCORRECT** implementation of this concept in Go.

```go
type User struct {
    name string
}

func (u User) GetName() string {
    return u.name
}

func (u User) SetName(name string) {
    u.name = name
}
```

There are a few problems that we need to point out here:

1. Not utilizing the pointer receiver (*User). In Go, we must add the `*` operator in front of our struct function in order to be able to edit the variable.
2. The idea of getters and setters do exist in Go, but they aren't the typical way that OOP languages use them. In Go convention, a getter function is typically named as just the property that it returns (so in this case, just, `Name()`) and the setter function remains the same.
3. We don't want to always use an unexported field. In Go, fields with lowercase names are unexported (private), however, if we are not using the field for really any type of validation and are just using it at its face value (e.g there is no other function within `User` using it), then we do not need to keep it unexported and guarded under a function and instead can just make it exported (public) by naming it `Name`

With these changes in mind, our OOP-inspired Go code becomes the following:

```go
type User struct {
    Name string
}
```

However, if the `Name` field must be used in some type of other functional logic in some function for `User`, then utilize the original Go code, except with the name of the getter set to `Name()` as below (along with the pointer receiver):

```go
type User struct {
    name string
}

func (u *User) Name() string {
    return u.name
}

func (u *User) SetName(name string) {
    u.name = name
}
```