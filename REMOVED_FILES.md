# Removed Files and Dependencies

As part of the Headless CRM conversion, the following files, directories, and dependencies were safely removed because they belonged to the local admin dashboard and are not used by the public website.

## Directories Deleted
- `src/app/admin/` - The entire local admin dashboard.
- `src/app/api/admin/` - Local API routes for admin functions.
- `src/app/api/auth/` - NextAuth configuration for admin login.
- `prisma/` - The database schema configuration and migrations.

## Files Deleted
- `download-videos.cjs` - Unused root utility script.
- `replace-lucide.mjs` - Unused root utility script.

## Packages Uninstalled
- `@auth/prisma-adapter`
- `@prisma/adapter-pg`
- `@prisma/client`
- `prisma`
- `next-auth`
- `@types/bcrypt`
- `bcrypt`
- `pg`
- `@types/pg`
- `cloudinary`
- `next-cloudinary`
- `@tiptap/pm`
- `@tiptap/react`
- `@tiptap/starter-kit`

*Note: All removals were verified to ensure the public website UI/UX remains completely unaffected.*
