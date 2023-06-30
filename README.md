# notes.lagerfors.se

Frontend is hosted on Netlify, Backend is hosted on Render.com, MongoDB for persistence is provided by MongoDB Cloud.
E2E tests are ran by Playwright, Unit tests by Vitest

# Running the app
## MongoDB
Make sure you set up a MongoDB server somewhere, it will be needed for this applciation
## Backend

1. Create an .env file in the `todo-server` containing the variable `MONGODB_URL=YOUR MONGO DB SERVER`
2. `cd todo-server && npm install`
3. `npm run start`

## Frontend
1. Create an .env file in the `todo-frontend` containing the variable `VITE_WS_URL=YOUR BACKEND SERVER WEBSOCKET ADDRESS`
2. `cd todo-frontend && npm install`
3. `npm run dev`

## Using the app

Voila! The app should now work. Use it as you wish.

## Running tests
### Unit tests
The unit tests are run with Vitest and can be executed with `npm run test` in the todo-frontend directory

### E2E tests
The E2E tests are run with Playwright and can be executed with `npm run test:e2e` in the todo-frontend directory


# Done

- [x] ⚠️ (required): I as a user can create to-do items, such as a grocery list
- [x] ⚠️ (required): I as another user can collaborate in real-time with user - so that we can (for example) edit our family shopping-list together
- [x] I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending
- [x] I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress
- [x] I as a user can add sub-tasks to my to-do items - so that I could make logical groups of tasks and see their overall progress
- [x] I as a user can specify cost/price for a task or a subtask - so that I can track my expenses / project cost
- [x] I as a user can see the sum of the subtasks aggregated in the parent task - so that in my shopping list I can see what contributes to the overall sum. For example I can have a task “Salad”, where I'd add all ingredients as sub-tasks, and would see how much does salad cost on my shopping list
- [x] I as a user can make infinite nested levels of subtasks
- [x] I as a user can add sub-descriptions of tasks in Markdown and view them as rich text while I'm not editing the descriptions
- [x] I as a user can keep editing the list even when I lose internet connection, and can expect it to sync up with BE as I regain connection
- [x] I as a user can change the order of tasks via drag & drop
- [x] I as a user can be sure that my todos will be persisted so that important information is not lost when server restarts
- [x] I as an owner/creator of a certain to-do list can freeze/unfreeze a to-do list I've created to avoid other users from mutating it (Adapted so that anyone can freeze any list)

# Added

- [x] Connection indicator, indicating if you are connected, offline, or pending connection.
- [x] Usernames, so that you can see who has edited what latest.

# Skipped

- [x] I as a user can see the cursor and/or selection of another-user as he selects/types when he is editing text - so that we can discuss focused words during our online call.
- [x] I as a user can create multiple to-do lists where each list has it's unique URL that I can share with my friends - so that I could have separate to do lists for my groceries and work related tasks
- [x] In addition to regular to-do tasks, I as a user can add “special” typed to-do items, that will have custom style and some required fields:

  - [x] ”work-task”, which has a required field “deadline” - which is a date
  - [x] “food” that has fields:
    - [x] required: “carbohydrate”, “fat”, “protein” (each specified in g/100g)
    - [x] optional: “picture” an URL to an image used to render this item

- [x] I as a user can use my VR goggles to edit/browse multiple to-do lists in parallel in 3D space so that I can feel ultra-productive

- [x] I as a user can move/convert subtasks to tasks via drag & drop
