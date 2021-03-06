PGDMP             
            z            users    14.1    14.1     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    users    DATABASE     j   CREATE DATABASE users WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE users;
                postgres    false            ?            1259    16424    isreadtable    TABLE     `   CREATE TABLE public.isreadtable (
    isread boolean,
    userid integer,
    postid integer
);
    DROP TABLE public.isreadtable;
       public         heap    postgres    false            ?            1259    16412    posts    TABLE     ?   CREATE TABLE public.posts (
    userid integer NOT NULL,
    postid integer NOT NULL,
    content text NOT NULL,
    title text NOT NULL,
    img text,
    date bigint
);
    DROP TABLE public.posts;
       public         heap    postgres    false            ?            1259    16411    posts_postid_seq    SEQUENCE     ?   ALTER TABLE public.posts ALTER COLUMN postid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_postid_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            ?            1259    16396 
   userstable    TABLE     ?   CREATE TABLE public.userstable (
    userid integer NOT NULL,
    passhash text,
    shortdesc text,
    username text NOT NULL
);
    DROP TABLE public.userstable;
       public         heap    postgres    false            ?            1259    16395    userstable_userid_seq    SEQUENCE     ?   ALTER TABLE public.userstable ALTER COLUMN userid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.userstable_userid_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            ?          0    16424    isreadtable 
   TABLE DATA           =   COPY public.isreadtable (isread, userid, postid) FROM stdin;
    public          postgres    false    213   y       ?          0    16412    posts 
   TABLE DATA           J   COPY public.posts (userid, postid, content, title, img, date) FROM stdin;
    public          postgres    false    212   ?       ?          0    16396 
   userstable 
   TABLE DATA           K   COPY public.userstable (userid, passhash, shortdesc, username) FROM stdin;
    public          postgres    false    210   ?                  0    0    posts_postid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.posts_postid_seq', 2, true);
          public          postgres    false    211                       0    0    userstable_userid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.userstable_userid_seq', 0, true);
          public          postgres    false    209            h           2606    16418    posts posts_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (postid);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    212            f           2606    16402    userstable userstable_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.userstable
    ADD CONSTRAINT userstable_pkey PRIMARY KEY (userid);
 D   ALTER TABLE ONLY public.userstable DROP CONSTRAINT userstable_pkey;
       public            postgres    false    210            k           2606    16432    isreadtable postid    FK CONSTRAINT     ?   ALTER TABLE ONLY public.isreadtable
    ADD CONSTRAINT postid FOREIGN KEY (postid) REFERENCES public.posts(postid) ON UPDATE CASCADE ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.isreadtable DROP CONSTRAINT postid;
       public          postgres    false    212    3176    213            j           2606    16427    isreadtable userid    FK CONSTRAINT     ?   ALTER TABLE ONLY public.isreadtable
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.userstable(userid) ON UPDATE CASCADE ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.isreadtable DROP CONSTRAINT userid;
       public          postgres    false    210    3174    213            i           2606    16437    posts userid    FK CONSTRAINT     ?   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.userstable(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 6   ALTER TABLE ONLY public.posts DROP CONSTRAINT userid;
       public          postgres    false    210    3174    212            ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?     