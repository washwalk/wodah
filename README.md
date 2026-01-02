# The Identity: A "Smoke Test" Factory

Wodah is a multi-tenant landing page framework built on the Astro framework, integrated with Supabase for data, and hosted on Vercel.

Its primary purpose is to solve the "Founder's Trap": spending months building a product that no one wants. Instead, Wodah allows you to launch 5–10 different product ideas (niches) in minutes to see which one people actually sign up for.

## How the Architecture Works

The project uses a Data-Driven Design pattern. You don't build five websites; you build one engine that reads from a "Niche Configuration."

- **The Config (The Brain)**: A JSON file or Supabase table where you list your 5 niche ideas, their headlines, and their unique benefits.

- **The Engine (Astro)**: A set of reusable UI components (Hero, CTA, Features) that dynamically change their look and text based on which URL is visited.

- **The Vault (Supabase)**: A centralized database that captures leads (emails) and tags them by the niche they came from.
