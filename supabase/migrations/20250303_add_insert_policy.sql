-- Add policy to allow inserting new users
DROP POLICY IF EXISTS "Allow insert for users" ON public.users;
CREATE POLICY "Allow insert for users" ON public.users
    FOR INSERT WITH CHECK (true);
