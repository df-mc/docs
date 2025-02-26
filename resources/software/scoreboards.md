---
icon: project
---

Scoreboards are an aesthetically pleasing and visual way of displaying data to players on a Minecraft server. Dragonfly's API make's it extremely easy to display data via a scoreboard. An example is shown below of a simple scoreboard:

```go
package main

import (
	"github.com/df-mc/dragonfly/server/player"
	"github.com/df-mc/dragonfly/server/player/scoreboard"
)

func sendScoreboard(p *player.Player) {
	s := scoreboard.New("Title")
	s.WriteString("Hello,")
	s.WriteString("World!")
	p.SendScoreboard(s)
}
```

In this code, we initialize our scoreboard with `scoreboard.New()` and then use the `WriteString` method to write a string of data to our scoreboard. You may also use `(*Scoreboard).Set(index int, s string)` if you'd like to add some data to a specific index on a scoreboard (internally, scoreboard data is indexed and ordered in an array).

## Updating a scoreboard

In most use cases, however, you're never gonna just send a static scoreboard. Instead, you will want to update your scoreboard during some event - but in most cases - periodically. In this case, we will use Go tickers to get this accomplished. An example of an `tickScoreboards` method is shown below. In the example, assume we have some functions, `players`, that represents all the players in our server (note, you'll need to implement handling for `*world.Tx` to make this possible).

```go
package main

import (
    "time"
	"github.com/df-mc/dragonfly/server/player"
	"github.com/df-mc/dragonfly/server/player/scoreboard"
)

func tickScoreboards() {
    t := time.NewTicker(time.Second * 30) // Update every 30 seconds
    defer t.Stop()
    for range t.C {
        for _, p := range players() {
            sendScoreboard(p, "New Title", "New Data")
        }
    }
}

func sendScoreboard(p *player.Player, title string, data string) {
	s := scoreboard.New(title)
	s.WriteString(data)
	p.SendScoreboard(s)
}