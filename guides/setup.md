---
icon: flame
label: Project Setup
layout: page
order: 1
---

The following guides will help you set up a server from scratch using Dragonfly among the popular gamemodes people tend to make Minecraft servers for.

Dragonfly is a bit daunting, with essentially all of the organization and file system needed to be done by the user. Furthermore, with no large ecosystem of previous code to reuse, it's hard to to even know where to begin. This setup tutorial will allow you get the typical base-code that's been used for quite some time on older Dragonfly projects and should be fairly beginner friendly.

## Installing Go and Dragonfly

If you have not already done so, please install both Go and Dragonfly. You can refer to the **Getting Started** section to do so:

[!ref](/getting-started.md)

## Installing MongoDB

Most servers require the persistence of data, which is what a database is for. In this example, we will be using MongoDB. Coming from other softwares, you may be more familar with SQL databases like SQLite, MySQL, or PostgreSQL. The Go MongoDB library delivers an extremely beginner friendly API (which is typesafe and provides autocomplete) as well as a performant database driver.

Below are the downloads for MongoDB on the three popular operating systems:

Operating System | Link
---              | ---
Windows          | https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
Linux            | https://www.mongodb.com/docs/manual/administration/install-on-linux/
MacOS            | https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

## Installing Gophig

For the following projects, we will be using `gophig` to load our own custom configuration files for our server. To install, simply run:

```
go get github.com/restartfu/gophig
```

## Project Entry Point

We are now ready to create our Dragonfly project. Below, is a `main.go` entry point file that will be the file to start our program. Create a `main.go` file and use the following code:

```go main.go
package main

import (
	"log/slog"
	"os"

	"github.com/df-mc/dragonfly/server"
	"github.com/df-mc/dragonfly/server/block/cube"
	"github.com/df-mc/dragonfly/server/player/chat"
	"github.com/df-mc/dragonfly/server/world"

	"github.com/restartfu/gophig"
)

func main() {
	log := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	slog.SetLogLoggerLevel(slog.LevelDebug)
	chat.Global.Subscribe(chat.StdoutSubscriber{})

	conf, err := readConfig(log)
	if err != nil {
		panic(err)
	}

	srv := conf.New()
	w := srv.World()

	w.SetDefaultGameMode(world.GameModeAdventure)

	w.SetSpawn(cube.Pos{0, 170, 0})
	w.SetTime(60100)
	w.StopTime()
	w.SetTickRange(0)
	w.StopThundering()
	w.StopRaining()

	srv.Listen()
	srv.CloseOnProgramEnd()

	for p := range srv.Accept() {
		log.Debug("Player joined", "name", p.Name())
	}

}

func readConfig(log *slog.Logger) (server.Config, error) {
	defaultCfg := server.DefaultConfig()
	g := gophig.NewGophig[server.UserConfig]("config.toml", gophig.TOMLMarshaler{}, 0777)

	cfg, err := g.LoadConf()
	if os.IsNotExist(err) {
		if err = g.SaveConf(defaultCfg); err != nil {
			return server.Config{}, err
		}
		return defaultCfg.Config(log)
	}
	return cfg.Config(log)
}
```

## Custom Configuration File

We are not done quite yet! You will see that your program will error because we have not created our file yet to handle the custom configuration. To do so, create a folder called `minecraft` and in it, a file called `config.go` and use the following code:

```go minecraft/config.go
package practice

import (
	"github.com/df-mc/dragonfly/server"
)

type Config struct {
	server.UserConfig

	Practice struct {
		Tebex       string
		Whitelisted bool
	}
}

func DefaultConfig() Config {
	c := Config{
		UserConfig: server.DefaultConfig(),
	}
	c.Resources.Folder = "resources"
	return c
}
```

## Starting the Server

Great! Now we have created our initial entry point file and custom configuration struct. With the `minecraft.Config` struct, you can add pretty much any data point you want that falls under the basic Go types (as well as combine them into a struct like the example above).

When your server runs, the server will automatically load and add any empty fields (or create the file if it does not exist), and you will be able to use these configurations during your program life cycle.

We're now ready to start our server! Simply run the following command in your terminal, add a server in your Minecraft tab with the address of `127.0.0.1` and port `19132` (or whatever you specified in your `config.toml`) and you should be able to join the server!

!!!success **Congratulations!**
You just made your first basic Dragonfly server! With this is mind, you should now be able to traverse through the next few sections to see real world examples of servers and how to organize your file system as well learning about control flow through your program with events and other tasks.
!!!

## Further Information

Please note that on the more specific tutorials on programming specific gamemodes, you will most likely modify certain behaviour in both the entry point file and the configuration file. Understand and analyze the behaviour of every chunk of code within these files so you have understanding of why you will change code in a later section
