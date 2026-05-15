#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MYSQL_ROOT="$HOME/.codex-mysql/finance-consulting"
DATA_DIR="$MYSQL_ROOT/data"
RUN_DIR="$MYSQL_ROOT/run"
SOCKET_PATH="$RUN_DIR/mysql.sock"

mkdir -p "$RUN_DIR"

if [ ! -d "$DATA_DIR/mysql" ]; then
  /usr/local/mysql/bin/mysqld --initialize-insecure --basedir=/usr/local/mysql --datadir="$DATA_DIR"
fi

"$ROOT_DIR/scripts/start-local-mysql.sh"
/usr/local/mysql/bin/mysql --socket="$SOCKET_PATH" -uroot -e "CREATE DATABASE IF NOT EXISTS mingjian CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "Local MySQL is ready, database mingjian is available."
