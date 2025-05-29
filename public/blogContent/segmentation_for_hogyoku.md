## Motivation

So, it all started with aim of understanding segmentation in memory!

I mean if you search on internet, on what is memory segmentation, then you will find

- _"A process is divided into Segments"_

- _"A memory management technique that divides a program's address space into logical units called segments"_

ohhh man, please have mercy!

I mean, what does it mean to divide the process into segments?

hard to digest?   I couldn't!

So thought it would be interesting to implement this thing...

And what's the closest thing I can do... is to write an OS myself, and see how things work and break

## Me trying to figure things out...

Started scavenging on the internet for resources, on how I could build one!

Came across this amazing resource called [OSdev](https://wiki.osdev.org/Expanded_Main_Page) , and thought this could be a good starting point!

Went through a couple of pages, and got my intial setup working!

## Initial setup

Nothing fancy, an OS using GRUB bootloader, which boots up printing 

```
Bankai!
Getsugatensho...
```

on the screen 

(Bleach fans I hear you!)

## What next?

At this point, the hardware jargon started to kick in...

Was I writing this OS for x86, or for arm..

Without hanging on this decision too much, just picked x86 cuz that is the most used architecture we know of...

Wrote some [sample programs](https://github.com/Rahul-Baradol/hogyoku/tree/x86_assembly) in assembly, to get a hang of it...

And then realized there are registers in the x86 family, made for different purposes...

Some of them include 

```
rsp -> stack pointer
cs -> code segment register
...more
```

Now, if you recall the memory layout of a C binary in memory, it looks like 

```
(low memory address)                                     (high memory address)

| Text | Initialized Data | BSS | Heap ->          <- Stack | Environment / Args |
```

Here the text section is the place where all the instructions are placed!
And everything after Text section, is where the data part lies i.e the section of memory which the program uses to store "data"

Now, we can simply compress the layout to actually being

```
| Text | Data |
```

Because everything after text, is just data!

Now how does processor know which instruction to execute?

It uses instruction pointer, which is a register, increments it to find out memory address for next instruction to execute...right?

Well....the instruction pointer actually holds the offset!

What do i mean?

There is another register called CS (code segment) which holds the base address for the code section of a program, and instruction pointer's value is just added to the value stored in CS register to get the actual memory address of the instruction!

If you are thinking, the address in IP gives the memory address of the instruction, then not exactly..

The memory address of the instruction is derived from 

```
(value in CS register) + (value in instruction pointer)
```

If that confuses you, then this might help

```
CS
|      
v
| Text | Data |
```

which means CS register holds the memory address, where code/text section starts...

...and intuitively do you think there is a register for data section as well??

Yes!

That is DS register, and it points to the address where data section starts!

```
CS     DS
|      |
v      v
| Text | Data |
```

Now we all know just like all programs, our kernel is also a program.

It also has it's own code section and data section.

And when the bootloader gives control to our OS, that basically means CS pointing to the code section of our kernel 

The bootloader doesn't just change CS and DS value, but also puts the system in protected mode.

There are two modes, in x86
- Real mode - instructions are 16 bits, and memory access is limited to 1MB
- Protected mode - instructions are 32 bits, and memory access is limited to 4GB, and makes sure processes are not messing with each other

_Think of protected mode being CPU unleashing it's Bankai :)_

Everything is cool, until our kernel is the only lone wolf here!

What if we have to run multiple programs?

All programs have their own code and data sections...

Now you might have heard of the following statement

```
Loading the program into memory
```

Fancy...but what does it mean?

It does mean to store the code and data section of the program in memory, but that's it?

How do we keep track of it?

How do we know, that this place at memory is where the code section of a program begins...

So there is a need here, to maintain this information right?

How can we store this?

Simplest of all, is to maintain a list of integers in memory, and storing information bitwise

As in, a 64 bit integer will hold information like
- where the section begins in memory
- is the section supposed to be a code section or a data section 
- the size of the section
- ...so on

This list of integers, is what forms a global descriptor table!

You can checkout the detailed structure of a record in global descriptor table [here](https://wiki.osdev.org/Global_Descriptor_Table). 

Head to "Segment Descriptor" section...

But the core idea, is to be understood here!

A list of integers stored in memory, holding onto the information about different sections in memory 

And guess what?

x86 has a register to store the starting address of this list of integers as well !

That is GDT register, stands for Global Descriptor Table.

Now, you notice something...?

_A table which stores information about sections, the sizes of them, and the starting addresses..._

Sounds familier?

Well....this so called Global Descriptor Table acts as the **Segment Table**, and the sections that I was talking about are the segments !

And this is what segmentation is all about!

Segmentation is more of a theoritical concept, and this is x86 way of implementing segmentation !

You are dividing the memory, into different sections/segments and storing the data about the sections in the Global Descriptor Table/Segment Table

When the CPU is executing a program
- CS register holds the starting address to the code segment 
- DS register holds the starting address to the data segment 

When you try to access a memory address for example...

...that is treated as the offset by the CPU

As in, if you are accessing the memory address let's say 0x10000

Then CPU tries to take the data at the memory location 
```
(value in DS register) + 0x10000
```

And this DS value was set while your program was loaded...

And if you access a memory address, that crosses the limit of the data section/segment...

You get, the mighty _segmentation fault_

And this limit is stored in the global descriptor table itself, and it is managed by the hardware via GDT register!

And yes, the revelation?

The segmentation is taken care by the hardware when it comes to x86...

All my kernel has to do is, create this table in memory, and set the GDT register value to the base memory address of the table!

In practice, the first entry in the GDT is left empty, and is called null descriptor.

That is used as a placeholder, sometimes used to store a pointer to itself...

[Here](https://github.com/Rahul-Baradol/hogyoku/blob/main/arch/i386/boot/gdt.s) is the code to initialize the GDT !

Now this works differently, when it comes to architectures like arm...but that is for another story!

In the next section we discuss how paging works, and how we handle inputs !

_Bouncing off!_