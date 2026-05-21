-- Replace overly broad avatar SELECT policy with a per-object read
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

CREATE POLICY "Anyone can read individual avatar files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] IS NOT NULL
);

-- Restrict profiles visibility to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);