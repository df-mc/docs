---
icon: checklist
---

Tasks and closures are by far one of the most simplified features when it comes to using Go/Dragonfly. With the combined ability of Go routines, tickers, channels, and the `time` package, developers are able to create every kind of needed task (simple, delayed, repeating, and delayed repeating) without having to call extra abstractions like in other softwares.

## Repeating Tasks

Consider you want to create a repeating, synchronous task in Pocketmine-MP
### AnnouncementTask.php
```php
<?php

declare(strict_types=1);

namespace MyPlugin;

use pocketmine\Server;
use pocketmine\scheduler\Task;

class AnnouncementTask extends Task {

    public function __construct(private string $message) {}

    public function onRun(): void {
        $server = Server::getInstance();
        $server->broadcastMessage($this->message);
    }
}
```

This is simply a task that will broadcast a certain message to the server. Since we want to make it repeating, somewhere in our plugin's entry point, we would write:

```php
$this->getScheduler()->scheduleRepeatingTask(new AnnouncementTask("Hello, world!"), 1200);
```

This will simply run the announcement task every minute.

Consider the pitfalls to this solution, however. We had to create a class and then use a long property and function call map in order to even execute our task.

Furthermore, since we are using a synchronous tasks, any blocking code (there isn't any in this example) will clog up the main thread. In this case, we would use Pocketmine-MP's `AsyncPool` and `AsyncTask`, but the prior pitfalls still arise.

Lastly, we know that task is always going to run for the full cycle of the program. It seems very redundant to have to manually schedule this task when you know it's always going to happen.

In the following Dragonfly/Go code, we will be using a combination of Go routines and tickers to help with the above problems.

```go
import "time"

func init() {
    go func() {
        t := time.NewTicker(time.Minuite)
        defer t.Stop()
        for range t.C {
            chat.Global.WriteString("Hello, World!")
        }
    }()
}

```

Wow! We were able to get a task that took up 2 files and several lines of code into something that fits in just 10 lines. Let's analyze how this code uses Go conventions/packages to make the code concise.

1. The utilization of the `init` function essentially "lazy-loads" the logic in the function without any sort of manual scheduling. This is useful in cases where you know that the task will repeat for the full life-cycle of your program 

!!!
Note: The package containing the file you're `init` function is in much be imported somewhere in order for the function to be called!
!!!

2. Using the Go routine above allows the code to be executed on a separate thread and have the rest of the program run freely on the main thread. In a sense, you can "think" of this as a more light-weight option to `AsyncTask` (but not completely as there is a huge difference internally) as it will allow the execution of the code off the main thread.

3. The use of the `Ticker` allows the developer to control the flow of the task as well as visually be able to see the iterative approach to tasks in a clean manner. In this example, we defer the end of the task (simply, it will stop at the end of the thread or program life-cycle) and then we iterate over the ticker's channel. This iteration cycle will happen however long you specified the ticker's interval to be (in this case, a minute).

## Delayed Tasks

TODO