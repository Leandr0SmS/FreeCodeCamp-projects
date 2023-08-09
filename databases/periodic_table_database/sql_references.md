INITCAP(): this function transforms each word's first character/alphabet in a string to uppercase and the rest of the characters to lowercase.:

`SELECT INITCAP(col_name) FROM table_name;`

`UPDATE customers SET name = UPPER(name) WHERE name IS NOT NULL;`

`UPDATE elements SET symbol = INITCAP(symbol);`

You have defined the column as NUMERIC(9,6). From here Numeric types that is NUMERIC(precision, scale), where scale is :

The scale of a numeric is the count of decimal digits in the fractional part, to the right of the decimal point
`ALTER TABLE properties ALTER COLUMN atomic_mass TYPE DECIMAL;`
`UPDATE properties SET atomic_mass = TRIM(TRAILING '0' FROM CAST(atomic_mass AS TEXT))::NUMERIC;`

