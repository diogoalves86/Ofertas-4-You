import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categorias_tipo" AS ENUM('produtos', 'avaliacoes', 'ambos');
  CREATE TYPE "public"."enum_lojas_tipo" AS ENUM('marketplace', 'produto_digital', 'outro');
  CREATE TYPE "public"."enum_produtos_tipo_produto" AS ENUM('fisico', 'digital', 'servico');
  CREATE TYPE "public"."enum_produtos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__produtos_v_version_tipo_produto" AS ENUM('fisico', 'digital', 'servico');
  CREATE TYPE "public"."enum__produtos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_avaliacoes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__avaliacoes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_paginas_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__paginas_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "usuarios_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "usuarios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "midias" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categorias" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descricao" varchar,
  	"tipo" "enum_categorias_tipo" DEFAULT 'ambos' NOT NULL,
  	"imagem_id" integer,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lojas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tipo" "enum_lojas_tipo" DEFAULT 'marketplace' NOT NULL,
  	"url_base" varchar,
  	"logo_id" integer,
  	"descricao" varchar,
  	"ativa" boolean DEFAULT true,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "produtos_vantagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "produtos_desvantagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "produtos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"resumo" varchar,
  	"descricao" jsonb,
  	"categoria_id" integer,
  	"loja_id" integer,
  	"link_afiliado" varchar,
  	"preco" varchar,
  	"preco_promocional" varchar,
  	"tipo_produto" "enum_produtos_tipo_produto" DEFAULT 'fisico',
  	"imagem_id" integer,
  	"selo" varchar,
  	"nota" numeric,
  	"destaque" boolean DEFAULT false,
  	"aviso_afiliado" boolean DEFAULT true,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_produtos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "produtos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"midias_id" integer
  );
  
  CREATE TABLE "_produtos_v_version_vantagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_produtos_v_version_desvantagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_produtos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_resumo" varchar,
  	"version_descricao" jsonb,
  	"version_categoria_id" integer,
  	"version_loja_id" integer,
  	"version_link_afiliado" varchar,
  	"version_preco" varchar,
  	"version_preco_promocional" varchar,
  	"version_tipo_produto" "enum__produtos_v_version_tipo_produto" DEFAULT 'fisico',
  	"version_imagem_id" integer,
  	"version_selo" varchar,
  	"version_nota" numeric,
  	"version_destaque" boolean DEFAULT false,
  	"version_aviso_afiliado" boolean DEFAULT true,
  	"version_seo_titulo" varchar,
  	"version_seo_descricao" varchar,
  	"version_seo_imagem_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__produtos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_produtos_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"midias_id" integer
  );
  
  CREATE TABLE "avaliacoes_perguntas_frequentes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar
  );
  
  CREATE TABLE "avaliacoes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"resumo" varchar,
  	"conteudo" jsonb,
  	"categoria_id" integer,
  	"imagem_id" integer,
  	"autor" varchar DEFAULT 'Equipe Ofertas 4You',
  	"tempo_leitura" numeric,
  	"publicado_em" timestamp(3) with time zone,
  	"destaque" boolean DEFAULT false,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_avaliacoes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "avaliacoes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"produtos_id" integer
  );
  
  CREATE TABLE "_avaliacoes_v_version_perguntas_frequentes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_avaliacoes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_resumo" varchar,
  	"version_conteudo" jsonb,
  	"version_categoria_id" integer,
  	"version_imagem_id" integer,
  	"version_autor" varchar DEFAULT 'Equipe Ofertas 4You',
  	"version_tempo_leitura" numeric,
  	"version_publicado_em" timestamp(3) with time zone,
  	"version_destaque" boolean DEFAULT false,
  	"version_seo_titulo" varchar,
  	"version_seo_descricao" varchar,
  	"version_seo_imagem_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__avaliacoes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_avaliacoes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"produtos_id" integer
  );
  
  CREATE TABLE "paginas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"resumo" varchar,
  	"conteudo" jsonb,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_paginas_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_paginas_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_resumo" varchar,
  	"version_conteudo" jsonb,
  	"version_seo_titulo" varchar,
  	"version_seo_descricao" varchar,
  	"version_seo_imagem_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__paginas_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"usuarios_id" integer,
  	"midias_id" integer,
  	"categorias_id" integer,
  	"lojas_id" integer,
  	"produtos_id" integer,
  	"avaliacoes_id" integer,
  	"paginas_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"usuarios_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "configuracoes_site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome_site" varchar DEFAULT 'Ofertas 4You' NOT NULL,
  	"url_site" varchar DEFAULT 'https://ofertas4you.com.br',
  	"descricao_padrao" varchar DEFAULT 'Ofertas, reviews e guias de compra com curadoria para encontrar boas oportunidades em lojas parceiras.',
  	"aviso_afiliado_padrao" varchar DEFAULT 'O Ofertas 4You pode receber comissao quando voce compra por links indicados. Isso nao altera o preco final para voce.',
  	"redes_sociais_instagram" varchar,
  	"redes_sociais_youtube" varchar,
  	"redes_sociais_tiktok" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "usuarios_sessions" ADD CONSTRAINT "usuarios_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorias" ADD CONSTRAINT "categorias_imagem_id_midias_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorias" ADD CONSTRAINT "categorias_seo_imagem_id_midias_id_fk" FOREIGN KEY ("seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lojas" ADD CONSTRAINT "lojas_logo_id_midias_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lojas" ADD CONSTRAINT "lojas_seo_imagem_id_midias_id_fk" FOREIGN KEY ("seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "produtos_vantagens" ADD CONSTRAINT "produtos_vantagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "produtos_desvantagens" ADD CONSTRAINT "produtos_desvantagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "produtos" ADD CONSTRAINT "produtos_loja_id_lojas_id_fk" FOREIGN KEY ("loja_id") REFERENCES "public"."lojas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "produtos" ADD CONSTRAINT "produtos_imagem_id_midias_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "produtos" ADD CONSTRAINT "produtos_seo_imagem_id_midias_id_fk" FOREIGN KEY ("seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "produtos_rels" ADD CONSTRAINT "produtos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "produtos_rels" ADD CONSTRAINT "produtos_rels_midias_fk" FOREIGN KEY ("midias_id") REFERENCES "public"."midias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_produtos_v_version_vantagens" ADD CONSTRAINT "_produtos_v_version_vantagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_produtos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_produtos_v_version_desvantagens" ADD CONSTRAINT "_produtos_v_version_desvantagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_produtos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_produtos_v" ADD CONSTRAINT "_produtos_v_parent_id_produtos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."produtos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_produtos_v" ADD CONSTRAINT "_produtos_v_version_categoria_id_categorias_id_fk" FOREIGN KEY ("version_categoria_id") REFERENCES "public"."categorias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_produtos_v" ADD CONSTRAINT "_produtos_v_version_loja_id_lojas_id_fk" FOREIGN KEY ("version_loja_id") REFERENCES "public"."lojas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_produtos_v" ADD CONSTRAINT "_produtos_v_version_imagem_id_midias_id_fk" FOREIGN KEY ("version_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_produtos_v" ADD CONSTRAINT "_produtos_v_version_seo_imagem_id_midias_id_fk" FOREIGN KEY ("version_seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_produtos_v_rels" ADD CONSTRAINT "_produtos_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_produtos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_produtos_v_rels" ADD CONSTRAINT "_produtos_v_rels_midias_fk" FOREIGN KEY ("midias_id") REFERENCES "public"."midias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "avaliacoes_perguntas_frequentes" ADD CONSTRAINT "avaliacoes_perguntas_frequentes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."avaliacoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_imagem_id_midias_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_seo_imagem_id_midias_id_fk" FOREIGN KEY ("seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "avaliacoes_rels" ADD CONSTRAINT "avaliacoes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."avaliacoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "avaliacoes_rels" ADD CONSTRAINT "avaliacoes_rels_produtos_fk" FOREIGN KEY ("produtos_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v_version_perguntas_frequentes" ADD CONSTRAINT "_avaliacoes_v_version_perguntas_frequentes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_avaliacoes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v" ADD CONSTRAINT "_avaliacoes_v_parent_id_avaliacoes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."avaliacoes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v" ADD CONSTRAINT "_avaliacoes_v_version_categoria_id_categorias_id_fk" FOREIGN KEY ("version_categoria_id") REFERENCES "public"."categorias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v" ADD CONSTRAINT "_avaliacoes_v_version_imagem_id_midias_id_fk" FOREIGN KEY ("version_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v" ADD CONSTRAINT "_avaliacoes_v_version_seo_imagem_id_midias_id_fk" FOREIGN KEY ("version_seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v_rels" ADD CONSTRAINT "_avaliacoes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_avaliacoes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_avaliacoes_v_rels" ADD CONSTRAINT "_avaliacoes_v_rels_produtos_fk" FOREIGN KEY ("produtos_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas" ADD CONSTRAINT "paginas_seo_imagem_id_midias_id_fk" FOREIGN KEY ("seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_paginas_v" ADD CONSTRAINT "_paginas_v_parent_id_paginas_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."paginas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_paginas_v" ADD CONSTRAINT "_paginas_v_version_seo_imagem_id_midias_id_fk" FOREIGN KEY ("version_seo_imagem_id") REFERENCES "public"."midias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_midias_fk" FOREIGN KEY ("midias_id") REFERENCES "public"."midias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categorias_fk" FOREIGN KEY ("categorias_id") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lojas_fk" FOREIGN KEY ("lojas_id") REFERENCES "public"."lojas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_produtos_fk" FOREIGN KEY ("produtos_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_avaliacoes_fk" FOREIGN KEY ("avaliacoes_id") REFERENCES "public"."avaliacoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paginas_fk" FOREIGN KEY ("paginas_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "usuarios_sessions_order_idx" ON "usuarios_sessions" USING btree ("_order");
  CREATE INDEX "usuarios_sessions_parent_id_idx" ON "usuarios_sessions" USING btree ("_parent_id");
  CREATE INDEX "usuarios_updated_at_idx" ON "usuarios" USING btree ("updated_at");
  CREATE INDEX "usuarios_created_at_idx" ON "usuarios" USING btree ("created_at");
  CREATE UNIQUE INDEX "usuarios_email_idx" ON "usuarios" USING btree ("email");
  CREATE INDEX "midias_updated_at_idx" ON "midias" USING btree ("updated_at");
  CREATE INDEX "midias_created_at_idx" ON "midias" USING btree ("created_at");
  CREATE UNIQUE INDEX "midias_filename_idx" ON "midias" USING btree ("filename");
  CREATE UNIQUE INDEX "categorias_slug_idx" ON "categorias" USING btree ("slug");
  CREATE INDEX "categorias_imagem_idx" ON "categorias" USING btree ("imagem_id");
  CREATE INDEX "categorias_seo_seo_imagem_idx" ON "categorias" USING btree ("seo_imagem_id");
  CREATE INDEX "categorias_updated_at_idx" ON "categorias" USING btree ("updated_at");
  CREATE INDEX "categorias_created_at_idx" ON "categorias" USING btree ("created_at");
  CREATE UNIQUE INDEX "lojas_slug_idx" ON "lojas" USING btree ("slug");
  CREATE INDEX "lojas_logo_idx" ON "lojas" USING btree ("logo_id");
  CREATE INDEX "lojas_seo_seo_imagem_idx" ON "lojas" USING btree ("seo_imagem_id");
  CREATE INDEX "lojas_updated_at_idx" ON "lojas" USING btree ("updated_at");
  CREATE INDEX "lojas_created_at_idx" ON "lojas" USING btree ("created_at");
  CREATE INDEX "produtos_vantagens_order_idx" ON "produtos_vantagens" USING btree ("_order");
  CREATE INDEX "produtos_vantagens_parent_id_idx" ON "produtos_vantagens" USING btree ("_parent_id");
  CREATE INDEX "produtos_desvantagens_order_idx" ON "produtos_desvantagens" USING btree ("_order");
  CREATE INDEX "produtos_desvantagens_parent_id_idx" ON "produtos_desvantagens" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "produtos_slug_idx" ON "produtos" USING btree ("slug");
  CREATE INDEX "produtos_categoria_idx" ON "produtos" USING btree ("categoria_id");
  CREATE INDEX "produtos_loja_idx" ON "produtos" USING btree ("loja_id");
  CREATE INDEX "produtos_imagem_idx" ON "produtos" USING btree ("imagem_id");
  CREATE INDEX "produtos_seo_seo_imagem_idx" ON "produtos" USING btree ("seo_imagem_id");
  CREATE INDEX "produtos_updated_at_idx" ON "produtos" USING btree ("updated_at");
  CREATE INDEX "produtos_created_at_idx" ON "produtos" USING btree ("created_at");
  CREATE INDEX "produtos__status_idx" ON "produtos" USING btree ("_status");
  CREATE INDEX "produtos_rels_order_idx" ON "produtos_rels" USING btree ("order");
  CREATE INDEX "produtos_rels_parent_idx" ON "produtos_rels" USING btree ("parent_id");
  CREATE INDEX "produtos_rels_path_idx" ON "produtos_rels" USING btree ("path");
  CREATE INDEX "produtos_rels_midias_id_idx" ON "produtos_rels" USING btree ("midias_id");
  CREATE INDEX "_produtos_v_version_vantagens_order_idx" ON "_produtos_v_version_vantagens" USING btree ("_order");
  CREATE INDEX "_produtos_v_version_vantagens_parent_id_idx" ON "_produtos_v_version_vantagens" USING btree ("_parent_id");
  CREATE INDEX "_produtos_v_version_desvantagens_order_idx" ON "_produtos_v_version_desvantagens" USING btree ("_order");
  CREATE INDEX "_produtos_v_version_desvantagens_parent_id_idx" ON "_produtos_v_version_desvantagens" USING btree ("_parent_id");
  CREATE INDEX "_produtos_v_parent_idx" ON "_produtos_v" USING btree ("parent_id");
  CREATE INDEX "_produtos_v_version_version_slug_idx" ON "_produtos_v" USING btree ("version_slug");
  CREATE INDEX "_produtos_v_version_version_categoria_idx" ON "_produtos_v" USING btree ("version_categoria_id");
  CREATE INDEX "_produtos_v_version_version_loja_idx" ON "_produtos_v" USING btree ("version_loja_id");
  CREATE INDEX "_produtos_v_version_version_imagem_idx" ON "_produtos_v" USING btree ("version_imagem_id");
  CREATE INDEX "_produtos_v_version_seo_version_seo_imagem_idx" ON "_produtos_v" USING btree ("version_seo_imagem_id");
  CREATE INDEX "_produtos_v_version_version_updated_at_idx" ON "_produtos_v" USING btree ("version_updated_at");
  CREATE INDEX "_produtos_v_version_version_created_at_idx" ON "_produtos_v" USING btree ("version_created_at");
  CREATE INDEX "_produtos_v_version_version__status_idx" ON "_produtos_v" USING btree ("version__status");
  CREATE INDEX "_produtos_v_created_at_idx" ON "_produtos_v" USING btree ("created_at");
  CREATE INDEX "_produtos_v_updated_at_idx" ON "_produtos_v" USING btree ("updated_at");
  CREATE INDEX "_produtos_v_latest_idx" ON "_produtos_v" USING btree ("latest");
  CREATE INDEX "_produtos_v_autosave_idx" ON "_produtos_v" USING btree ("autosave");
  CREATE INDEX "_produtos_v_rels_order_idx" ON "_produtos_v_rels" USING btree ("order");
  CREATE INDEX "_produtos_v_rels_parent_idx" ON "_produtos_v_rels" USING btree ("parent_id");
  CREATE INDEX "_produtos_v_rels_path_idx" ON "_produtos_v_rels" USING btree ("path");
  CREATE INDEX "_produtos_v_rels_midias_id_idx" ON "_produtos_v_rels" USING btree ("midias_id");
  CREATE INDEX "avaliacoes_perguntas_frequentes_order_idx" ON "avaliacoes_perguntas_frequentes" USING btree ("_order");
  CREATE INDEX "avaliacoes_perguntas_frequentes_parent_id_idx" ON "avaliacoes_perguntas_frequentes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "avaliacoes_slug_idx" ON "avaliacoes" USING btree ("slug");
  CREATE INDEX "avaliacoes_categoria_idx" ON "avaliacoes" USING btree ("categoria_id");
  CREATE INDEX "avaliacoes_imagem_idx" ON "avaliacoes" USING btree ("imagem_id");
  CREATE INDEX "avaliacoes_seo_seo_imagem_idx" ON "avaliacoes" USING btree ("seo_imagem_id");
  CREATE INDEX "avaliacoes_updated_at_idx" ON "avaliacoes" USING btree ("updated_at");
  CREATE INDEX "avaliacoes_created_at_idx" ON "avaliacoes" USING btree ("created_at");
  CREATE INDEX "avaliacoes__status_idx" ON "avaliacoes" USING btree ("_status");
  CREATE INDEX "avaliacoes_rels_order_idx" ON "avaliacoes_rels" USING btree ("order");
  CREATE INDEX "avaliacoes_rels_parent_idx" ON "avaliacoes_rels" USING btree ("parent_id");
  CREATE INDEX "avaliacoes_rels_path_idx" ON "avaliacoes_rels" USING btree ("path");
  CREATE INDEX "avaliacoes_rels_produtos_id_idx" ON "avaliacoes_rels" USING btree ("produtos_id");
  CREATE INDEX "_avaliacoes_v_version_perguntas_frequentes_order_idx" ON "_avaliacoes_v_version_perguntas_frequentes" USING btree ("_order");
  CREATE INDEX "_avaliacoes_v_version_perguntas_frequentes_parent_id_idx" ON "_avaliacoes_v_version_perguntas_frequentes" USING btree ("_parent_id");
  CREATE INDEX "_avaliacoes_v_parent_idx" ON "_avaliacoes_v" USING btree ("parent_id");
  CREATE INDEX "_avaliacoes_v_version_version_slug_idx" ON "_avaliacoes_v" USING btree ("version_slug");
  CREATE INDEX "_avaliacoes_v_version_version_categoria_idx" ON "_avaliacoes_v" USING btree ("version_categoria_id");
  CREATE INDEX "_avaliacoes_v_version_version_imagem_idx" ON "_avaliacoes_v" USING btree ("version_imagem_id");
  CREATE INDEX "_avaliacoes_v_version_seo_version_seo_imagem_idx" ON "_avaliacoes_v" USING btree ("version_seo_imagem_id");
  CREATE INDEX "_avaliacoes_v_version_version_updated_at_idx" ON "_avaliacoes_v" USING btree ("version_updated_at");
  CREATE INDEX "_avaliacoes_v_version_version_created_at_idx" ON "_avaliacoes_v" USING btree ("version_created_at");
  CREATE INDEX "_avaliacoes_v_version_version__status_idx" ON "_avaliacoes_v" USING btree ("version__status");
  CREATE INDEX "_avaliacoes_v_created_at_idx" ON "_avaliacoes_v" USING btree ("created_at");
  CREATE INDEX "_avaliacoes_v_updated_at_idx" ON "_avaliacoes_v" USING btree ("updated_at");
  CREATE INDEX "_avaliacoes_v_latest_idx" ON "_avaliacoes_v" USING btree ("latest");
  CREATE INDEX "_avaliacoes_v_autosave_idx" ON "_avaliacoes_v" USING btree ("autosave");
  CREATE INDEX "_avaliacoes_v_rels_order_idx" ON "_avaliacoes_v_rels" USING btree ("order");
  CREATE INDEX "_avaliacoes_v_rels_parent_idx" ON "_avaliacoes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_avaliacoes_v_rels_path_idx" ON "_avaliacoes_v_rels" USING btree ("path");
  CREATE INDEX "_avaliacoes_v_rels_produtos_id_idx" ON "_avaliacoes_v_rels" USING btree ("produtos_id");
  CREATE UNIQUE INDEX "paginas_slug_idx" ON "paginas" USING btree ("slug");
  CREATE INDEX "paginas_seo_seo_imagem_idx" ON "paginas" USING btree ("seo_imagem_id");
  CREATE INDEX "paginas_updated_at_idx" ON "paginas" USING btree ("updated_at");
  CREATE INDEX "paginas_created_at_idx" ON "paginas" USING btree ("created_at");
  CREATE INDEX "paginas__status_idx" ON "paginas" USING btree ("_status");
  CREATE INDEX "_paginas_v_parent_idx" ON "_paginas_v" USING btree ("parent_id");
  CREATE INDEX "_paginas_v_version_version_slug_idx" ON "_paginas_v" USING btree ("version_slug");
  CREATE INDEX "_paginas_v_version_seo_version_seo_imagem_idx" ON "_paginas_v" USING btree ("version_seo_imagem_id");
  CREATE INDEX "_paginas_v_version_version_updated_at_idx" ON "_paginas_v" USING btree ("version_updated_at");
  CREATE INDEX "_paginas_v_version_version_created_at_idx" ON "_paginas_v" USING btree ("version_created_at");
  CREATE INDEX "_paginas_v_version_version__status_idx" ON "_paginas_v" USING btree ("version__status");
  CREATE INDEX "_paginas_v_created_at_idx" ON "_paginas_v" USING btree ("created_at");
  CREATE INDEX "_paginas_v_updated_at_idx" ON "_paginas_v" USING btree ("updated_at");
  CREATE INDEX "_paginas_v_latest_idx" ON "_paginas_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_usuarios_id_idx" ON "payload_locked_documents_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_locked_documents_rels_midias_id_idx" ON "payload_locked_documents_rels" USING btree ("midias_id");
  CREATE INDEX "payload_locked_documents_rels_categorias_id_idx" ON "payload_locked_documents_rels" USING btree ("categorias_id");
  CREATE INDEX "payload_locked_documents_rels_lojas_id_idx" ON "payload_locked_documents_rels" USING btree ("lojas_id");
  CREATE INDEX "payload_locked_documents_rels_produtos_id_idx" ON "payload_locked_documents_rels" USING btree ("produtos_id");
  CREATE INDEX "payload_locked_documents_rels_avaliacoes_id_idx" ON "payload_locked_documents_rels" USING btree ("avaliacoes_id");
  CREATE INDEX "payload_locked_documents_rels_paginas_id_idx" ON "payload_locked_documents_rels" USING btree ("paginas_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_usuarios_id_idx" ON "payload_preferences_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "usuarios_sessions" CASCADE;
  DROP TABLE "usuarios" CASCADE;
  DROP TABLE "midias" CASCADE;
  DROP TABLE "categorias" CASCADE;
  DROP TABLE "lojas" CASCADE;
  DROP TABLE "produtos_vantagens" CASCADE;
  DROP TABLE "produtos_desvantagens" CASCADE;
  DROP TABLE "produtos" CASCADE;
  DROP TABLE "produtos_rels" CASCADE;
  DROP TABLE "_produtos_v_version_vantagens" CASCADE;
  DROP TABLE "_produtos_v_version_desvantagens" CASCADE;
  DROP TABLE "_produtos_v" CASCADE;
  DROP TABLE "_produtos_v_rels" CASCADE;
  DROP TABLE "avaliacoes_perguntas_frequentes" CASCADE;
  DROP TABLE "avaliacoes" CASCADE;
  DROP TABLE "avaliacoes_rels" CASCADE;
  DROP TABLE "_avaliacoes_v_version_perguntas_frequentes" CASCADE;
  DROP TABLE "_avaliacoes_v" CASCADE;
  DROP TABLE "_avaliacoes_v_rels" CASCADE;
  DROP TABLE "paginas" CASCADE;
  DROP TABLE "_paginas_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "configuracoes_site" CASCADE;
  DROP TYPE "public"."enum_categorias_tipo";
  DROP TYPE "public"."enum_lojas_tipo";
  DROP TYPE "public"."enum_produtos_tipo_produto";
  DROP TYPE "public"."enum_produtos_status";
  DROP TYPE "public"."enum__produtos_v_version_tipo_produto";
  DROP TYPE "public"."enum__produtos_v_version_status";
  DROP TYPE "public"."enum_avaliacoes_status";
  DROP TYPE "public"."enum__avaliacoes_v_version_status";
  DROP TYPE "public"."enum_paginas_status";
  DROP TYPE "public"."enum__paginas_v_version_status";`)
}
