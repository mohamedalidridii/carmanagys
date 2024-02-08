                                                Table "public.users"
          Column           |            Type             | Collation | Nullable |              Default              
---------------------------+-----------------------------+-----------+----------+-----------------------------------
 id                        | integer                     |           | not null | nextval('users_id_seq'::regclass)
 role                      | character varying(10)       |           | not null | 
 nom                       | character varying(255)      |           | not null | 
 prenom                    | character varying(255)      |           | not null | 
 tel                       | character varying(15)       |           | not null | 
 points                    | integer                     |           |          | 
 matricule                 | character varying(20)       |           | not null | 
 marque                    | character varying(50)       |           | not null | 
 type                      | character varying(50)       |           | not null | 
 carburant                 | character varying(20)       |           | not null | 
 kilometrage               | character varying(20)       |           | not null | 
 email                     | character varying(255)      |           | not null | 
 salt                      | character varying(255)      |           |          | 
 hash                      | character varying(255)      |           |          | 
 _verified                 | boolean                     |           |          | 
 _verificationtoken        | character varying(255)      |           |          | 
 password                  | character varying(255)      |           |          | 
 updated_at                | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 created_at                | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 reset_password_token      | character varying(255)      |           |          | 
 reset_password_expiration | character varying(255)      |           |          | 
 login_attempts            | integer                     |           |          | 
 lock_until                | timestamp without time zone |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Check constraints:
    "users_role_check" CHECK (role::text = ANY (ARRAY['topadmin'::character varying, 'admin'::character varying, 'agent'::character varying, 'client'::character varying]::text[]))

