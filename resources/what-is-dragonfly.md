---
label: What is Dragonfly?
order: 1
icon: question
---
Dragonfly is a server software for Minecraft that's powered by [Go](https://golang.org/).

## Intended Audiences
Dragonfly is intended to be used by developers rather than server owners, unlike other server software, most of the behavior has to be controlled by code.

## Differences from other server software
Dragonfly is a library that has to be included by another program, where the actual logic would be controlled, altered and extended by the main program.

This differs in contrast to other Plug and Play server software, where the server exists as the main program that which includes user-provided plugins that allow the server's behavior to be modified.

Dragonfly on the other hand works as a library as opposed to a Plug and Play server; therefore, **it has no plugin system built-in.**

## Overall Philosophy

The following sections will go into a deeper dive into the philosophy and common practice when using Dragonfly (and Go). If you are new to Dragonfly and are familar with other softwares (such as Pocketmine-MP or Nukkit), it's strongly recommended to read over these sections in order not to fall into bad design patterns and pitfalls that could jeopardize your projects.

## Community
If you have any other questions, come join us in the [Bedrock Gophers](https://discord.gg/U4kFWHhTNR) Discord server!
