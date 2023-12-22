-- create extension if not exists "uuid-ossp";
create table
    carts (
        id uuid primary key,
        user_id uuid not null,
        created_at date not null default now(),
        updated_at date not null default now(),
        status enumType
    );

create table
    cart_items (
        cart_id uuid,
        product_id uuid default uuid_generate_v4(),
        count integer,
        foreign key ("cart_id") references "carts" ("id")
    );

insert into
    carts (id, user_id, status)
values (
        '13a027f3-dc89-4c6d-a8ff-53946d5d3a5e',
        'de795a7b-4644-4a24-be04-ebe697662776',
        'OPEN'
    ), (
        '29ba8674-6e47-4800-a282-e000c7f00def',
        '5dc569ae-323d-4cbf-b692-51c6fd5313e3',
        'OPEN'
    ), (
        'b7b9b151-54e5-4681-be1a-599b78acf0d4',
        '99cbbbb9-b426-4bf5-bdd7-7b604871edc3',
        'ORDERED'
    );

insert into
    cart_items (cart_id, count)
values (
        '13a027f3-dc89-4c6d-a8ff-53946d5d3a5e',
        5
    ), (
        '13a027f3-dc89-4c6d-a8ff-53946d5d3a5e',
        10
    ), (
        '29ba8674-6e47-4800-a282-e000c7f00def',
        1
    ), (
        'b7b9b151-54e5-4681-be1a-599b78acf0d4',
        20
    )
