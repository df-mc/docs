---
label: Frequently Asked Questions
icon: question
---
## Is Dragonfly ready for use?
Dragonfly is currently in its early developmental phases. While you certainly can use it, there will be things that are lacking or unimplemented. Ultimately, Dragonfly's goal is to get close to as vanilla Minecraft as possible, features/issues for these are tracked in the following [Github Issue](https://github.com/df-mc/dragonfly/issues/566). If you encounter any bugs or would like to see a feature implemented, feel free to open an issue or pull request.

## How do I add plugins?
Due to the way Dragonfly functions, it doesn't support plugins. Dragonfly is a library that has to be included by another program, where the actual logic would be controlled, altered and extended by the main program.

## How do I update my Dragonfly server?

If you're using Dragonfly as a library, you can simply do:
```
go get -u github.com/df-mc/dragonfly@master
```

This will download the latest stable Dragonfly tag. If you're targeting a specific tag, try:
```
go get -u github.com/df-mc/dragonfly@tag
```

You can also target a specific commit by using the same command by replacing the tag placeholder with the commit hash.