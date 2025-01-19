# Backend Engineering Take-Home Exercise

Taylor Swift needs your help - while existing ticketing systems work, they are failing to enable her true fans to come to concerts at face value.
You've been tasked to implement a simplified event ticketing system API that allows creation and management of events, ticket inventory, and basic ticket purchases.
On top of basic functionality, you need to come up with a creative way to stop bots from buying tickets. (Doesn't need to be implemented, but should be technically feasible and economical)

## Time Expectation
* Expected time: 2-3 hours
* Please don't spend more than 3 hours on this exercise

## Core Features

### 1. Event Management
* Create, read, and update events
* Each event should have basic details (name, date, venue, etc.)
* Events can have multiple ticket types (e.g., VIP, General Admission)

### 2. Ticket Inventory
* Track available tickets for each ticket type
* Handle concurrent ticket purchases safely
* Implement basic reservation mechanism

### 3. Checkout Flow
* Create a ticket checkout endpoint
* Handle basic error cases (sold out, invalid quantities, etc.)

## Technical Requirements

1. Use TypeScript
2. Implement proper error handling
3. Include basic input validation
4. Use any database of your choice (this can be mocked, but the structure of the data should be defined)

## What We're Looking For

* Clean architecture and separation of concerns
* Type safety and proper interfaces
* Concurrency handling

## Getting Started

Take a look at the `domains` folder to see some sample interfaces to get started. Please feel free to modify them as you see fit, they are merely a framework to get started.

## Bonus Points

* There are quite a few considerations when building a ticketing platform. Ideally, you would outline things you would do given more time, and things you need to look out for.

## Submission Guidelines

1. Share your code via a private GitHub repository
2. Include a README.md with:
    * Setup instructions
    * Architecture decisions and tradeoffs
    * What you would improve with more time

## Evaluation Criteria

* Code organization and architecture
* TypeScript/type safety usage
* General handling of weird cases
* Bonus points for additional features (if time permits)
