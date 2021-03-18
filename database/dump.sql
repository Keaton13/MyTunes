--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public."tokenData" DROP CONSTRAINT IF EXISTS "tokenData_user_id_key";
ALTER TABLE IF EXISTS public.users ALTER COLUMN user_id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_user_id_seq;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public."tokenData";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tokenData; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tokenData" (
    user_id integer NOT NULL,
    spotify_token character varying(400),
    soundcloud_token character varying(400)
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(250) NOT NULL,
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    last_login timestamp without time zone
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: tokenData; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."tokenData" (user_id, spotify_token, soundcloud_token) FROM stdin;
10	BQDwkE37EMg6-P1YIPlUk9fCP7O3KSPOubDRdJJwEdmjtKHmCSISvhyaHpMuThEraeOitSQJA_ENLEkf0c_TdoDfbSibM1OjHUfHBlw16UBJM3L0KrsasJ2yTpRJxBSqq3A18RtpbITc-ztcBKY2aDVI5VUrRGzzUkkAtunRpyVc-r-uN3l7flYJ&token_type=Bearer&expires_in=3600	\N
4	BQDhI5nRrccOV91JXfjvgTZmE-NUuD8SdMoFcP9uWuBNgY8aXqTtP2ou0rLKZKlpzMQ-RBpgIrL3Y95ILurX0oLIc7vq6ZKKfZSN_4B20WpJ9hyflDUV7_jTPqjDzl0dopA_edGx-HIPj0i8Ke623f1Vi2Z8BJAhgVjrhbqsxHsqbDIf7YyE58b0&token_type=Bearer&expires_in=3600	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, username, password, created_on, last_login) FROM stdin;
1	Test1	2asdf232425464sd1f3ws23r133	2021-03-03 16:09:54.833368	\N
2	Test2	$2b$10$n6L.Ue6J3mkaSN8Ts.Rl7uPQc/Ze574lTXSGoKHLhlAlPdqnAAtw2	2021-03-03 16:10:25.371031	\N
3	test3	$2b$10$Sui93LYCVGfDi719/EoBfeLc/QFAVrjQnu8CXzKj3t7YF.iKc0yTy	2021-03-03 16:13:30.620948	\N
4	test5	$2b$10$DeoR4zB/aIz9SkmVPIMUQe9iiIOTfGEIdutWdjFjX0Rz/e9pOczJu	2021-03-03 16:48:06.912752	\N
5	Modzzz	$2b$10$dhfzQXMxL1GAKkJdtmRh6.ldWp.rCBjsQ2N9PtL.eiKi0iZ1Is236	2021-03-17 11:04:29.952401	\N
6	Modzzz1	$2b$10$FRik/CvpEm2A9gHZMRiT5.naCj8uZ.0f3vsuocAuH/4iMw78cwW2y	2021-03-17 11:05:04.385324	\N
7	FBIAgent #1	$2b$10$1FwyX9BI8RiFE6PlPxGNlOeJnz3r4rHeraDNFWrWZ0W3f6Jk10Wda	2021-03-17 11:05:23.035221	\N
8	Even	$2b$10$wHPVRV5rc9C3r4p/DWULZu6IYt3EO2plzYWVQneqtCdXRQVGDniPq	2021-03-17 11:05:58.326591	\N
9	test10	$2b$10$IyLkd9w59hd7oqJ5nvMzgOg6rPkp/NcW6kM3kEua3QspWXWn4NyWa	2021-03-17 11:06:40.459877	\N
10	test11	$2b$10$oqeyaIrKa5Om.iTH4l/DsOznmNx9ooFtUW1uOwafajq17DCdGHNPO	2021-03-17 11:17:31.33163	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- Name: tokenData tokenData_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tokenData"
    ADD CONSTRAINT "tokenData_user_id_key" UNIQUE (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

