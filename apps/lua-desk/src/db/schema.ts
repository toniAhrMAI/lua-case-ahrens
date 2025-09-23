import {
  DefaultSQLiteAccountsTable,
  DefaultSQLiteSessionsTable,
} from '@auth/drizzle-adapter/lib/sqlite';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

/** USERS */
export const users = sqliteTable('users', {
  id: text().primaryKey(),
  name: text(),
  email: text().unique(),
  password_hash: text(), // <-- für gehashte Passwörter
  emailVerified: integer('email_verified', { mode: 'timestamp' }),
  image: text(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

/** ACCOUNTS */
export const accounts: DefaultSQLiteAccountsTable = sqliteTable(
  'accounts',
  {
    id: text().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
  },
  (t) => [
    uniqueIndex('accounts_provider_provider_account_id_unique').on(
      t.provider,
      t.providerAccountId
    ),
  ]
);

export type Account = InferSelectModel<typeof accounts>;
export type NewAccount = InferInsertModel<typeof accounts>;

/** SESSIONS */
export const sessions: DefaultSQLiteSessionsTable = sqliteTable('sessions', {
  sessionToken: text('session_token').notNull().unique().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer({ mode: 'timestamp' }).notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

/** VERIFICATION TOKENS */
export const verificationTokens = sqliteTable(
  'verificationtokens',
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: integer({ mode: 'timestamp' }).notNull(),
  },
  (t) => [
    uniqueIndex('verificationtokens_identifier_token_unique').on(
      t.identifier,
      t.token
    ),
  ]
);

export type VerificationToken = InferSelectModel<typeof verificationTokens>;
export type NewVerificationToken = InferInsertModel<typeof verificationTokens>;

/** DESK */
export const desk = sqliteTable('desk', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  userId: text('user_id').unique(),
  expiresAt: text('expires_at'),
});

export type Desk = InferSelectModel<typeof desk>;
export type NewDesk = InferInsertModel<typeof desk>;

/** RELATIONS (for type-safe joins) */
export const usersRelations = relations(users, ({ one, many }) => ({
  desk: one(desk, {
    fields: [users.id],
    references: [desk.userId],
  }),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const deskRelations = relations(desk, ({ one }) => ({
  user: one(users, {
    fields: [desk.userId],
    references: [users.id],
  }),
}));
