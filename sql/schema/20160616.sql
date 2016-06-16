CREATE TABLE ad (
   id             SERIAL PRIMARY KEY,
   content        VARCHAR(100),
   link           VARCHAR(1000),
   keywords       VARCHAR(100),
   budget         VARCHAR(100),
   starttime      TIMESTAMP,
   endtime        TIMESTAMP,
   token          VARCHAR(100)
);
