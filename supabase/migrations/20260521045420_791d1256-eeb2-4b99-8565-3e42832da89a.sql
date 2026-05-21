-- Hide profiles from anon GraphQL/REST discovery (RLS already restricts data)
REVOKE SELECT ON public.profiles FROM anon;

-- Lock down SECURITY DEFINER trigger functions — only the DB/triggers should call them
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;