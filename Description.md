# Build a Finance SaaS Platform With Nextjs, React, Honojs with CSV Upload (2024)

13:14 / 11:13:27

• Authentication

Code With Antonio

YT Video : <https://www.youtube.com/watch?v=N_uNKAus0II&t=74s>
Medium Kwok Article on Confirm Dialog: <https://medium.com/@kch062522/useconfirm-a-custom-react-hook-to-prompt-confirmation-before-action-f4cb746ebd4e>

NOTE - NOTE - NOTE-------------------------------:
NEED to use these specific versions:

- drizzle-zod@^0.5
- drizzle-orm@0.30.10
- drizzle-kit@0.20.17

NOTE - NOTE - NOTE-------------------------------:

141,095 views  May 10, 2024
⭐️ Source Code & Additional Content: <https://www.codewithantonio.com/proje>...
💬 Discord & Help: <https://www.codewithantonio.com/discord>

Clerk: <https://go.clerk.com/eoX6HkY>
Hono: <https://hono.dev/>
Drizzle ORM: <https://orm.drizzle.team/>
Neon DB: <https://neon.tech/>
Logoipsum: <https://logoipsum.com/>

In this 11 hour tutorial, you will learn how to create your very own Finance SaaS Platform with ability to track your income and expenses, categorize transactions and assign them to specific accounts, as well as how to import transactions using a CSV file, connect to your bank account using Plaid, and monetize this product using Lemon Squeezy.

Key Features:

- 📊 Interactive financial dashboard
- 🔁 Changeable chart types
- 🗓 Account and date filters
- 💹 Detailed transactions table
- ➕ Form to add transactions
- 🧩 Customizable select components
- 💵 Income and expense toggle
- 🔄 CSV transaction imports
- 🔥 API via Hono.js
- 🪝 State management via Tanstack React Query
- 🔗 Bank account connections with Plaid
- 💳 Premium upgrades via Lemon Squeezy
- 🔐 Authentication via Clerk (Core 2)
- 🗑 Bulk delete and search in transactions
- ⚙️ Bank disconnection and subscription management
- 👤 User settings customization
- 🌐 Built with Next.js 14
- 🎨 Styled with TailwindCSS and Shadcn UI
- 💾 PostgreSQL & Drizzle ORM
- 🚀 Deployed on Vercel

Timestamps
00:00 Intro & Demo
04:53 Additional information
05:02 Project setup
13:01 Authentication
42:18 Hono.js setup
01:10:49 Header component
01:46:27 Drizzle ORM & Neon Database
02:10:50 Accounts GET API
02:43:26 Accounts POST API
03:29:03 Data table component
04:00:41 Accounts bulk delete
04:27:12 Accounts edit
05:03:44 Categories (API + UI)
05:32:13 Transactions API
06:10:36 Transactions hooks
06:22:49 Transactions form
07:14:44 Transactions page
07:54:10 Transactions CSV import
08:43:09 Transactions account select
08:56:40 Summary API
09:28:52 Dashboard cards
09:58:36 Dashboard chart
10:26:04 Dashboard pie
10:45:05 Date & account filters
11:07:08 Deployment
11:12:59 Additional content

## How to build API route in next.js:

create a api/test folder inside the app directory:

app/api/test/route.ts

  export const GET = () => { return NextResponse.json({ "this is a GET method" }) }

to send parameter with the request you would create another sub-directory: 

app/api/test/[testId]/route.ts

  export const GET = (
    request: NextResponse,
    { params } : { params: {testId: string}
    }) => {
      return NextResponse.json({
        hello: "this is a response message to the id: " + params.testId
      });
    }
