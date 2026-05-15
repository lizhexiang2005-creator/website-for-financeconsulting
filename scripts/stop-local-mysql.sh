#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MYSQL_ROOT="$HOME/.codex-mysql/finance-consulting"
RUN_DIR="$MYSQL_ROOT/run"
SOCKET_PATH="$RUN_DIR/mysql.sock"

if [ ! -S "$SOCKET_PATH" ]; then
  echo "Local MySQL is not running."
  exit 0
fi

/usr/local/mysql/bin/mysqladmin --socket="$SOCKET_PATH" -uroot shutdown

echo "Local MySQL stopped"
