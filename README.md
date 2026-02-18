## Problems Faced & Solutions

- First time using **Supabase CLI**
  - Confusion between dashboard tables and migration workflow
  - Learned how to link project and manage schema properly using CLI instead of manual table edits

- WebSocket connection breaking
  - Multiple Supabase client instances were created
  - React Strict Mode mounted/unmounted components causing connection to close
  - Solved by creating a single stable browser client instance

- Realtime authentication problem
  - Realtime channel was connecting without user session
  - Fixed using:
    ```ts
    supabase.realtime.setAuth(session.access_token)
    ```

- Realtime DELETE not working
  - INSERT events worked but DELETE never triggered
  - PostgreSQL sends only primary key on delete by default
  - Filter required `user_id` so event never matched
  - Fixed by enabling full old row data:
    ```sql
    ALTER TABLE public.bookmarks REPLICA IDENTITY FULL;
    ```

- Deployment configuration
  - Needed correct Supabase Site URL and redirect allowlist
  - Needed Google OAuth callback URL
  - Needed Vercel environment variables

---

### What I Learned
- How database realtime events work internally
- How authentication tokens affect websocket subscriptions
- Importance of Postgres replica identity for realtime systems
- Debugging realtime systems using logs instead of guessing
