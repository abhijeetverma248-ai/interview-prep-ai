-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (user info and usage tracking)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  usage_count integer default 0,
  is_premium boolean default false,
  premium_until timestamp with time zone
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies for profiles
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Conversations table
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  type text check (type in ('resume', 'interview', 'general')) default 'general',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table conversations enable row level security;

-- Policies for conversations
create policy "Users can view own conversations"
  on conversations for select
  using (auth.uid() = user_id);

create policy "Users can create own conversations"
  on conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own conversations"
  on conversations for delete
  using (auth.uid() = user_id);

-- Messages table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table messages enable row level security;

-- Policies for messages
create policy "Users can view messages in their conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

create policy "Users can create messages in their conversations"
  on messages for insert
  with check (
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

-- Function to increment usage count
create or replace function increment_usage(user_id uuid)
returns void as $$
begin
  update profiles
  set usage_count = usage_count + 1
  where id = user_id;
end;
$$ language plpgsql security definer;

-- Function to check if user is premium
create or replace function is_user_premium(user_id uuid)
returns boolean as $$
declare
  premium_status boolean;
  premium_expiry timestamp with time zone;
begin
  select is_premium, premium_until
  into premium_status, premium_expiry
  from profiles
  where id = user_id;
  
  if premium_status and (premium_expiry is null or premium_expiry > now()) then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql security definer;

-- Indexes for better performance
create index conversations_user_id_idx on conversations(user_id);
create index messages_conversation_id_idx on messages(conversation_id);
create index messages_created_at_idx on messages(created_at desc);

-- Sample data (optional, for testing)
-- This will be automatically cleaned up when you start using real auth
insert into profiles (id, email, usage_count, is_premium)
values 
  ('00000000-0000-0000-0000-000000000001', 'demo@example.com', 0, false);
