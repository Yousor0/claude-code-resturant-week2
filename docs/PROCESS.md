### What did you build? Describe the feature in plain language.

I built a booking reservation system with a fully working database for my resturant "Golden Dragon" from week 2 of this class. The feature for the booking system utilizes postgre & primsa to store and manage the data, and express as the middleware to host the server.

## How did micro-iteration feel? Was working in small steps natural or frustrating? Why?

Micro-iteration feels more on hand than fully telling it doing it at once, during micro-iteration it feels frustrating cause not all of the code works all at once compared to utilizing a built in CLI AI code helper like Claude Code on VScode, however it allows the user to understand what they are coding and be able to work in smaller pieces so the final product can be more refined with features with less bugs.

## What did self-review catch? When you asked the AI to review its own code, what issues did it find? Give at least one specific example.

The self review in **Phase 1 — Data & Models** was able to catch that the AI (itself) forgot to implement key features into the database such as, limiting the number of people for each reservation to 8 people, and making each reservation a unique number so times do not overlap.

## Tool impressions. What did you like or dislike about [Copilot Agent / Claude Web]?

Claude Web is pretty similar to Claude Code but I think it would be good for small projects and guiding the users to learn how to code. The AI also asks you questions and gives multiple choice / check box type questions to specify how to go foward with the code and information it generates.

## Self-review patterns

Claude web's self catching error defintely always catches missing features and also double checks for logic errors so it can be as secure as possible. In Phase 1 of the assignment Cluade Web's self review was looking at the worst case scenario during the test cases to see how the feature implemented would handle a large number of data entires. During Phase 2 of the feature implementation we were building the core logic and functionality of the booking, availability, and canceling feature during the review phase it goes over "What-If" scenarios, one of it being simultanious booking, a complication that happens very often in real life situations. During Phase 4 of the development process saw that we were doing self review checks during the transcript of the feature implementation and directly asked me if I wanted to fix issues such as implenting a feedback screen to the users when the server is completely down.

## Browser tool vs. CLI comparison

Browser tool AI development is significantly slower than utilizing a built in CLI comparison like Claude Code on VSCode, the reason for this is cause Claude code can directly see all the files in my directory and make the best decisions to go foward with the code, while the Claude web has no idea what I am using or what I have so it is starting from scratch and would need to ask a multitude of questions and also require a long transcript of our conversation to be even able to understand the scope of the project.
