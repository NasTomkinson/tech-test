<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Stack
NextJS, TailwindCSS, TypeScript, Jest

# Context
This is a web dashboard application for a bank called Eagle Bank consisting of the following areas:
- Authentication flows
- Dashboard
- Accounts Management
- Transactions
- User profiles

The application should be made up of reusable components and composites with styling dictated by the tailwind config. 

# Documentation links
- TailwindCSS (https://tailwindcss.com/docs/)

# Architecutre 
- We should be following the latest NextJS documentation for guidence on how this project should be structured. 
- All routes should within the /api folder as per the documentation 
- We should have the user information from the server, we can use this information on the front-end to fetch data required for other aspects of the application.