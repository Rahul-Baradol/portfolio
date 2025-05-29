## Motivation

So _Compiler Design_ is one of the subjects in my B.Tech, and arguably one of the most 
interesting subjects that I found throughout the course. The overall outcome was to understand and to 
be able to build a simple compiler. From _Lexing_ to _Code Generation_. It was fun :)

But there's a catch !

We didn't write the lexer and parser from scratch. We used **flex** which is a lexer generator. And 
**yacc**, a parser generator. Although it made our lives easier, I could notice some gaps. An abstraction layer that both the tools created, which gave me mixed feelings of 

_"Ahhh, I am trying to figure out what actions to perform after a reduction"_

...and also 

_"I have no idea what i am doing"_

So on *May 22, 2025*, while _rewatching_ **Last Of Us**, I decided let's build a simple compiler. 
And no, not on the mission to compete with GCC here, but one to understand how all the phases of the compiler come together.

Let's try to understand intuitively!

## What are we building?

A Lexer, Parser and a Intermediate Code Generator.

And for simplicity, let's just stick to the _Declaration Syntax_.

If you are thinking about _if statements_, _for loops_, _functions_... 

hang in there! It will be pretty wild !

Lastly, let's use **C++**

## Phase 1 - Lexer

So let's consider the following snippet 

```
int hype = otherThings + isLastOfUs3Coming * 3;
```

So, we need to break this down!

Why?

So we can work with them easily. This raw line of string, won't do us anything good!

Now the next question is to divide into chunks, but to what granularity!

Well!
I will ask you ! 

What granularity helps here? 
If we divide the line into individual characters, like 

```
i, n, t, h, y, p, e, .....
```

would it help us? 

We are actually interested in knowing things like 

_Wooh, there is a integer declaration here_ -> and this is told by the word **int**

_Mmmm, there is a variable here whose value depends on Last of Us 3 coming or not_ -> and this is told by the variable _isLastOfUs3Coming_

So here, we are concerned with the words themselves, and it would make sense to divide to word level granularity.

Even if we divide the line to individual characters, we might have to end up combining them to make sense out of it...Right?

**So chunks are words, clear** 

Once we have chunks like 

```
    int, hype, =, otherThings, +, isLastOfUs3Coming, *, 3, ;
```

And here, if you are familier with C, **int** is a keyword here
and **hype, otherThings, ..** are variables 

But what tells that?

I mean how would we know, if a given word is a keyword, variable, number, etc.

Here's where we will have to add some context to the chunks!

We tell the lexer in advance what are supposed to be keywords, and those words are not to be used as variables!

And we can identify the numbers using fancy regular expressions!

You can find the code for the lexer [here](https://github.com/Rahul-Baradol/kido/blob/main/lexer.cc)!

## Phase 2 - Parser

Now that we can identify the chunks, from the line...how do we make sense out of it?

I mean, now we are able to tell what indivdual parts are ...

But is the sequence of those chunks make sense ?

What if the line was as follows 

```
otherThings = hype int + isLastOfUs3Coming * 3;
```

is this making sense?

First of all, what is _"to make sense"_?

It depends on how we want our language to be! 

Surely we can write a language whose declaration syntax loooks crazy as above.

But let's keep our cool, and let's maintain some decorum here....

If we are trying to make declaration syntax look like C, and if the above crazy line is written, then our cute compiler should scream at the programmar :)

But how does it know?

How do we tell the compiler, that this is how the declaration is supposed to be!

_**Enter, grammars**_

And no not the english grammar, I mean the grammar that we all learn in _Theory of Computation_

That will help us in defining, how the syntax goes >

The grammar that I chose is 

```
1) S ->    Declaration S 

2) Declaration -> Type Id = Expr ;

3) Type -> int
4) Type -> float

5) Expr -> Expr' +  T
6) Expr -> T 

7) T -> T' * F
8) T -> F 
9) F -> Id
10) S -> lambda
```

Pretty neat!

This tells us, how our declaration syntax should look like!

And the above written line 

```
int hype = otherThings + isLastOfUs3Coming * 3;
```

satisfies the grammar, whereas the crazy line

```
otherThings = hype int + isLastOfUs3Coming * 3;
```

doesn't satisfy :(

_Why?_

because the line doesn't start with a **Type** (which is a keyword), and a **Type** is used in place of **Expr** on the right-hand side.

Now the question is how do we use this grammar.

It is important to think about the implementation, otherwise it would be none other than just theory.

Intuitively, we have 2 places to start

- Either start with S, and keep expanding the non terminals till, we find a perfect breakdown
- Or start with the chunks in the given line, and keep shrinking the chunks to the non-terminals till we get to non-terminal S

In either cases, we can prove that the given line is a valid syntax.

We can go with either implementation!

Let's go with the second approach, where we try to shrink the chunks all the way to **S**

Now to speak of some technical jargon, 
- the chunks are called tokens, and are treated as terminals in the grammar
- and the process where we try to figure out if the given line satisfies the grammar or not, is called **parsing**

The second approach is called bottom-up parsing, as we begin parsing from the terminals.

We maintain a stack, to keep track of what we have seen...

Next question to answer is, how do we know when to shrink the terminals?

Consider the following same example 

```
a + b * c
```

Now here is a interesting problem we run into,

let's say we have seen **a**, and we push it to the stack, 

now we shrink it to F, then T....now what ?

_should we shrink further to E ?_

or 

_should we move onto the next terminal_

We need someone here, to tell us what to do.

**Enter parsing tables**

We generate what is called a parsing table, using the grammar rules, which would tell us what rule to consider.

Now there is some jargon here, to decide what kind of parsing we want to do.

The **efficiency** of a parsing table is how quickly it catches errors!

That way, the most efficient one is CLR table.

There are tradeoffs here as well. In exchange for efficiency in catching errors, the CLR table consists of most states as compared to other tables, which makes it expensive to store

On the contrary, CLR table is converted to LALR table, which is a slightly less efficient as CLR, but works wonders. And most  compiler implementations use LALR table.

For our case, let's use CLR table!

Here is the code for [Parser](https://github.com/Rahul-Baradol/kido/blob/main/parser.cc)

Okay, so now we can tell if the given line is part of the syntax or not.

If it is valid syntax, then what?

We need to find a way to represent the code in a format, we can easily work with.

So far, we used a stack to know if the given line belongs to the grammar or not.

But let's say we want to move further, with steps like code generation, how do we do it?

## Phase 3 - Intermediate Code Generation

Before jumping into what we will do, what do we want ?

How do we want to generate the code ?

Consider the following example 

```
int x = a + b * c;
```

For this example, the intermediate code could look as simple as

```
t1 = b * c;
t2 = a + t1;
a = t2;
```

The above intermediate code is called three-address code. And we will be using this format.

Nowwwww....how do we generate this ?

How do we generate the first statement...

```
t1 = b * c;
```

How do we know, we have to evaluate the multiplication expression first.

If you observe, then the grammar rules have the answer in it.

Observe what happens while parsing, let's say we have the parser stack content as follows

```
stack grows -> 
Expr, +, T, *, F
```

Then we reduce _T * F_ to _T_ right?

Then the stack content goes like
```
stack grows ->
Expr, +, T
```

Then we reduce _Expr + T_ to _Expr_.

We observe something interesting...that the order in which the reductions occur is the same order which we would generate the code.

Bingo! So the order is hidden in the way how reductions work!

But how do we capture this?

There could be multiple ways...

One of the popular ways is to generate a tree, where the terminals lie in the leaf nodes.

And this is what you call a parse tree.

So the parse tree for the expression above looks like 

```
        S
        |
    Declaration
        |
-----------------------------------------
|      |       |       |                |
Type   Id      =      Expr              ;
|      |               |
int    x          ----------------
                  |      |       |
                 Expr    +       T
                  |            / | \
                  T           T  *  F
                  |           |     |
                  F           F     F
                  |           |     |
                  a           b     c
```

And at each rule, we can define a action to perform when that reduction is done.

In our case, we simply generate the three address code corresponding to the rule.

So how do we traverse the tree...answer is **post-order** traversal

Why??

Remember the order in which the three-address code is generated. 

First we generate the code for multiplication expression, and then the addition expression.

Generally, we generate the code for the bottom most nodes, and we start coming up the tree...

For a given node, after we have generated code for the children nodes, is when we generate the code for the current node.

We can achieve this using **post-order** traversal.

Code for the intermediate code generator is [here](https://github.com/Rahul-Baradol/kido/blob/main/icg.cc).

## What next?

Now there are some things, that are need to be addressed. 

You can observe that, throughout the process we did not create any symbol table, we did not generate a syntax tree which is actually generated right after parse tree.

For our use-case, we didn't have to!

We might need symbol table, when we run into cases where we need efficient lookups.

Right now to get token information, we scan the parse tree all the way down to the leaf node...but how about having all the tokens in a table, and the leaf node pointing to a entry in the symbol table...

We have a lot of options available...and all of them have their own tradeoffs.

What we understand from this toy project, is that how simple things we use everyday, needed such a thought back in the days to implement.

And when we try to implement such nuances ourselves, is when we understand the pitfalls, and the intuition behind decisions taken!

That's it for this. I might extend the grammar, and throw some code optimization in the near future, if I get more time on this!

_Bouncing off!_