---
label: Abstracted Packets
icon: rss
---

Dragonfly believes in abstraction of the packet layer, thus it does not provide any method to access the underlying packet layer, if there's a missing API for something you want, you are free to open an [issue](https://github.com/df-mc/dragonfly/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) or a [pull request](https://github.com/df-mc/dragonfly/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

## Rebuttal 
Some counter this idealogy and say:
!!!
*Allowing for free use of packets makes more sense because the software should allow the full capabilties over the network!*
!!!

While this is certainly a good point, it's key to understand that there is no reason to access a network layer when you can make the abstraction at the API level.

For instance, if you want the ability to send a scoreboard (which already exists in Dragonfly, this is an example), instead of hackishly listening to packets and sending them, implement the internal Dragonfly code to implement them at the API level.

This in turn will make these features more accessible to other users as they are baked in, rather than decoupled into other peoples' implementations using packets.

Overall, the idea against a packet system can be summarized into [this message](https://discord.com/channels/623638955262345216/762078314155212840/937426415492681758) that states:

> *"Using packets is like connecting your phone charger to the power line directly while you have power sockets at your home."*

## External Package

The [Bedrock Gophers](https://github.com/bedrock-gophers/) offer a package called [intercept](https://github.com/bedrock-gophers/intercept) which acts as a packet handler in Dragonfly by using unsafe features of Go to access the packet layer. 

!!!
### Disclaimer
You should only use the package if the behavior you're trying to program is essentially a) impossible to do in vanilla Dragonfly or b) not implemented yet in vanilla Dragonfly.
!!!