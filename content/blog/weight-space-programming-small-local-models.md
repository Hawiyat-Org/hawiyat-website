---
draft: false
title: "Weight-Space Programming for Small Local Models"
description: "MIT researchers got a frontier model to read, repair and write neural network weights in plain language. Why the 0.016% edit is the part that matters for small local models."
date: "2026-11-03"
author: "Hawiyat Team"
tags: [research, local models, fine-tuning, interpretability, ai infrastructure]
keywords: [weight-space programming, edit llm weights, small local models, customize llm without training, llm weight editing, local ai algeria]
---

**TL;DR.** A frontier model handed nothing but the raw numbers of a neural network named the game that network was trained to play, four times out of four. It repaired a broken robot policy by changing 3.5% of its weights, and it wrote working game players from scratch with no training at all. On Qwen3.5-0.8B it edited 0.016% of the weights and lifted MATH-500 from 7.9% to 48.1%. For small local models the interesting number is the 0.016%, not the score: customization starts to look like a 256 KiB patch on a shared 1.6 GB base model instead of a fine-tune per customer.

![Weight-space programming: a 0.016% weight edit against a 1.6 GB base model](/blog/weight-space-programming-small-local-models-hero.png)

On 2 November 2026, four researchers at MIT CSAIL published [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/): Rikiya Takehi, Jayden Teoh, Alex Zhang and Omar Khattab. Their claim is narrow and strange. A general-purpose language model, used as it ships, can read and write the weights of another neural network in natural language, without an optimizer and without gradient descent. They call it weight-space programming, and they are careful to call these sparks.

This post walks through what they measured, then does the part the paper leaves to the reader: what it would take to turn this into small, per-customer models you can customize on the fly, on hardware you actually own.

```widget
wsp-stat-band
```

## What weight-space programming actually is

Weight-space programming means a language model reads and writes another network's weights directly, around a written specification, without an optimizer and without gradient descent. The model reasons about what each layer should compute, then changes the numbers that make it compute that. It is not fine-tuning with a friendlier interface: there is no dataset, no loss, no backward pass, and in several experiments no ability to run the network at all.

Until now, weights were written three ways: by optimization (Adam, Muon and their relatives), by separate networks trained to emit weights, or by compilers that turn a formal program into a network. All three put a symbolic procedure between the goal and the numbers. The new claim is that the procedure can be reasoning in natural language.

That distinction matters commercially. A training procedure needs data, GPUs, and a new artifact at the end. A reasoning procedure needs the weights, a description of the goal, and enough context to hold both.

## The model can read a network it has never run

The first three experiments remove every shortcut. The model gets weights as text and nothing else: no forward pass, no benchmark, no labels on the dimensions. In the first, four PPO policies play four different games on an identical 10x10 grid with identical actions and identical 17,253-weight architecture, so nothing but the numbers can distinguish them. Asked which game each network was trained on, with no list of candidate games supplied, the model named all four correctly. Its own explanation was structural: in Breakout the agent channel's first-layer weights sit along the bottom row, which is where a paddle lives, and the output layer separates the actions that game needs.

The second experiment moved to diffusion models that draw a filled circle, square or triangle. The model identified all three, and drew them as outlines rather than filled shapes. That mistake is the evidence: a model computing a forward pass would have produced fills. It was reading the geometry of the weights.

The third is the one that scales. Take a 7.16M-parameter character transformer, delete the input embedding and the output layer, and hand over only the four middle blocks. Nothing left in the weights says which character is which, and the network cannot be run on text. The model still named the training language for Python, romaji Japanese and English, twice each, and it identified every copying head in all three models with no false positives: layers 2.1, 3.1 and 3.5 for Python, 3.3 for romaji, 3.1 for English. To get there it multiplied weight matrices to compose one head with another, which is a published interpretability method it was never told about.

| # | Question | Network | Allowed | Result |
|---|---|---|---|---|
| 1 | Which game was this trained on? | MLP 500-32-32-5, 17,253 weights | weights as text, no tools, no options given | 4 of 4 games |
| 2 | What does this diffusion model draw? | DDPM 160-64-64-144, 23,824 weights | weights as text, no forward pass | circle, square, triangle |
| 3 | Which language, from the middle only? | 4 layers x 6 heads, 7.16M weights | middle blocks, Python, no runs on input | 3 of 3, all copying heads |
| 4 | Why does this policy fail, and fix it | Kinetix actor, 171,664 weights | weights, scene, one recorded episode | 3.5% edited, 1,024 of 1,024 |
| 5 | Write a player for this game | 600-32-32-6, all zeros | rules and source, no data, no rollouts | beats PPO-100M on 3 of 3 |
| 6 | Write a Go player | 243-512x6-82, 1.48M weights | Python sandbox, 0 to 50 forward passes | beats equal-size PPO-20M at 50 |

## It fixes a failure by editing 3.5% of the weights

Repair is the experiment with the clearest commercial shape. A PPO policy drives a car at a ramp in the Kinetix environment and gets stuck, because it converged to a local minimum: it never learns to reverse far enough to build a run-up. Given the weights, a description of the scene and one recorded episode, the model explained the failure and wrote new weights in a single reply, with no tools, changing 3.5% of them. Success went from 0 of 256 episodes to 1,024 of 1,024.

Its reasoning is worth reading because it is not a search. It added a small parallel path through a few units per layer that reads the car's position and speed, and switches the trained network back on once the wheel is past the strip. That is a circuit edit, described in words, applied as numbers.

```widget
wsp-verbs
```

Writing from nothing is harder, and the results are less even. Given the rules and source of three MinAtar games and a network of all zeros, with no data, loss, gradients or rollouts, it produced weights that beat PPO trained for 100 million steps in all three games. Against 500 million steps it scored 20 times as much in Breakout, came close in Asterix, and reached about 60% of the score in Seaquest.

| Game | PPO, 100M steps | PPO, 500M steps | Weights written in one reply |
|---|---|---|---|
| Breakout | 15.8 | 25.3 | 517.4 |
| Seaquest | 5.6 | 88.9 | 53.1 |
| Asterix | 25.8 | 55.2 | 53.2 |

At 1.48M weights the parameters stop fitting in a prompt, so the harness changes: the model gets a Python sandbox, writes the network layer by layer, and spends a budget of forward passes to see what it has built. With no forward passes it beats two smaller PPO networks more than half the time. With 50 it beats an equal-sized PPO network trained on 20 million games. The zero-budget run is a single Python program of 336 lines.

## The result that matters for small models: 0.016% of a language model

Everything above is a toy network. The eighth experiment is a real 0.8B-parameter language model, Qwen3.5-0.8B, and it is the one to read twice. The model was asked to make it better at math with no gradients, no training and no test-set access, using a CPU Python kernel over the weights and a budget of 10, 25 or 50 forward passes on practice problems.

It found loops, not weak arithmetic. The base model repeats itself and rarely finishes an answer: 85 of its first 96 practice answers ran to the 32,768-token limit, a failure Qwen's own model card warns about. The model traced the loop to one direction written by the MLPs in layers 15 and 19, and subtracted that direction from 64 output columns in each layer. 131,072 weights out of 0.8 billion, or 0.016% of the model.

| Setting | MATH-500 | GSM8K | IFEval | Answers hitting the token limit |
|---|---|---|---|---|
| Base | 7.9% | 13.8% | 21.0% | 93.0% |
| Edited, 10 forward passes | 12.3% | 25.7% | 49.0% | 87.2% |
| Edited, 25 forward passes | 14.1% | 25.1% | 39.9% | 86.4% |
| Edited, 50 forward passes | 48.1% | 67.1% | 62.3% | 33.1% |

```widget
wsp-fwd-bars
```

Two things in that table are easy to miss. First, instruction following almost tripled (21.0% to 62.3%) even though nothing in the edit is about instruction following: a loop is not a math bug, so removing it helped everywhere the model was stalling. Second, the 10 and 25 pass rows barely move the loop rate. The result is not a smooth curve that rewards effort; it is a threshold. At 25 passes the model is still looping 86% of the time and the MATH score has gained six points. At 50 the loop rate falls to a third and the score jumps 34 points.

## The control that keeps the claim honest

The authors ran the same procedure on Gemma 3 270M, an instruction-tuned model that rarely loops: only 8.5% of its answers reach the token limit, against 93% for Qwen. It made no difference. MATH-500 went from 6.8% to 7.0%, 7.6%, 7.7% and 7.0% at 5, 10, 25 and 50 forward passes. The model found ordinary reasoning errors, wrong arithmetic and invalid algebra, with no single component to switch off, and its small targeted edits moved nothing.

Their conclusion is the sentence to keep: editing weights could remove an obstacle that hid an ability, but it could not add an ability the model lacked. That bounds the whole technique. It is not a training replacement. It is a way to unblock what a model already has, and the value of that depends entirely on how much is blocked.

## Why this is a small-model story, not a frontier-model story

The method gets harder as models get bigger, and the paper says so: the limits it names are context length and harness engineering. 17,253 weights fit in a prompt. 1.48 million needed a Python sandbox and a forward-pass budget. 0.8 billion needed a kernel, a practice set and 50 passes. Nothing here was demonstrated on a frontier-scale model, and the cost of doing so is not estimated.

That inverts the usual reading. The interesting consequence is not "frontier models can be improved after release". It is that the class of models you can customize this way today is exactly the class that runs on hardware a business can own: roughly 0.3B to 4B parameters, the size that fits on a laptop, a mini PC, or one rented server.

```widget
wsp-patch-slider
```

Five things follow, and they are engineering consequences rather than measured results. Treat them as the case to test, not as findings:

1. **The unit of customization becomes a patch, not a checkpoint.** 131,072 weights at 16-bit is 262,144 bytes, against about 1.6 GB for the full 0.8B base at the same precision. That is roughly one part in six thousand. A per-customer variant can be a small file applied to a shared base, instead of another complete model on disk.
2. **There is no backward pass in the loop.** Training needs activation memory, optimizer state and gradient accumulation. The measured edit ran in a CPU Python kernel with a forward-pass budget. The scarce resource changes from GPU hours to a number of forward passes and someone's review time.
3. **The blast radius is small by construction.** 0.016% of the weights moved. The authors argue this avoids the catastrophic forgetting that fine-tuning causes, and that specific claim is not measured in the post, but the mechanism is visible in the number.
4. **Per-tenant variants become a load-time decision.** One base model, N patches, chosen when the model starts for a given client or workflow. For a market where a 1.6 GB download is a real logistics problem and a 256 KiB file is not, that difference decides whether per-customer customization is a product or a support ticket.
5. **Small models are where the economics already work.** A 0.8B model in 16-bit needs roughly 1.6 GB of memory. That runs beside an application on ordinary hardware, which is the only kind of local deployment most Algerian businesses can buy this year.

## What still has to be true before you ship one

The honest list, because a weight patch that changes behavior is a new kind of artifact and the paper does not address it:

- **Behaviour is not readable yet.** In the seventh experiment the authors fine-tuned two Gemma 3 270M copies, one honest and one sycophantic, and asked the model to identify the sycophant from weights alone. It failed all four attempts. It succeeded only when allowed to look at attention patterns from texts it wrote itself: three of three pairs. Head 10.2 in the honest model puts 94.3% of its attention on the question's numbers and 0.75% on the user's suggested answer; in the sycophant those are 3.5% and 85.7%. So "audit a model without evaluating it" is an aspiration, not a result.
- **Capability cannot be added, only unblocked.** The Gemma control above.
- **It is one lab, one upstream model, and an unreleased harness.** The authors say they are building a benchmark. No independent replication exists.
- **A weight patch is an opaque artifact that changes model behaviour.** It has to be signed, versioned against a base-model hash, and evaluated before it is loaded, or it becomes a supply-chain path into every deployment that trusts it. This concern is ours, not the paper's, and it has no answer yet.

## What Hawiyat offers today

Nothing in this post is a Hawiyat product. We do not serve locally edited models, and no vendor does this commercially yet.

What we do sell is access to frontier models through one API key, on monthly plans in dinars: Composer Pro at 6,000 DA per month, MAX 5X at 15,000 DA, and MAX 20X at 30,000 DA. If your goal is to run a small model yourself, [Hawiyat Cloud](/services/hawiyat-cloud) provides managed containers or a VPS with a managed database, quoted by order in DZD, which is the kind of machine a 0.8B model actually fits on. You can compare plans on the [pricing page](/pricing) or see the [API plans](/api).

Payment is by CCP or Baridi Mob, with no foreign card required. If you want to argue about whether this technique is worth a pilot on your own hardware, that is a conversation we will have honestly: today it is research, not a service.

## Frequently asked questions

**What is weight-space programming?** It is a language model reading and writing another neural network's weights directly, in natural language, without an optimizer or gradient descent. The model reasons about what a layer should compute and changes the numbers that make it compute that. The term comes from a 2 November 2026 MIT CSAIL blog post by Takehi, Teoh, Zhang and Khattab.

**Can a language model really edit neural network weights directly?** Yes, at small scale, and the paper measures it. It edited 3.5% of a 171,664-weight control policy to take a task from 0% to 100% success, and 0.016% of a 0.8B language model to lift MATH-500 from 7.9% to 48.1%. Both edits were written by the model as text or code, with no training loop.

**Does this replace fine-tuning?** No. A control experiment on Gemma 3 270M, a model that did not loop, gained nothing from editing: 6.8% on MATH-500 before, 7.0% to 7.7% after. The authors conclude an edit can remove an obstacle that hides an ability but cannot add an ability the model lacks. Use it to unblock, not to teach.

**How much smaller is a weight edit than a full model?** On the measured case, 131,072 weights of a 0.8B model: 262,144 bytes at 16-bit against about 1.6 GB for the full checkpoint, roughly one part in six thousand. That is what makes a per-customer variant shippable as a patch instead of a separate model.

**Can I customize a small local model without a GPU?** The measured edit ran in a CPU Python kernel with no gradients and a budget of 10 to 50 forward passes, so the editing step itself does not need a GPU. Serving the edited model still needs the memory for its weights: about 1.6 GB for 0.8B parameters at 16-bit.

**Is this available in any product yet?** No. The authors describe early results, a single upstream model, and a benchmark they are still building. No independent replication exists, and the paper does not address signing or evaluating the patches, which any production use would require.

**Can I run a small model on my own server with Hawiyat?** Yes, as a managed container or VPS on Hawiyat Cloud, quoted by order in DZD. We do not supply edited models or weight patches, and we will not claim a capability we have not run in production.

**How do I pay for a Hawiyat plan?** CCP or Baridi Mob, in dinars, with no foreign card. Plans are 6,000 DA per month for Pro, 15,000 DA for MAX 5X and 30,000 DA for MAX 20X, activated after we confirm the payment.

## Sources and how to cite this post

The primary source is the research post: Rikiya Takehi, Jayden Teoh, Alex Zhang and Omar Khattab, "Sparks of Weight-Space Programming: LLMs can natively read and write neural network weights", MIT CSAIL, 2 November 2026, [rikiyat.github.io/blog/weight-space-programming](https://rikiyat.github.io/blog/weight-space-programming/). Every measured number here comes from it, including the failed experiments. The engineering argument about patch size, on-the-fly customization and supply chain is ours, and is labelled as such in the text.

What we did not verify: we did not rerun any experiment, and the released logs and the edited Qwen checkpoint were not inspected for this post. The patch-size arithmetic (parameters times two bytes at 16-bit) is arithmetic, not a measurement, and real deployment adds alignment and metadata overhead.

To cite this post: Hawiyat Team, "Weight-Space Programming for Small Local Models", Hawiyat, 3 November 2026.

Hawiyat is not affiliated with MIT CSAIL, Alibaba (Qwen) or Google (Gemma). Model names are used to describe published research.
