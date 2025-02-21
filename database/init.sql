--Every command here will be executed when the container is created

CREATE TABLE CATEGORIES (
    CODE INTEGER PRIMARY KEY,
    NAME VARCHAR(255),
    TAX NUMERIC(10,2)
);

CREATE TABLE PRODUCTS (
    CODE INTEGER PRIMARY KEY,
    NAME VARCHAR(255),
    PRICE NUMERIC(10,2),
    CATEGORY_CODE INTEGER,
    AMOUNT INTEGER,
    CONSTRAINT FK_CATEGORY FOREIGN KEY (CATEGORY_CODE) REFERENCES CATEGORIES(CODE)
);

CREATE TABLE USERS (
    CODE SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    pass VARCHAR(500) NOT NULL
);

CREATE TABLE ORDERS (
    CODE INTEGER PRIMARY KEY,
    TOTAL NUMERIC(10,2),
    TAX NUMERIC(10,2),
    USER_CODE INTEGER,
    CONSTRAINT FK_USER FOREIGN KEY (USER_CODE) REFERENCES USERS(CODE)
);

CREATE TABLE ORDER_ITEM(
    CODE INTEGER PRIMARY KEY,
    ORDER_CODE INTEGER,
    PRODUCT_CODE INTEGER,
    AMOUNT INTEGER,
    PRICE NUMERIC(10,2),
    TAX NUMERIC(10,2),
    CONSTRAINT FK_PRODUCT FOREIGN KEY (PRODUCT_CODE) REFERENCES PRODUCTS(CODE),
    CONSTRAINT FK_ORDER FOREIGN KEY (ORDER_CODE) REFERENCES ORDERS(CODE)
);