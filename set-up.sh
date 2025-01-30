#!/bin/bash

# ログ関数
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# npm パッケージのアップデートの実行
log "Starting npm package update..."
if npm install -g npm@11.1.0; then
  log "npm package update completed successfully."
else
  log "npm package update failed."
  exit 1
fi

# npm installの実行
log "Starting npm install..."
if npm install; then
  log "npm install completed successfully."
else
  log "npm install failed."
  exit 1
fi

# Prismaマイグレーションの実行
log "Starting Prisma migration..."
if npx prisma migrate dev --name init; then
  log "Prisma migration completed successfully."
else
  log "Prisma migration failed."
  exit 1
fi

# Prisma Clientの生成
log "Starting Prisma Client generation..."
if npx prisma generate; then
  log "Prisma Client generation completed successfully."
else
  log "Prisma Client generation failed."
  exit 1
fi

log "All commands executed successfully."