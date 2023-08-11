--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    secret_number integer NOT NULL,
    number_of_guesses integer
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(50) NOT NULL,
    best_game integer
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (53, 30, 778, 779);
INSERT INTO public.games VALUES (54, 30, 692, 693);
INSERT INTO public.games VALUES (55, 31, 417, 418);
INSERT INTO public.games VALUES (56, 31, 118, 119);
INSERT INTO public.games VALUES (57, 30, 56, 59);
INSERT INTO public.games VALUES (58, 30, 795, 797);
INSERT INTO public.games VALUES (59, 30, 856, 857);
INSERT INTO public.games VALUES (60, 32, 478, 479);
INSERT INTO public.games VALUES (61, 32, 236, 237);
INSERT INTO public.games VALUES (62, 33, 177, 178);
INSERT INTO public.games VALUES (63, 33, 928, 929);
INSERT INTO public.games VALUES (64, 32, 248, 251);
INSERT INTO public.games VALUES (65, 32, 680, 682);
INSERT INTO public.games VALUES (66, 32, 53, 54);
INSERT INTO public.games VALUES (67, 34, 567, 568);
INSERT INTO public.games VALUES (68, 34, 798, 799);
INSERT INTO public.games VALUES (69, 35, 229, 230);
INSERT INTO public.games VALUES (70, 35, 220, 221);
INSERT INTO public.games VALUES (71, 34, 965, 968);
INSERT INTO public.games VALUES (72, 34, 699, 701);
INSERT INTO public.games VALUES (73, 34, 46, 47);
INSERT INTO public.games VALUES (74, 36, 500, 501);
INSERT INTO public.games VALUES (75, 36, 255, 256);
INSERT INTO public.games VALUES (76, 37, 27, 28);
INSERT INTO public.games VALUES (77, 37, 889, 890);
INSERT INTO public.games VALUES (78, 36, 8, 11);
INSERT INTO public.games VALUES (79, 36, 469, 471);
INSERT INTO public.games VALUES (80, 36, 510, 511);
INSERT INTO public.games VALUES (81, 38, 457, 458);
INSERT INTO public.games VALUES (82, 38, 976, 977);
INSERT INTO public.games VALUES (83, 39, 374, 375);
INSERT INTO public.games VALUES (84, 39, 926, 927);
INSERT INTO public.games VALUES (85, 38, 759, 762);
INSERT INTO public.games VALUES (86, 38, 622, 624);
INSERT INTO public.games VALUES (87, 38, 435, 436);
INSERT INTO public.games VALUES (88, 40, 204, 205);
INSERT INTO public.games VALUES (89, 40, 670, 671);
INSERT INTO public.games VALUES (90, 41, 696, 697);
INSERT INTO public.games VALUES (91, 41, 668, 669);
INSERT INTO public.games VALUES (92, 40, 166, 169);
INSERT INTO public.games VALUES (93, 40, 97, 99);
INSERT INTO public.games VALUES (94, 40, 261, 262);
INSERT INTO public.games VALUES (95, 42, 129, 130);
INSERT INTO public.games VALUES (96, 42, 336, 337);
INSERT INTO public.games VALUES (97, 43, 697, 698);
INSERT INTO public.games VALUES (98, 43, 741, 742);
INSERT INTO public.games VALUES (99, 42, 928, 931);
INSERT INTO public.games VALUES (100, 42, 563, 565);
INSERT INTO public.games VALUES (101, 42, 656, 657);
INSERT INTO public.games VALUES (102, 44, 599, 4);
INSERT INTO public.games VALUES (103, 44, 250, 5);
INSERT INTO public.games VALUES (104, 45, 119, 120);
INSERT INTO public.games VALUES (105, 45, 826, 827);
INSERT INTO public.games VALUES (106, 46, 957, 958);
INSERT INTO public.games VALUES (107, 46, 257, 258);
INSERT INTO public.games VALUES (108, 45, 752, 755);
INSERT INTO public.games VALUES (109, 45, 545, 547);
INSERT INTO public.games VALUES (110, 45, 224, 225);
INSERT INTO public.games VALUES (137, 78, 248, 249);
INSERT INTO public.games VALUES (138, 78, 407, 408);
INSERT INTO public.games VALUES (139, 79, 630, 631);
INSERT INTO public.games VALUES (140, 79, 634, 635);
INSERT INTO public.games VALUES (141, 78, 484, 487);
INSERT INTO public.games VALUES (142, 78, 780, 782);
INSERT INTO public.games VALUES (143, 78, 41, 42);
INSERT INTO public.games VALUES (144, 80, 452, 453);
INSERT INTO public.games VALUES (145, 80, 289, 290);
INSERT INTO public.games VALUES (146, 81, 581, 582);
INSERT INTO public.games VALUES (147, 81, 525, 526);
INSERT INTO public.games VALUES (148, 80, 40, 43);
INSERT INTO public.games VALUES (149, 80, 255, 257);
INSERT INTO public.games VALUES (150, 80, 279, 280);
INSERT INTO public.games VALUES (151, 82, 987, 988);
INSERT INTO public.games VALUES (152, 82, 168, 169);
INSERT INTO public.games VALUES (153, 83, 145, 146);
INSERT INTO public.games VALUES (154, 83, 786, 787);
INSERT INTO public.games VALUES (155, 82, 192, 195);
INSERT INTO public.games VALUES (156, 82, 557, 559);
INSERT INTO public.games VALUES (157, 82, 886, 887);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (31, 'user_1691752097536', 119);
INSERT INTO public.users VALUES (30, 'user_1691752097537', 59);
INSERT INTO public.users VALUES (79, 'user_1691785915395', 631);
INSERT INTO public.users VALUES (33, 'user_1691752140093', 178);
INSERT INTO public.users VALUES (78, 'user_1691785915396', 42);
INSERT INTO public.users VALUES (32, 'user_1691752140094', 54);
INSERT INTO public.users VALUES (35, 'user_1691752157156', 221);
INSERT INTO public.users VALUES (81, 'user_1691786110730', 526);
INSERT INTO public.users VALUES (34, 'user_1691752157157', 47);
INSERT INTO public.users VALUES (80, 'user_1691786110731', 43);
INSERT INTO public.users VALUES (37, 'user_1691752173171', 28);
INSERT INTO public.users VALUES (36, 'user_1691752173172', 11);
INSERT INTO public.users VALUES (39, 'user_1691752183822', 375);
INSERT INTO public.users VALUES (83, 'user_1691786131305', 146);
INSERT INTO public.users VALUES (38, 'user_1691752183823', 436);
INSERT INTO public.users VALUES (82, 'user_1691786131306', 169);
INSERT INTO public.users VALUES (41, 'user_1691752205580', 669);
INSERT INTO public.users VALUES (40, 'user_1691752205581', 99);
INSERT INTO public.users VALUES (43, 'user_1691752222047', 698);
INSERT INTO public.users VALUES (42, 'user_1691752222048', 130);
INSERT INTO public.users VALUES (44, 'Paulo', 4);
INSERT INTO public.users VALUES (46, 'user_1691752336009', 258);
INSERT INTO public.users VALUES (45, 'user_1691752336010', 120);


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 157, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 83, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

