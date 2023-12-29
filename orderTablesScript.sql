create table
    orders (
        id uuid primary key default uuid_generate_v4(),
        user_id uuid,
        cart_id uuid,
        payment json,
        delivery json,
        comments text,
        status text,
        total integer,
        foreign key ("cart_id") references "carts" ("id") on delete cascade
    );
